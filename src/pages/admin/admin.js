import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AlertState} from '../../context/alert/AlertState'
import {Navbar} from '../../components/NavBar'
import {Managers_list} from './admin_managers_list'
import {Teachers_list} from './admin_teachers_list'
import {Schools_list} from './admin_schools_list'
import {Providers_list} from './admin_providers_list'
import {Items_list} from './admin_items_list'
import {Courses_list} from './admin_courses_list'
import {Requests_list} from './admin_requests_list'


export const admin = () =>{
    return (
        <AlertState>
		<BrowserRouter>
        <Navbar params={[{title: 'Managers', link: '/admin/managers_list'}, {title: 'Teachers', link: '/admin/teachers_list'}, 
        {title: 'Schools', link: '/admin/schools_list'}, {title: 'Requests', link: '/admin/requests_list'}, 
        {title: 'Courses', link: '/admin/courses_list'},  {title: 'Items', link: '/admin/items_list'}, {title: 'Providers', link: '/admin/providers_list'}]}/>
		<div className="container">
			<Switch>
			   <Route path={'/admin/managers_list'} component={Managers_list} />
			   <Route path={'/admin/teachers_list'} component={Teachers_list} />
			   <Route path={'/admin/schools_list'} component={Schools_list} />
			   <Route path={'/admin/providers_list'} component={Providers_list} />
			   <Route path={'/admin/items_list'} component={Items_list} />
			   <Route path={'/admin/courses_list'} component={Courses_list} />
			   <Route path={'/admin/requests_list'} component={Requests_list} />
			</Switch>
		</div>
		</BrowserRouter>
		</AlertState>
    )
}

//<Route path={'/'} exact component={Home} />