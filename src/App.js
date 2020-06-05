import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './pages/Home';
import {SignIn} from './pages/SignIn';
import {AlertState} from './context/alert/AlertState'

import {admin} from './pages/admin/admin';
import {manager} from './pages/manager/manager';
import {teacher} from './pages/teacher/teacher';


function App(){
	return(
		
		<AlertState>
		<BrowserRouter>
		<div>
			<Switch>
				<Route path={'/'} exact component={Home} />
				<Route path={'/signIn/:userType'} component={SignIn} />
				<Route path={'/admin'} component={admin} />
				<Route path={'/manager'} component={manager} />
				<Route path={'/teacher'} component={teacher} />
			</Switch>
		</div>
		</BrowserRouter>
		</AlertState>
	)
		
}

export default App;
//container