import React from 'react';
import {Table} from '../../components/Table'


export const Items_list = () =>{
    return(
        <div>
        <div style={{marginTop: "50px"}}>
            <Table request={'https://roboschool-api.herokuapp.com/api/manager/get_manager_items'} onDelete={'https://roboschool-api.herokuapp.com/api/manager/delete_item/'}></Table>
        </div>
        </div>
    )
}