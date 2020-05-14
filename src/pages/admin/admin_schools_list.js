import React, {useState, useEffect} from 'react';
import {Table} from '../../components/Table'
import axios from 'axios';
import {Loader} from '../../components/Loader'
import { AddingForm } from '../../components/AddingForm';

export const Schools_list = () =>{

    const [data, setData] = useState({ hits: [] });
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      let isCancelled = false;
      const fetchData = async () => {
      await axios.get('https://localhost:44354/api/admin/get_all_schools', 
      {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
      }})
        .then(response => {
          if(!isCancelled){
            setData(response.data);
            setLoading(false);
          }
        });
      }
      fetchData();
      return () => {    //cleanup if leave the page
        isCancelled = true;
      };
    }, []);


    const deleting = async(id) => {
      setData(data.filter(row => row[Object.keys(row)[0]]!==id));
      await axios.get(`https://localhost:44354/api/admin/delete_school/${id}`, 
      {
        headers:{
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken")  
      }})
    }
    
    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'input', title: 'adress', servName: 'adress', servData: '',endRow: false}, 
                                  {type: 'input', title: 'classes number', servName: 'aud_number', servData: '', endRow: true},
                                  {type: 'select', title: 'teacher', servName: {servName: 'id_teacher', displayFields: ['name', 'surname', 'lastname']}, servData: 'https://localhost:44354/api/admin/get_all_teachers', endRow: true},
                                  {type: 'select', title: 'manager', servName: {servName: 'id_manager', displayFields: ['name', 'surname', 'lastname']}, servData: 'https://localhost:44354/api/admin/get_all_managers', endRow: true}
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/admin/add_school'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
           
            {loading ? <Loader /> : <Table obj={data} onDelete={deleting}></Table>}
        </div>
      </div>
    )
}