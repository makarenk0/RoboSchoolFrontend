import React, {useState, useContext} from 'react'
import {RouteButton} from '../components/RouteButton';
import {AlertContext} from '../context/alert/alertContext'

import { Alert } from '../components/Alert'
import axios from 'axios';

//test


export const SignIn = ({match}) => {

    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [loader, setLoader] = useState(false)
  

    const alert = useContext(AlertContext)


    const btnSubmit = values =>{
      setLoader(true)
      //window.location.assign('/'); when backend ready
      console.log(values[0].params.userType);   //usertype
      console.log(values[1]);                   //login
      console.log(values[2]);   
      if(values[0].params.userType === 'admin'){

          const login = async () => {
          await axios.post('https://roboschool-api.herokuapp.com/api/admin/token',
          {
            Login: values[1],
            Password: values[2],
            Role: "admin"
          }
          )
            .then(response => {
              if (response.status === 200) {
                alert.show('Successfull sign in', 'success')
                sessionStorage.setItem("accessToken", response.data.access_token);
                console.log(response);
                setLoader(false)
                window.location.assign('/admin')
             }
            }, (error) => {
              console.log(error)
              alert.show('Error', 'danger')
            });
          }
        login();
      }
   }

  const btnBack = () =>(
    window.location.assign('/')
  )


  const res = (
   
  <div className="container text-center" style={{marginTop: "10%"}}>
     <Alert styleAtr="signin-alert container col-4"/>
    <div className="container jumbotron col-4">
    
      <h3 className="display-4">Sign in</h3>
     
      <form>
      <div className="form-group container pt-4">
        <input
          type="text"
          className="form-control input-field"
          value={loginValue}
          onChange={e => setLoginValue(e.target.value)}
          placeholder="Login" disabled={loader}/>

        {loader ? <div className="spinner-grow" role="status" style={{position: "absolute", width: "3rem", height: "3rem", margin: "-15px 0px 0px -25px"}}>
             <span className="sr-only">Loading...</span>
        </div> : null
        }

        <input
          type="password"
          className="form-control input-field"
          value={passwordValue}
          onChange={e => setPasswordValue(e.target.value)}
          placeholder="Password" disabled={loader}/>
      </div>
    </form>
    <div className="btn-group pt-3">
        <div><RouteButton action={btnBack} text = {'Back'} color={'btn-secondary'} isDisabled={loader}></RouteButton></div>
        <div style={{marginLeft: '50px'}}><RouteButton action={btnSubmit} text = {'Submit'} userType={[match, loginValue, passwordValue]} isDisabled={loader}></RouteButton></div>
    </div>
      <p className="lead" style={{marginTop: '20px'}}>
        Version <strong>1.0</strong>
      </p>
      
    </div>
  </div>
  )
  return res
}



