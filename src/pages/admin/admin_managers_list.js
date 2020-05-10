import React, {useState, useEffect} from 'react';
import {Table} from '../../components/Table'
import axios from 'axios';
import {Loader} from '../../components/Loader'

export const Managers_list = () =>{

    const [data, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchData = async () => {
      await axios.get('https://localhost:44354/api/manager/all', 
      {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
      }})
        .then(response => {
            setData(response.data);
            setLoading(false);
        });
      }
      fetchData();
    }, []);


    const deleting = async(id) => {
      setData(data.filter(row => row[Object.keys(row)[0]]!==id));
      await axios.get(`https://localhost:44354/api/manager/delete/${id}`)
    }
    
    return(
        <div style={{marginTop: "50px"}}>
            {loading ? <Loader /> : <Table obj={data} onDelete={deleting}></Table>}
        </div>
    )
}

