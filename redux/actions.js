export const SET_COUNTER = 'SET_COUNTER'
export const INCREASE_COUNTER = 'INCRESE_COUNTER'
export const DECREASE_COUNTER = 'INCRESE_COUNTER'

export const SET_ERR = 'SET_ERR'
export const SET_SUM = 'SET_SUM'
export const SET_TABLE = 'SET_TABLE'
export const SET_RESTAURANT = 'SET_RESTAURANT'

export const setCounter = counter => dispatch =>{
    dispatch({
        type: SET_COUNTER,
        payload: counter
    });
}
export const increaseCounter = counter => dispatch =>{
    dispatch({
        type: INCREASE_COUNTER,
        payload: counter
    });
}
export const decreaseCounter = counter => dispatch =>{
    dispatch({
        type: DECREASE_COUNTER,
        payload: counter
    });
}
export const setSum = sum => dispatch =>{
    dispatch({
        type: SET_SUM,
        payload: sum
    });
}
export const setTable = table => dispatch =>{
    dispatch({
        type: SET_TABLE,
        payload: table
    });
}
export const setRestaurant = restaurant => dispatch =>{
    dispatch({
        type: SET_RESTAURANT,
        payload: restaurant
    });
}
export const setErr = err => dispatch =>{
    dispatch({
        type: SET_ERR,
        payload: err
    });
}