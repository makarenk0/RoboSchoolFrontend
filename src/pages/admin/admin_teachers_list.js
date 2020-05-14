import React, {useState, useEffect} from 'react';
import {Table} from '../../components/Table'
import axios from 'axios';
import {Loader} from '../../components/Loader'
import { AddingForm } from '../../components/AddingForm';

export const Teachers_list = () =>{

    const [data, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchData = async () => {
      await axios.get('https://localhost:44354/api/admin/get_all_teachers', 
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
      await axios.get(`https://localhost:44354/api/admin/delete_teacher/${id}`, 
      {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
      }})
    }
    
    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'input', title: 'name', servName: 'name', servData: '',endRow: false}, 
                                  {type: 'input', title: 'surname', servName: 'surname', servData: '', endRow: false},
                                  {type: 'input', title: 'lastname', servName: 'lastname', servData: '', endRow: true},
                                  {type: 'input', title: 'email', servName: 'email', servData: '', endRow: false},
                                  {type: 'select', title: 'school', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true},
                                  {type: 'input', title: 'password', servName: 'Password_temp', servData: '', endRow: true},
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/admin/add_teacher'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
           
            {loading ? <Loader /> : <Table obj={data} onDelete={deleting}></Table>}
        </div>
      </div>
    )
}

