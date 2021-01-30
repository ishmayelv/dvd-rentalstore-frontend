import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};



const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.RENTFILM_INIT: return purchaseInit( state, action );
        case actionTypes.FETCH_AVAILABLE_FILM_START: return purchaseBurgerStart( state, action );
        case actionTypes.FETCH_AVAILABLE_FILM_SUCCESS: return purchaseBurgerSuccess( state, action )
        case actionTypes.FETCH_AVAILABLE_FILM_FAIL: return purchaseBurgerFail( state, action );        
        default: return state;
    }
};
export default reducer;
 