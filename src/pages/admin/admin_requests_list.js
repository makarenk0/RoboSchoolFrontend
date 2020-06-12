import React from 'react';
import {Table} from '../../components/Table'

import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faCheckDouble} from '@fortawesome/free-solid-svg-icons'
import { faBan} from '@fortawesome/free-solid-svg-icons'

export const Requests_list = () =>{

    return(
      <div>
        <div style={{marginTop: "50px"}}>
            {
              <Table request={'https://roboschool-api.herokuapp.com/api/admin/get_all_requests'} onDelete={'https://roboschool-api.herokuapp.com/api/admin/delete_request/'}
              extraButtons={ [{'name' : 'confirm', 'icon' : faCheck, 'request' : 'https://roboschool-api.herokuapp.com/api/admin/confirm_request/', enable : [{'date_confirmed' : 'pending'}]},  
                              {'name' : 'finish', 'icon' : faCheckDouble, 'request' : 'https://roboschool-api.herokuapp.com/api/admin/finish_request/', enable : [{'date_finished' : 'not yet'}, {'date_confirmed' : '!pending'}]},
                              {'name' : 'reject', 'icon' : faBan, 'request' : 'https://roboschool-api.herokuapp.com/api/manager/reject_request/', enable : [{'date_rejected' : 'pending'}, {'date_confirmed' : 'pending'}]}] }>
              </Table>
              }
        </div>
      </div>
    )
}