import React from 'react';
import BookForm from './BookForm';
import { connect } from 'react-redux';
import { addBook,_getTotal ,getBooks} from '../actions/books';

const AddBook = (props) => (
    <div>
        <h3>Set Book information:</h3>
        <BookForm
            onSubmitBook={(book) => {
                props.dispatch(addBook(book)).then(getBooks());
                props.dispatch(_getTotal((props.page.total)+1));
                props.history.push('/');
            }}
        />
    </div>
);

const mapStateToProps = (state) => {
    return {
        page: state.page,

    };
}

export default connect(mapStateToProps)(AddBook);