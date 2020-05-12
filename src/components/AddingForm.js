import React from 'react';

import {SelectSearch} from './SelectSearch'


export const AddingForm = ({params, onSubmit}) =>{

    var rows = []
    var rowArray = []

    const element = (item) =>{
        switch(item.type){
            case "input":
                return (<div className="col" key={item.title}><input type="text" className="form-control" placeholder={item.title}/></div>)
            case "select":
                return(<div className="col" key={item.title}><SelectSearch request={item.servData} field = {item.servName} placeholder={`Select ${item.title}`}/></div>)
            default:
                break;
        }
    }

    params.forEach(function(item, i, arr) {
        console.log(i)
        rowArray.push(element(item))
        if(item['endRow']===true||arr.length-1===i){
            rows.push(<div className="form-group row" key={item.title}>{rowArray}</div>)
            rowArray = []
        }
    });

    return(
        <form>
            {rows}
        </form>
    )
}