import React, { useState, useContext } from 'react';
import axios from 'axios';
import {SelectSearch} from './SelectSearch'
import {MultipleFields} from './MultipleFields'
import {AlertContext} from '../context/alert/alertContext'
import { Alert } from '../components/Alert'
import {MyPhoneInput} from './MyPhoneInput'


export const AddingForm = ({params, submitRequest}) =>{

    const [data, setData] = useState({})
    const [loader, setLoader] = useState(false);

    const alert = useContext(AlertContext)
    var rows = []
    var rowArray = []

    const element = (item) =>{
        switch(item.type){
            case "text":
                return (<div className="col" key={item.title}>
                    <input type="text" className="form-control" placeholder={item.title} 
                onChange={e => setData({...data, [item.servName]: e.target.value})} value={data[item.servName]||''} required/>
                </div>)
            case "number":
                return (<div className="col" key={item.title}>
                    <input type="number" min="1" step="1" className="form-control" placeholder={item.title}
                onChange={e => setData({...data, [item.servName]: e.target.value})}  required/>
                </div>)
            case "currency":
                return (<div className="col" key={item.title}>
                    <input type="number" min="00.01" step="00.01" className="form-control" placeholder={"00.00₴"}
                onChange={e => setData({...data, [item.servName]: e.target.value})}  required/>
                </div>)
            case "phone":
                return (<div className="col" key={item.title}>
                 <MyPhoneInput data={data} setData={setData} servName={item.servName}></MyPhoneInput>
                </div>)
            case "select":
                return(<div className="col" key={item.title}><SelectSearch request={item.servData} fields = {item.servName} placeholder={`Select ${item.title}`} allData={{'data': data, 'setAllData' : setData, 'servName': item.servName.servName||item.servName}} required/></div>)
            case "multiple-select":
                return(<div className="col" key={item.title}><MultipleFields servName = {item.servName.servName} wrapName={item.servName.wrapName} displayNames = {item.servName.displayNames} allData={{'data': data, 'setAllData' : setData}} placeholder={item.title} servDataRequest={item.servData} phonePlaceholder = {item.phonePlaceholder} counter={item.counter}></MultipleFields></div>)
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

    const checkIfValid = () =>{
        if(Object.keys(data).length !== params.length){
            alert.show('Please, fill all the required fields', 'danger')
            setLoader(false)
            return false;
        }
        return true;
    }

    const btnSubmit = async() =>{
        console.log(data)
        setLoader(true)
        if(checkIfValid()){
        await axios.post(submitRequest,  
                data,
        {
          headers:{
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }}).then(response => {
            document.location.reload();
            alert.show('Successful!', 'success')
            setData({})
            setLoader(false)
        }, error =>{
            alert.show(error.response.data.errorText, 'danger')
            setLoader(false)
        })
    }
    }

    return(
        <form id ="myAddingForm">
            <Alert styleAtr="signin-alert container"/>
            {rows}
            
            <div className="form-group row">
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} className="col">

                    {loader ? <div className="spinner-grow" role="status" style={{position: "absolute", width: "3rem", height: "3rem", margin: "0px 0px 0px -70px"}}>
                                 <span className="sr-only">Loading...</span>
                              </div> : null
                    }

                    {params.length!==0 ? <button onClick={() => btnSubmit()} type="submit" className="btn btn-success" disabled={loader}>Submit</button> : null}

                    {loader ? <div className="spinner-grow" role="status" style={{position: "absolute", width: "3rem", height: "3rem", margin: "0px 0px 0px 70px"}}>
                                 <span className="sr-only">Loading...</span>
                              </div> : null
                    }
                </div>
            </div>
        </form>
    )
}