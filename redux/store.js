import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk'
import {counterReducer} from './reducers';
import {sumReducer} from './reducers';
import { tableReducer } from './reducers';
import { restaurantReducer } from './reducers';
import { errReducer } from './reducers';

const rootReducer = combineReducers({counterReducer, errReducer, sumReducer, tableReducer, restaurantReducer})

export const Store = createStore(rootReducer, applyMiddleware(thunk))