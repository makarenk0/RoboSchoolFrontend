import React, {useState, useEffect}  from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import axios from 'axios';

export const SelectSearch = ({request, field, placeholder}) => {
    const [selected, setSelected] = useState();
    const [optionsData, setData] = useState([]);

    useEffect(() => {
    const options = async (request, field) => {
        await axios.get(request, 
        {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
        }})
        .then(response => {
            var items = response.data.map(x =>(x[field]))
            setData(items)
            console.log(items)
        });
    }
    options(request, field);
   }, [request, field]);

    return (
        <Typeahead className = 'container'
          id="basic-typeahead-example"
          labelKey="name"
          onChange={setSelected}
          options={optionsData}
          placeholder={placeholder}
          selected={selected}
        />
    );
  };