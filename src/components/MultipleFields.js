import React, { useState, useEffect} from 'react';
import {SelectSearch} from './SelectSearch'


export const MultipleFields = ({item, allData, counter = true}) =>{
    const [data, setData] = useState([{[allData.servName] : '', amount: 1}])
    
    var rows = []
    useEffect(() => {
        const add = () => {
            allData.setAllData({...allData.data, [allData.servName] : data})
        }
        add();
    }, [data]);


    const addRow = () =>{
        setData([...data, {[allData.servName] : '', amount: 1}])
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
            console.log(data)
    }

    const addNewRows = () =>{
        data.forEach(function(element, i, arr) {
            rows.push(
            <div className="form-group row" key={i}>
                <div className="col" key={'select'}><SelectSearch request={item.servData} fields = {item.servName} placeholder={`Select ${item.title}`} allData={{'data': data[i], 'setAllData' : (newData) =>{ let newArr = [...data]; 
                                                                                                                                                                                                               newArr[i] = newData;
                                                                                                                                                                                                               setData(newArr); 
                }, 'servName': allData.servName}}/></div>

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
                                onClick={() => setData(data.filter(x =>(data.indexOf(x)!==i)))}
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
