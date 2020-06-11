import React from 'react';
import {Table} from '../../components/Table'

import { AddingForm } from '../../components/AddingForm';

export const Items_list = () =>{

    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'name', servName: 'name', servData: '',endRow: false}, 
                                  {type: 'select', title: 'provider name', servName: 'provider_name', servData: 'https://localhost:44354/api/admin/get_all_providers', endRow: true},
                                  {type: 'number', title: 'cost', servName: 'cost', servData: '', endRow: true},      
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/admin/add_item'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://localhost:44354/api/admin/get_all_items'} onDelete={'https://localhost:44354/api/admin/delete_item/'}></Table>}
        </div>
      </div>
    )
}