import React from 'react';
import {Table} from '../../components/Table'
import { AddingForm } from '../../components/AddingForm';


export const Requests_list = () =>{
    return(<div>
        <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[    
                                 {type: 'multiple-select', title: 'items', servName: {servName: 'items', selectField: 'id_item', displayFields: ['name']}, servData: 'https://roboschool-api.herokuapp.com/api/teacher/get_all_items', counter: true, endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/teacher/add_request'></AddingForm>
        </div>
        <div style={{marginTop: "50px"}}>
            {
              <Table request={'https://roboschool-api.herokuapp.com/api/teacher/get_teacher_requests'}>
              </Table>
              }
        </div>
    </div>)
}