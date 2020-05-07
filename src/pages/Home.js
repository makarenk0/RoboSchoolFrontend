import React, { Fragment } from 'react';
import {RouteButton} from '../components/RouteButton';

export const Home = () =>{
    return (
        <Fragment>
            <div className="container text-center user-choosing">
                <ul>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Manager'} userType = {'manager'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Teacher'} userType = {'teacher'}></RouteButton></li>
                    <li><RouteButton action = {btnClick} text = {'Sign in as Administartor'} userType = {'admin'}></RouteButton></li>
                </ul>
            </div>
        </Fragment>
    )
}

function btnClick(userType){
    window.location.assign(`/signIn/${userType}`);
}