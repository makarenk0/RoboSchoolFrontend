import React from 'react';
import {Table} from '../../components/Table'

export const Requests_list = () =>{

    return(
      <div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_requests'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_request/'}></Table>}
        </div>
      </div>
    )
}