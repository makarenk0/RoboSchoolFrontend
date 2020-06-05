import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {AlertState} from '../../context/alert/AlertState'
import {Navbar} from '../../components/NavBar'

import {Teacher_home} from './teacher_home'
import {Groups_list} from './teacher_groups_list'
import {Requests_list} from './teacher_requests_list'
import {Items_list} from './teacher_items_list'
import {Courses_list} from './teacher_courses_list'
import {Providers_list} from './teacher_providers_list'

export const teacher = () =>{
    return (
        <AlertState>
		<BrowserRouter>
        <Navbar params={[{title: 'Home', link: '/teacher/home'}, 
                         {title: 'Groups', link: '/teacher/groups_list'},
                         {title: 'Requests', link: '/teacher/requests_list'}, 
                         {title: 'Items', link: '/teacher/items_list'}, 
                         {title: 'Courses', link: '/teacher/courses_list'},  
                         {title: 'Providers', link: '/teacher/providers_list'}]}/>

		<div className="container">
			<Switch>
			   <Route path={'/teacher/home'} component={Teacher_home} />
			   <Route path={'/teacher/groups_list'} component={Groups_list} />
               <Route path={'/teacher/requests_list'} component={Requests_list} />
			   <Route path={'/teacher/items_list'} component={Items_list} />
			   <Route path={'/teacher/courses_list'} component={Courses_list} />
               <Route path={'/teacher/providers_list'} component={Providers_list} />
			</Switch>
		</div>
		</BrowserRouter>
		</AlertState>
    )
}