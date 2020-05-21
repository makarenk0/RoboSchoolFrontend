import React from 'react';
import {Table} from '../../components/Table'

export const Requests_list = () =>{

    return(
      <div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://localhost:44354/api/admin/get_all_requests'} onDelete={'https://localhost:44354/api/admin/delete_request/'}></Table>}
        </div>
      </div>
    )
}