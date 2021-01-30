import * as actionTypes from './actionTypes';
import axios from '../../axios-dvdstore';
import { DVD_JPA_API_URL } from '../../api/dvdstore/Constants.js'

 
export const rentFilmInit = () => {
    return {
        type: actionTypes.RENTFILM_INIT
    };
};

export const fetchFilmsForRentStart = () => {
    return {
        type: actionTypes.FETCH_AVAILABLE_FILM_START
    };
};

export const fetchFilmsForRentFail = ( error ) => {
    return {
        type: actionTypes.FETCH_AVAILABLE_FILM_FAIL,
        error: error
    };
}; 

export const fetchAvailableMoviesSuccess = (movies) => {
    return {
        type: actionTypes.FETCH_AVAILABLE_FILM_SUCCESS,
        movies: movies
    };
};

export const fetchFilmsForRent = () => {
    console.log("fetchFilmsForRent action");
    return dispatch => {
        dispatch(fetchFilmsForRentStart()); 
        return axios.get(`${DVD_JPA_API_URL}/films/2`)
            .then(response => {
                dispatch(fetchAvailableMoviesSuccess(response.data));             
            })
            .catch( err => {
                dispatch(fetchFilmsForRentFail(err));
            } );
    };

};