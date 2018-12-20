import books from './books.js'
import mytext from './SearchMytext'
import page from './page'
import { combineReducers } from 'redux'
export default combineReducers({
    books,
    mytext,
    page
})