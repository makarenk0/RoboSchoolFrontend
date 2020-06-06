import React, { useState, useEffect} from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';


export const MultipleFields = ({servName, wrapName, displayNames, allData, placeholder, servDataRequest, counter = true}) =>{
    const [data, setData] = useState([{[servName] : '', amount: 1}])

     const [optionsData, setOptionsData] = useState([])
     const [sendData, setSendData] = useState([])

    var rows = []

    useEffect(() => {
        const add = () => {
            allData.setAllData({...allData.data, [wrapName] : data})
        }
        add();
        //eslint-disable-next-line 
    }, [data, wrapName]);

    useEffect(() => {
        const loadServData = async (servDataRequest) => {
            await axios.get(servDataRequest, 
            {
            headers:{
              "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
            }})
            .then(response =>{
                let newOptionsData = []
                let newSendData = []

                response.data.forEach(function(element, i, arr){
                      newOptionsData.push((displayNames.map( x => (element[x]))).join(" "))
                      newSendData.push(element[servName])     
                });
                  setOptionsData(newOptionsData)
                  setSendData(newSendData)
            })
        }
        loadServData(servDataRequest)
    }, [servDataRequest, displayNames, servName]);


    const addRow = () =>{
        setData([...data, {[servName] : '', amount: 1}])
    }

    
    const increaseCounter = (i) =>{
        let newArr = [...data]; 
        newArr[i]['amount']++;
        setData(newArr);
    }

    const decreaseCounter = (i) =>{
            let newArr = [...data]; 
            if(newArr[i]['amount']===1&&newArr.length!==1){
                newArr.splice(i, 1);
                setData(newArr);
            }
            else if(newArr[i]['amount']>1){
                newArr[i]['amount']--;
                setData(newArr);
            }
    }


    const addNewRows = () =>{
        data.forEach(function(element, i, arr) {
            rows.push(
            <div className="form-group row" key={i}>

                <div className="col" key={'select'}>
                <Typeahead
                    id="basic-typeahead-example"
                    labelKey="name"
                    multiple={false}
                    onChange={(e) => {
                        let newData = [...data]
                        newData[i][servName] = sendData[optionsData.indexOf(e[0])]
                        setData(newData)
                    }}
                    selected={allData[allData.servName]}  // TO DO fix
                    options={optionsData}
                    placeholder={placeholder}
                />
                </div>
                {counter ? 
                <div className="col-md-auto" key={'amount'}>
                    <div style={{display: "block"}}>
                    
                    <div style={{display: "inline-block"}}>
                        <button onClick={() => increaseCounter(i)} type="button" className="btn btn-success btn-sm" style={{width: "2em"}}>
                            <span style={{fontSize: "15px"}}>+</span>
                        </button>
                    </div>
                    <div style={{display: "inline-block", width: "40px"}}><span style={{display: "flex", alignItems: "center", justifyContent: "center",fontSize: "20px"}}>{data[i]['amount']}</span></div>
                    <div style={{display: "inline-block"}}>
                        <button onClick={() => decreaseCounter(i)} type="button" className="btn btn-danger btn-sm" style={{width: "2em"}}>
                            <span style={{fontSize: "15px"}}>-</span>
                        </button>
                    </div>

                    </div>
                    </div>
                     : null }
                            <div className="col-2" key={'delete'}>
                                <button style={{marginTop: "3px"}} //to fix
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => data.length>1 ? setData(data.filter(x =>(data.indexOf(x)!==i))) : null}
                                >&times;
                                </button>
                            </div>
            </div>
            )
            
        });
    }
    addNewRows();
    
    return(
        <div className="container border border-secondary" style={{padding: "25px"}}>
           {rows}
          <div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><button onClick={() => addRow()} type="button" className="btn btn-info btn-sm">Add row</button></div>
        </div>
    )
}
