import React, {useState, useContext} from 'react';
import axios from 'axios';
import {Loader} from './Loader'
import {AlertContext} from '../context/alert/alertContext'
import {Alert} from './Alert'

export const AccountDataDisplay = ({data, userRole, changeRequest}) =>{
    const[userData, setUserData] = useState(data)
    const [loader, setLoader] = useState(false);
    const alert = useContext(AlertContext)

    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
      }

    const changePhonesArray = (index, newValue) =>{
        console.log(index)
        let newArr = [...userData.phones]
        newArr[index]['phone'] = newValue
        setUserData({...userData, "phones": newArr})
    } 

    const addNewPhoneField = () =>{
        let newArr = [...userData.phones]
        newArr.push({'phone' : ''})
        console.log(newArr)
        setUserData({...userData, "phones": newArr})
    }

    const btnSubmit = async() =>{
        setLoader(true)
        
        await axios.post(changeRequest,  
                userData,
        {
          headers:{
            "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }}).then(response => {
            alert.show('Successful!', 'success')
            setLoader(false)
        }, error =>{
            setLoader(false)
            alert.show(error.response.data.errorText, 'danger')
        })
    }

    return(
        loader ? <Loader /> : <div className="container">
             <Alert styleAtr="signin-alert container col-4"/>
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title mb-4">
                            <div className="d-flex justify-content-start">
                                <div className="image-container">
                                    <img src="http://placehold.it/150x150" alt="none" id="imgProfile" style={{width: "150px", height: "150px"}} className="img-thumbnail" />
                                    <div style={{marginLeft: "42px", marginTop: "10px"}}>
                                        <input type="button" className="btn btn-primary btn-sm" id="btnChangePicture" value="Change" />
                                    </div>
                                </div>
                                <div className="userData ml-3">
                                    <h2 className="d-block" style={{fontSize: "1.5rem", fontWeight: "bold"}}>{data['name'] + ' ' + data['surname']}</h2>
                                    <h6 className="d-block" style={{color: "#0000FF"}}>{userRole}</h6>  
                                </div>
                                <div className="ml-auto">
                                    <input type="button" className="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <button className="nav-link active" id="basicInfo-tab" >Basic Info</button>
                                    </li>
                                </ul>
                                <div className="tab-content ml-1" id="myTabContent">
                                    <div className= "tab-pane fade active show" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                        
                                        {Object.keys(userData).map(x =>( x!=="phones" ?
                                            <div key={x}>
                                            <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label style={{fontWeight: "bold"}}>{ucFirst(x.replace('_', ' '))}</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {x.substr(0,2)==="id"||x==="email" ? userData[x] : <input style={{width: "200px"}} className="form-control" defaultValue={userData[x]} 
                                                onChange={e => setUserData({...userData, [x]: e.target.value})} />}
                                            </div>
                                            </div> 
                                            <hr />
                                            </div> : 

                                            <div key={x}>
                                            <div className="row">
                                            <div className="col-sm-3 col-md-2 col-5">
                                                <label style={{fontWeight: "bold"}}>{ucFirst(x.replace('_', ' '))}</label>
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {userData[x].map(p =>(<div key={userData[x].indexOf(p)} style={{width: "200px"}}>
                                                    {console.log(userData[x])}
                                                    <input placeholder="Enter phone number" className="form-control" defaultValue={p['phone']}
                                                    onChange={e => changePhonesArray(userData[x].indexOf(p), e.target.value)}/>
                                                 </div>))}
                                                 <button type="button" style={{marginTop: "10px", marginLeft: "40px"}} className="btn btn-info btn-sm" onClick={addNewPhoneField}>Add new phone</button>
                                            </div>
                                            </div> 
                                            <hr />
                                                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                    <button type="button" style={{margin: "auto"}} className="btn btn-success btn-sm" onClick={btnSubmit}>Save changes</button>
                                                </div>
                                            </div>
                                        )) }
                                        

                                    </div>
                                    <div className = "tab-pane fade" id="connectedServices" role="tabpanel" aria-labelledby="ConnectedServices-tab">
                                        Facebook, Google, Twitter Account that are connected to this account
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
     )
}