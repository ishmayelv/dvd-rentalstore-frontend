import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//import AuthenticatedRoute from '../common/AuthenticatedRoute.jsx'

import AuthenticatedRoute from '../components/auth/AuthenticatedRoute'

import LoginComponent from './LoginComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'

import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import TodoComponent from './ui/TodoComponent'

import TopRentedFilmsComp from './ui/TopRentedFilmsComp'
import UsersRentedByCategoryComp from './ui/UsersRentedByCategoryComp'

import ListAvailableFilms from './ui/ListAvailableFilms'


import classes from './DvdStore.css';


class DvdStoreApp extends Component {
  
    render() {  
		return (
            <div className="mainBody">
                
                <Router>
                    <>
						<HeaderComponent/>                        
                        <Switch>
                                {/* Redirect to welcome page if the user is already logged in */}
							    <Route path="/" exact component={LoginComponent} />
                                <Route path="/login" component={LoginComponent} />
							    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                                <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
                                <AuthenticatedRoute path="/rentAFilm" component={ListAvailableFilms} />   
                                <AuthenticatedRoute path="/distinctUsersByCategory" component={UsersRentedByCategoryComp} />
                                <AuthenticatedRoute path="/topRentedFilms" component={TopRentedFilmsComp} />

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