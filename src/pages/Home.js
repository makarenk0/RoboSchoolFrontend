import React, { Fragment } from 'react';
import {RouteButton} from '../components/RouteButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faReact} from '@fortawesome/free-brands-svg-icons'
import {faBootstrap} from '@fortawesome/free-brands-svg-icons'
import {faJsSquare} from '@fortawesome/free-brands-svg-icons'
import {faSass} from '@fortawesome/free-brands-svg-icons'
import {faNpm} from '@fortawesome/free-brands-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


export const Home = () =>{

    const btnClick = userType => (
      window.location.assign(`/signIn/${userType}`)
    )

    return (
        <Fragment>
            <div className="container text-center user-choosing" style={{marginTop: "20px"}}>
                <div className="container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div className="col-2"><FontAwesomeIcon icon={faReact} size="4x" /></div>
                    <div className="col-2"><FontAwesomeIcon icon={faJsSquare} size="4x"/></div>
                    <div className="col-2"><FontAwesomeIcon icon={faBootstrap} size="4x"/></div>   
                    <div className="col-2"><FontAwesomeIcon icon={faSass} size="4x"/></div>
                    <div className="col-2"><FontAwesomeIcon icon={faNpm} size="4x"/></div>
                    <div className="col-2"><FontAwesomeIcon icon={faGithub} size="4x"/></div>
                </div>
                <ul style={{marginTop: "200px"}}>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Manager'} userType = {'manager'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Teacher'} userType = {'teacher'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Administartor'} userType = {'admin'}></RouteButton></li>
                </ul>
            </div>
        </Fragment>
    )
}



