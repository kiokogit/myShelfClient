import { combineReducers } from 'redux'
import { books, comments } from './bookshelf'
import { journal } from './journal'

export default combineReducers({
    books, comments, journal,
})