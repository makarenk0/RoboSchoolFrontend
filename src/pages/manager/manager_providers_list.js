import React from 'react';
import {Table} from '../../components/Table'

export const Providers_list = () =>{
    return(<div>
        <div style={{marginTop: "50px"}}>
            {<Table request={'https://roboschool-api.herokuapp.com/api/manager/get_all_providers'}></Table>}
        </div>
    </div>)
}