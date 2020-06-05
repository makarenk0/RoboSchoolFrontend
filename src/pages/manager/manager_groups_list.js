import React from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';


export const Groups_list = () =>{
    return(
        <div>
        <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'number', title: 'pupils number', servName: 'pupils_number', servData: '', endRow: false}, 
                                  {type: 'select', title: 'course', servName: 'name_course', servData: 'https://localhost:44354/api/manager/get_all_courses', endRow: true},
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/manager/add_group'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            <Table request={'https://localhost:44354/api/manager/get_manager_groups'} onDelete={'https://localhost:44354/api/manager/delete_group/'}></Table>
        </div>
        </div>
    )
}