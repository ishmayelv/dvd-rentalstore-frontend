import React, { Component } from 'react'

import AuthenticationService from './AuthenticationService.js' 
import DvdStoreService from '../../api/dvdstore/DvdStoreService.js'
 
class UsersRentedByCategoryComp extends Component {
	constructor(props) {
		console.log('constructor')
		super(props)
        this.state = {
            seviceResponse:[],
			message: null
		}
        this.refreshData = this.refreshData.bind(this)
	}
    //React Life cycle methods
	componentWillUnmount() {
		console.log('componentWillUnmount')
	}
    //React Life cycle methods
	shouldComponentUpdate(nextProps, nextState) {
		console.log('shouldComponentUpdate')
		console.log(nextProps)
		console.log(nextState)
		return true
	}
    //React Life cycle methods
	componentDidMount() {
		console.log('componentDidMount')
        this.refreshData();
    } 

    refreshData() {
        console.log("Calling TopRented Movies");
		let username = AuthenticationService.getLoggedInUserName()
        DvdStoreService.getDistinctUsesRentedByCat()
			.then(
				response => {
                    this.setState({ seviceResponse: response.data })
            })      
    } 
    
	render() {
        return (

            <div className="container" align="center">
                <h4>Top & Least Rented Films By Category</h4>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                  
                <div className="row" >
                    <div class="col-xs-12">
                        <table className="table-sm table-striped table-bordered" >
						    <thead >
							    <tr>
                                    <th align="left">Category</th>
                                    <th align="right">Distinct Users Count</th>                                
							    </tr>
						    </thead>
						    <tbody>
                                {
                                    this.state.seviceResponse.map(
                                        (topRentedCat, i) =>
                                            <tr key={i}>
                                                <td align="left">{topRentedCat.category}</td>
                                                <td align="right">{topRentedCat.demand}</td>
                                        </tr>
								    )
							    }
						    </tbody>
                        </table>
                    </div>

                    
                </div>
			</div>
		)
	}
} 
export default UsersRentedByCategoryComp