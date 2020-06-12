import React from 'react';
import {Table} from '../../components/Table'


export const Groups_list = () =>{
    return(
        <div>
        <div style={{marginTop: "50px"}}>
            <Table request={'https://localhost:44354/api/teacher/get_teacher_groups'}></Table>
        </div>
        </div>
    )
}