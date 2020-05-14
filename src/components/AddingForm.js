import React, { useState, useContext } from 'react';
import axios from 'axios';
import {SelectSearch} from './SelectSearch'
import {MultipleFields} from './MultipleFields'

import {AlertContext} from '../context/alert/alertContext'

import { Alert } from '../components/Alert'


export const AddingForm = ({params, submitRequest}) =>{

    const [data, setData] = useState({})
    const alert = useContext(AlertContext)
    var rows = []
    var rowArray = []

    const element = (item) =>{
        switch(item.type){
            case "input":
                return (<div className="col" key={item.title}><input type="text" className="form-control" placeholder={item.title} 
                onChange={e => setData({...data, [item.servName]: e.target.value})} value={data[item.servName]||''} required/>
                </div>)
            case "select":
                return(<div className="col" key={item.title}><SelectSearch request={item.servData} fields = {item.servName} placeholder={`Select ${item.title}`} allData={{'data': data, 'setAllData' : setData, 'servName': item.servName.servName||item.servName}}/></div>)
            case "multiple-select":
                return(<div className="col" key={item.title}><MultipleFields item={item} allData={{'data': data, 'setAllData' : setData, 'servName': item.servName}}></MultipleFields></div>)
            default:
                break;
        }
    }

    params.forEach(function(item, i, arr) {
        rowArray.push(element(item))
        if(item['endRow']===true||arr.length-1===i){
            rows.push(<div className="form-group row" key={item.title}>{rowArray}</div>)
            rowArray = []
        }
    });

    const btnSubmit = async() =>{
        console.log(data);
        await axios.post(submitRequest,  
                data,
        {
          headers:{
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }}).then(response => {
            alert.show('Successful!', 'success')
            setData({})
        }, error =>{
            alert.show('Error!', 'danger')
        })
    }

    return(
        <form>
            <Alert styleAtr="signin-alert container"/>
            {rows}
            <div className="form-group row"><div style={{display: "flex", alignItems: "center", justifyContent: "center"}} className="col"><button onClick={() => btnSubmit()} type="button" className="btn btn-success">Submit</button></div></div>
        </form>
    )
}