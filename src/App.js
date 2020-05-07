import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './pages/Home';
import {SignIn} from './pages/SignIn';

function App(){
	return(
		<BrowserRouter>
		<div className="container pt-4">
			<Switch>
				<Route path={'/'} exact component={Home} />
				<Route path={'/signIn/:userType'} component={SignIn} />
			</Switch>
		</div>
		</BrowserRouter>
	)
}

export default App;