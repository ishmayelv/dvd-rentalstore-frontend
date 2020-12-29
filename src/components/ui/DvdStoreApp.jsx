import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

import TopRentedFilmsComp from './TopRentedFilmsComp.jsx'
import UsersRentedByCategoryComp from './UsersRentedByCategoryComp'


class DvdStoreApp extends Component {
	render() {
		return (
			<div className="TodoApp">
				<Router>
					<>
						<HeaderComponent/>
                        
                            <Switch>
							    <Route path="/" exact component={LoginComponent} />
							    <Route path="/login" component={LoginComponent} />
							    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                                <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />

                                <AuthenticatedRoute path="/distinctUsersByCategory" component={UsersRentedByCategoryComp} />
                                <AuthenticatedRoute path="/topRentedFilms" component={TopRentedFilmsComp} />


							    <AuthenticatedRoute path="/logout" component={LogoutComponent} />
							    <Route component={ErrorComponent} />
                            </Switch>
                         

                        <FooterComponent />

					</>
				</Router>
			</div>
		)
	}
}

export default DvdStoreApp