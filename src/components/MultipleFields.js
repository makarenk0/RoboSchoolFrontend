import React, { useState, useEffect} from 'react';
import {SelectSearch} from './SelectSearch'


export const MultipleFields = ({item, allData}) =>{
    const [data, setData] = useState([{[item.servName] : '', amount: 1}])
    
    var rows = []
    useEffect(() => {
        const add = () => {
            allData.setAllData({...allData.data, [item.servName+'es'] : data})
        }
        add();
    }, [data]);


    const addRow = () =>{
        setData([...data, {[item.servName] : '', amount: 1}])
    }

    const increaseCounter = (i) =>{
        let newArr = [...data]; 
        newArr[i]['amount']++;
        setData(newArr);
    }

    const decreaseCounter = (i) =>{
            let newArr = [...data]; 
            if(newArr[i]['amount']===1&&i!==0){
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
                <div className="col" key={'select'}><SelectSearch request={item.servData} field = {item.servName} placeholder={`Select ${item.title}`} allData={{'data': data[i], 'setAllData' : (newData) =>{ let newArr = [...data]; 
                                                                                                                                                                                                               newArr[i][item.servName] = newData;
                                                                                                                                                                                                               setData(newArr); 
                }, 'servName': item.servName}}/></div>
                <div className="col align-middle" key={'amount'}>
                    <div className="container row align-middle" style={{width: "190px", marginTop: "3px"}}>
                    <div className="col">
                        <button onClick={() => increaseCounter(i)} type="button" className="btn btn-success btn-sm" style={{width: "2em"}}>
                            <span style={{fontSize: "15px"}}>+</span>
                        </button>
                    </div>
                    <div className="col container"><span style={{fontSize: "20px"}}>{data[i]['amount']}</span></div>
                    <div className="col">
                        <button onClick={() => decreaseCounter(i)} type="button" className="btn btn-danger btn-sm" style={{width: "2em"}}>
                            <span style={{fontSize: "15px"}}>-</span>
                        </button>
                    </div>
                    </div>
                    </div>
            </div>
            )
            
        });
    }
    addNewRows();
    
    return(
        <div className="border border-secondary" style={{padding: "25px"}}>
           {rows}
           <div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}><button onClick={() => addRow()} type="button" className="btn btn-info btn-sm">Add row</button></div>
        </div>
    )
}

// {allData.setAllData({...allData.data, ...[item.ServName+'s'][i][item.servName]+1})}