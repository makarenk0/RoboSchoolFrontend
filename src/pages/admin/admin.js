import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AlertState} from '../../context/alert/AlertState'
import {Navbar} from '../../components/NavBar'
import {Managers_list} from './admin_managers_list'


export const admin = () =>{
    return (
        <AlertState>
		<BrowserRouter>
        <Navbar params={[{title: 'Managers', link: '/admin/managers_list'}, {title: 'Teachers', link: '/teachres_list'}, 
        {title: 'Schools', link: '/schools_list'}, {title: 'Requests', link: '/requests_list'}, 
        {title: 'Courses', link: '/courses_list'}]}/>
		<div className="container">
			<Switch>
			   <Route path={'/admin/managers_list'} component={Managers_list} />
			</Switch>
		</div>
		</BrowserRouter>
		</AlertState>
    )
}

//<Route path={'/'} exact component={Home} />