import React from 'react';
import {Table} from '../../components/Table'

import { AddingForm } from '../../components/AddingForm';

export const Courses_list = () =>{

    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'course name', servName: 'name_course', servData: '',endRow: true},    
                                 {type: 'multiple-select', title: 'required item', servName: {servName: 'id_item', displayFields: ["name"]}, servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_items', counter: false, endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/admin/add_course'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_courses'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_course/'}></Table>}
        </div>
      </div>
    )
}