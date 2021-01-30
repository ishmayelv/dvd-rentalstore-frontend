import React, { Component } from 'react'

import AuthenticationService from '../auth/AuthenticationService'

import TodoDataService from '../../api/todo/TodoDataService.js'
import DvdStoreService from '../../api/dvdstore/DvdStoreService.js'
 

class TopRentedFilmsComp extends Component {

	constructor(props) {
		console.log('constructor')
		super(props)
        this.state = {
            topRentedFilms:[],
			todos: [],
			message: null
		}
		this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
		this.updateTodoClicked = this.updateTodoClicked.bind(this)
		this.addTodoClicked = this.addTodoClicked.bind(this)
		this.refreshTodos = this.refreshTodos.bind(this)
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
		this.refreshTodos();
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} Successful` })
                    this.refreshTodos()
                }
            )
    }

    addTodoClicked() {
        this.props.history.push('/todos/-1')
    }
    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/todos/${id}`)
    }

    refreshTodos() {
        console.log("Calling TopRented Movies");
		let username = AuthenticationService.getLoggedInUserName()
        DvdStoreService.getTopRentedCategory()
			.then(
            response => {
                console.log("Top rented films - response.data:" + response.data);
                    this.setState({ topRentedFilms: response.data })
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
                                    <th align="right">Demand</th>
                                    <th align="right">Sales</th>
							    </tr>
						    </thead>
						    <tbody>
                                {
                                    this.state.topRentedFilms.map(
                                        (topRentedCat, i) =>
                                            <tr key={i}>
                                                <td align="left">{topRentedCat.movieName}</td>
                                                <td align="right">{topRentedCat.totalDemand}</td>
                                                <td align="right">{topRentedCat.totalSales}</td>
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
export default TopRentedFilmsComp