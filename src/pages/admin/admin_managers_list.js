import React, {useState, useEffect} from 'react';
import {Table} from '../../components/Table'
import axios from 'axios';
import {Loader} from '../../components/Loader'

export const Managers_list = () =>{


    const [data, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'https://localhost:44354/api/manager/all',
        );
   
        setData(result.data);
        setLoading(false);
        console.log(result.data);
      };
   
      fetchData();
    }, []);


    const deleting = (id) => {
        console.log(id);
    }
      
    return(
        <div style={{marginTop: "50px"}}>
            {loading ? <Loader /> : <Table  obj={data} onDelete={deleting}></Table>}
        </div>
    )
}
