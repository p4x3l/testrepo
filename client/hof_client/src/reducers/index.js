import { combineReducers } from 'redux'
import authReducer from './authReducer'

const hofApp = combineReducers({
    authReducer,
})

export default hofApp