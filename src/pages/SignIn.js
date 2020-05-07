import React from 'react'
import {RouteButton} from '../components/RouteButton';

export const SignIn = () => (
  <div className="text-center user-choosing">
    <div className="container jumbotron col-4" >
      <h3 className="display-4">Sign in</h3>
      <form>
      <div className="form-group container pt-4">
        <input
          type="text"
          className="form-control input-field"
          placeholder="Login"/>

        <input
          type="text"
          className="form-control input-field"
          placeholder="Password"/>
      </div>
    </form>
    <div className="btn-group pt-3">
        <div><RouteButton action={btnBack} text = {'Back'} color={'btn-secondary'}></RouteButton></div>
        <div style={{marginLeft: '50px'}}><RouteButton action={btnSubmit} text = {'Submit'}></RouteButton></div>
    </div>
      <p className="lead" style={{marginTop: '20px'}}>
        Version <strong>1.0</strong>
      </p>
    </div>
  </div>
)

function btnBack(){
    window.location.assign('/');
}

function btnSubmit(){
    //window.location.assign('/'); when back ready
}