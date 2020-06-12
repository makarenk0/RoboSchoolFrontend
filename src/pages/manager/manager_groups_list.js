import React from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';


export const Groups_list = () =>{
    return(
        <div>
        <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'number', title: 'pupils number', servName: 'pupils_number', servData: '', endRow: false}, 
                                  {type: 'select', title: 'course', servName: 'name_course', servData: 'https://roboschool-api.herokuapp.com/api/manager/get_all_courses', endRow: true},
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/manager/add_group'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            <Table request={'https://roboschool-api.herokuapp.com/api/manager/get_manager_groups'} onDelete={'https://roboschool-api.herokuapp.com/api/manager/delete_group/'}></Table>
        </div>
        </div>
    )
}