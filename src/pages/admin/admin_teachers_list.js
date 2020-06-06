import React from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';

export const Teachers_list = () =>{  
    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'name', servName: 'name', servData: '',endRow: false}, 
                                  {type: 'text', title: 'surname', servName: 'surname', servData: '', endRow: false},
                                  {type: 'text', title: 'lastname', servName: 'lastname', servData: '', endRow: true},
                                  {type: 'text', title: 'email', servName: 'email', servData: '', endRow: true},
                                  //{type: 'select', title: 'school', servName: 'adress', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_schools', endRow: true},
                                  {type: 'text', title: 'password', servName: 'Password_temp', servData: '', endRow: true},
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/admin/add_teacher'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
           
            <Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_teachers'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_teacher/'}></Table>
        </div>
      </div>
    )
}

