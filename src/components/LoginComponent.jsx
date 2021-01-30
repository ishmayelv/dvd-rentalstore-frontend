import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from './auth/AuthenticationService'

class LoginComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			hasLoginFailed: false,
			showSuccessMessage: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.loginClicked = this.loginClicked.bind(this)
	}
	handleChange(event) {	
		this.setState({
			[event.target.name]: event.target.value
		})
	}
    loginClicked() {
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                console.log("LoginComponent.jsx : executeJwtAuthenticationService --->");
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        let login = (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name:<input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>

                </div>
            </div>
        ); 

        //check if the user is logged in or not, if not logged in redirect to log-in page
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        if (isUserLoggedIn) {
            login = <Redirect to="/welcome/'${isUserLoggedIn}'"/>
        } 

        return login; 
    }
}





export default LoginComponent