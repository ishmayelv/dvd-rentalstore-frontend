import axios from 'axios'
import { JPA_API_URL, API_URL } from '../../api/todo/Constants.js'

class TodoDataService {
	retrieveAllTodos(name) {
        console.log('retrieveAllTodos --')
        return axios.get(`${JPA_API_URL}/users/${name}/todos`);
	}
	retrieveTodo(name, id) {
	    console.log('executed service')
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
	}

	deleteTodo(name, id) {
		console.log('executed service')
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
	}

	updateTodo(name, id, todo) {
		console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
	}

	createTodo(name, todo) {
		console.log('executed service')
        return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
	}
}
export default new TodoDataService()