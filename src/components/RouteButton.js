import React from 'react';

export const RouteButton = ({action, text, userType, color="btn-primary"}) =>{
    return (
    <button type="button" onClick={() => action(userType)} className={"btn btn-lg "+ color}>{text}</button>
    )
}

