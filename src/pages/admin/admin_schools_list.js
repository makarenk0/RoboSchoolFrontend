import React  from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';

export const Schools_list = () =>{
   
    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'adress', servName: 'adress', servData: '',endRow: false}, 
                                  {type: 'number', title: 'classes number', servName: 'aud_number', servData: '', endRow: true},
                                  {type: 'select', title: 'teacher', servName: {servName: 'id_teacher', displayFields: ['name', 'surname', 'lastname']}, servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_teachers', endRow: true},
                                  {type: 'select', title: 'manager', servName: {servName: 'id_manager', displayFields: ['name', 'surname', 'lastname']}, servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_managers', endRow: true}
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/admin/add_school'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
           
             <Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_schools'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_school/'}></Table>
        </div>
      </div>
    )
}