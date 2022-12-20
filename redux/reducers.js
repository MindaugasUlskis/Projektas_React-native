import { SET_COUNTER, INCREASE_COUNTER, SET_SUM,SET_ERR, SET_RESTAURANT, SET_TABLE } from "./actions";



export function counterReducer(state = {counter:[]}, action)
{
    switch(action.type){
        case SET_COUNTER:
            return{...state, counter: action.payload}
        case INCREASE_COUNTER:
            return {...state,
                counter: [...state.counter, action.payload]} // same as state.concat(action.portfolio)
        default:
            return state
}
}
export function sumReducer(state = {sum: 0}, action)
{
    switch(action.type){
        case SET_SUM:
            return{...state, sum: action.payload}
        default:
            return state;
    }
}
export function tableReducer(state = {table: 0}, action)
{
    switch(action.type){
        case SET_TABLE:
            return{...state, table: action.payload}
        default:
            return state;
    }
}
export function restaurantReducer(state = {restaurant: ""}, action)
{
    switch(action.type){
        case SET_RESTAURANT:
            return{...state, restaurant: action.payload}
        default:
            return state;
    }
}
export function errReducer(state = {err: ""}, action)
{
    switch(action.type){
        case SET_ERR:
            return{...state, err: action.payload}
        default:
            return state;
    }
}



