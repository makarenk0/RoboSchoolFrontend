import React, {useState, useEffect}  from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';

export const SelectSearch = ({request, fields, placeholder, allData}) => {
    const [optionsData, setData] = useState([]);
    const [sendData, setSendData] = useState([])


    useEffect(() => {
    let isCancelled = false;
    const options = async (request, fields) => {
        await axios.get(request, 
        {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }})
        .then(response => {
          if(!isCancelled){
              if(typeof(fields)==="string"){  //if we display the same data which we send to server after submit
                  let newData = response.data.map(x =>(x[fields].toString()))
                  setData(newData) 
                  setSendData(newData)
              }
              else{ //display some custom options and each of it matches some hidden data( in sendData) which we send then
                  let newData = []
                  let newSendData = []
                 
                  response.data.forEach(function(element, i, arr){
                      newData.push((fields.displayFields.map( x => (element[x]))).join(" "))
                      console.log(element)
                      newSendData.push(element[fields.servName])     
                  });
                  setData(newData)
                  setSendData(newSendData)
              }  
          }
        });
    }
    options(request, fields);
    return () => {    //cleanup if leave the page
      isCancelled = true;
    };
   }, [request, fields]);
    return (
        <Typeahead
          id="basic-typeahead-example"
          labelKey="name"
          multiple={false}
          onChange={(e) => allData.setAllData({...allData.data, [allData.servName]: sendData[optionsData.indexOf(e[0])]})}
          selected={allData[allData.servName]}  // TO DO fix
          options={optionsData}
          placeholder={placeholder}
          
        />
    );
  };