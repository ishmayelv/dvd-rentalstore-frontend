import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponent extends Component {
	render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        
		return (
			<header>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark">
					<div><a href="#" className="navbar-brand">DVD Store</a></div>

                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/ishmayel">Home</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos5">Rent A Film</Link></li>}


                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos1">Top Rented Films</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos2">Users Rented Movies</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos3">Avg Rental Rate</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos4">Films Returned Late</Link></li>}

                        

                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Top 5 Customers</Link></li>}   
                    </ul>
					<ul className="navbar-nav navbar-collapse justify-content-end">
						{!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
						{isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
					</ul>
				</nav>
			</header>
		)
	}
}
export default withRouter(HeaderComponent);