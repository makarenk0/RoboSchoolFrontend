import React from 'react';
import {Table} from '../../components/Table'

import { AddingForm } from '../../components/AddingForm';

export const Managers_list = () =>{

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
                                ]} submitRequest = 'https://localhost:44354/api/admin/add_manager'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://localhost:44354/api/admin/get_all_managers'} onDelete={'https://localhost:44354/api/admin/delete_manager/'}></Table>}
        </div>
      </div>
    )
}

