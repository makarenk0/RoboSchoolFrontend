import React from 'react';
import {Table} from '../../components/Table'

import { AddingForm } from '../../components/AddingForm';

export const Providers_list = () =>{

    return(
      <div>
      <div className="container" style={{marginTop: "25px", width: "50%"}}>
            <AddingForm params={[{type: 'text', title: 'provider name', servName: 'provider_name', servData: '',endRow: false}, 
                                  {type: 'phone', title: 'contact number', servName: 'contact_number', servData: '', endRow: true},
                                  {type: 'text', title: 'link', servName: 'site_link', servData: '', endRow: true},      
                                 //{type: 'multiple-select', title: 'items', servName: 'adress', servData: 'https://localhost:44354/api/admin/get_all_schools', endRow: true}
                                ]} submitRequest = 'https://localhost:44354/api/admin/add_provider'></AddingForm>
      </div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://localhost:44354/api/admin/get_all_providers'} onDelete={'https://localhost:44354/api/admin/delete_provider/'}></Table>}
        </div>
      </div>
    )
}