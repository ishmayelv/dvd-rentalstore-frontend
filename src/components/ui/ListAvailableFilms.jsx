import React, { Component } from 'react'


import { connect } from 'react-redux';
import axios from '../../axios-dvdstore';


import AuthenticationService from '../auth/AuthenticationService.js' 
import DvdStoreService from '../../api/dvdstore/DvdStoreService.js'


import Spinner from '../../utils/Spinner';
import FilmControl from '../ui/FilmControl'
import withErrorHandler from '../../api/withErrorHandler';

import * as actions from '../../store/actions/index'; 

 
class ListAvailableFilms extends Component {
	constructor(props) {		
		super(props)
        this.state = {
            catId:1,
            availableFilms:[],
			message: null
		}
        this.listAvailableFilms = this.listAvailableFilms.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    } 


    //React Life cycle methods
	componentDidMount() {
        this.listAvailableFilms();
    } 

    listAvailableFilms() {
        console.log("Called listAvailableFilms ");
        DvdStoreService.getAvailableFilmsByCategory(this.state.catId)
			.then(
            response => {
                console.log("listAvailableFilms - response.data:" + response.data);
                this.setState({ availableFilms: response.data })
            })
           
    } 

    

    addToCart() {
        console.log("Called addToCart ");
    }
    removeFromCart() {
        console.log("Called removeFromCart ");
    }
    
    render(){ 
       return (          
           <div align="center" >
               <h4> Rent a movie </h4>
                   <div class="col-xs-10">
                       <table className="table-sm table-striped table-bordered" >
                           
                               <tr>
                                   <th align="left">Title</th>
                                   <th align="right">Film Description</th>
                                   <th align="right">Release Year</th>
                                   <th align="right">RentalRate</th>
                                   <th align="right">Rating</th>
                                   <th align="right">Rental Duration</th>
                               </tr>
                           
                               {
                               this.state.availableFilms.map(
                                       (film, i) =>
                                           <tr key={film.filmId}>
                                               <td align="left">{film.filmTitle}</td>
                                               <td align="left">{film.filmDesc}</td>
                                               <td align="left">{film.releaseYear}</td>
                                               <td align="left">{film.rentalRate}</td>
                                               <td align="left">{film.rating}</td>  
                                               <td align="left">{film.rentalDuration}</td>
                                           </tr>
                                   )
                       }


                        
                       </table>
                   </div>
           </div>

       );  
	}


} 

{/*
const mapStateToProps = state => {
    return {
        movies: state.movies,
        username: state.username,
        loading: state.loading

    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchAvailableFilms: () => dispatch( actions.fetchFilmsForRent() )
    };
};

connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ListAvailableFilms, axios))
*/}

export default ListAvailableFilms ;
