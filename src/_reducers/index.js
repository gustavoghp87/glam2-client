import { combineReducers } from 'redux'
import user, { mode } from './user_reducer'


const rootReducer = combineReducers({
    user, mode
})

export default rootReducer
