import React from 'react';
import {Table} from '../../components/Table'

import { AddingForm } from '../../components/AddingForm';

export const Items_list = () =>{

    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'name', servName: 'name', servData: '',endRow: false}, 
                                  {type: 'select', title: 'provider name', servName: 'provider_name', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_providers', endRow: true},
                                  {type: 'currency', title: 'cost', servName: 'cost', servData: '', endRow: true},      
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://roboschool-api.herokuapp.com/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://roboschool-api.herokuapp.com/api/admin/add_item'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_items'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_item/'}></Table>}
        </div>
      </div>
    )
}