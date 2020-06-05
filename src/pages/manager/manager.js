import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {AlertState} from '../../context/alert/AlertState'
import {Navbar} from '../../components/NavBar'

import {Manager_home} from './manager_home'
import {Groups_list} from './manager_groups_list'
import {Requests_list} from './manager_requests_list'
import {Items_list} from './manager_items_list'
import {Courses_list} from './manager_courses_list'
import {Providers_list} from './manager_providers_list'

export const manager = () =>{
    return (
        <AlertState>
		<BrowserRouter>
        <Navbar params={[{title: 'Home', link: '/manager/home'}, 
                         {title: 'Groups', link: '/manager/groups_list'},
                         {title: 'Requests', link: '/manager/requests_list'}, 
                         {title: 'Items', link: '/manager/items_list'}, 
                         {title: 'Courses', link: '/manager/courses_list'},  
                         {title: 'Providers', link: '/manager/providers_list'}]}/>

		<div className="container">
			<Switch>
			   <Route path={'/manager/home'} component={Manager_home} />
			   <Route path={'/manager/groups_list'} component={Groups_list} />
               <Route path={'/manager/requests_list'} component={Requests_list} />
			   <Route path={'/manager/items_list'} component={Items_list} />
			   <Route path={'/manager/courses_list'} component={Courses_list} />
               <Route path={'/manager/providers_list'} component={Providers_list} />
			</Switch>
		</div>
		</BrowserRouter>
		</AlertState>
    )
}