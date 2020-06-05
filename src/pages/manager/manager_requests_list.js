import React from 'react';
import {Table} from '../../components/Table'

import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble} from '@fortawesome/free-solid-svg-icons'


export const Requests_list = () =>{
    return(<div>
        <div style={{marginTop: "50px"}}>
            {
              <Table request={'https://localhost:44354/api/manager/get_manager_requests'}
              extraButtons={ [{'name' : 'confirm', 'icon' : faCheck, 'request' : 'https://localhost:44354/api/manager/confirm_request/', enable : {'date_confirmed' : 'not yet'}},  
                              {'name' : 'finish', 'icon' : faCheckDouble, 'request' : 'https://localhost:44354/api/manager/finish_request/', enable : {'date_finished' : 'not yet'}}] }>
              </Table>
              }
        </div>
    </div>)
}