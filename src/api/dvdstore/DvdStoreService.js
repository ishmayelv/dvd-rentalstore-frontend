import axios from 'axios'
import { DVD_JPA_API_URL, DVD_API_URL } from '../../api/dvdstore/Constants.js'

class DvdStoreService {

    getAvailableFilmsByCategory(catId) {
        console.log('Calling getAvailableFilmsByCategory --')
        return axios.get(`${DVD_JPA_API_URL}/films/${catId}`);
    }


    getTopRentedCategory() {
        console.log('Calling getTopRentedMovies --')
        return axios.get(`${DVD_JPA_API_URL}/toprentcategories`);
    }

    getDistinctUsesRentedByCat() {
        console.log('Calling getDistinctUsesRentedByCat --')
        return axios.get(`${DVD_JPA_API_URL}/distinctUsersRentedByCategory`);
    }
     

	retrieveAllTodos(name) {
        console.log('retrieveAllTodos --')
        return axios.get(`${DVD_JPA_API_URL}/users/${name}/todos`);
    }

	retrieveTodo(name, id) {
	    console.log('executed service')
        return axios.get(`${DVD_JPA_API_URL}/users/${name}/todos/${id}`);
	}

	deleteTodo(name, id) {
		console.log('executed service')
        return axios.delete(`${DVD_JPA_API_URL}/users/${name}/todos/${id}`);
	}


	updateTodo(name, id, todo) {
		console.log('executed service')
        return axios.put(`${DVD_API_URL}/users/${name}/todos/${id}`, todo);
	}

	createTodo(name, todo) {
		console.log('executed service')
        return axios.post(`${DVD_JPA_API_URL}/users/${name}/todos/`, todo);
    }

}

export default new DvdStoreService()