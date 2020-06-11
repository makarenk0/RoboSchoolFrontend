import React from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';


export const Requests_list = () =>{
    return(<div>
        <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[    
                                 {type: 'multiple-select', title: 'required items', servName: {servName: 'id_item', wrapName: 'items', displayNames: ['name']}, servData: 'https://localhost:44354/api/teacher/get_all_items', counter: true, endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/teacher/add_request'></AddingForm>
        </div>
        <div style={{marginTop: "50px"}}>
            {
              <Table request={'https://localhost:44354/api/teacher/get_teacher_requests'}>
              </Table>
              }
        </div>
    </div>)
}