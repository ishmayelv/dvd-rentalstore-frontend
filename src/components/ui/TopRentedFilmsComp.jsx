import React, { Component } from 'react'

import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

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
		console.log(this.state)
    }

   /* refreshTodos() {       
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({ todos: response.data })
                }
            )
    }*/
    
    refreshTodos() {
        console.log("Calling TopRented Movies");
		let username = AuthenticationService.getLoggedInUserName()
        DvdStoreService.getTopRentedCategory()
			.then(
				response => {
                    this.setState({ topRentedFilms: response.data })
                    console.log(" response.data "+response.data);
				}
			)
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

	render() {
		console.log('render')
		return (
			<div>
				<h1>Top Rented Films </h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
				<div className="container">
                    <table className="table table-fixed">
						<thead >
							<tr>
                                <th scope="col">Category</th>
                                <th scope="col">Demand</th>
                                <th scope="col">Sales</th>
							</tr>
						</thead>
						<tbody>
                            {
                                this.state.topRentedFilms.map(
                                    (topRentedCat, i) =>
                                        <tr key={i}>
                                            <td >{topRentedCat.movieName}</td>
                                            <td >{topRentedCat.totalDemand}</td>
                                            <td >{topRentedCat.totalSales}</td>
                                    </tr>
								)
							}
						</tbody>
					</table>
					<div className="row">
						<button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
					</div>
				</div>
			</div>
		)
	}
}
export default TopRentedFilmsComp