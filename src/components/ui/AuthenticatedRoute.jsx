import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import axios from 'axios'


class AuthenticatedRoute extends Component {


    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            (config) => {
                if (AuthenticationService.isUserLoggedIn()) {
                    config.headers.authorization = sessionStorage.getItem("USER_TOKEN")
                }
                return config
            }
        )
    }
    componentWillMount() {
        this.setupAxiosInterceptors();
    }

	render() {
		if (AuthenticationService.isUserLoggedIn()) {
			return <Route {...this.props} />
		} else {
			return <Redirect to="/login" />
		}
	}
}

export default AuthenticatedRoute