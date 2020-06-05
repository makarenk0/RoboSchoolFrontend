import React from 'react';
import {Table} from '../../components/Table'


export const Items_list = () =>{
    return(
        <div>
        <div style={{marginTop: "50px"}}>
            <Table request={'https://localhost:44354/api/manager/get_manager_items'} onDelete={'https://localhost:44354/api/manager/delete_item/'}></Table>
        </div>
        </div>
    )
}