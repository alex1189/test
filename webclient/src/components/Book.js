
import
    React
    from
    'react';
import
    {
        Link
    }
    from
    'react-router-dom';
import
    {
        connect
    }
    from
    'react-redux';
import
    {
        removeBook
    }
    from
    '../actions/books';
import
    {
        Button
    }
    from
    'antd';
import
    '../styles/App.css';

    const Book = ({id, title, description, author, published, dispatch}) => (
        <div>
            <Link to={`/book/${id}`}>
                <h4>{title}</h4>
            </Link>
            <p> ({published})</p>
            <p>Authorr: {author}</p>
            {/* {description &&   */}
            <p>({description})</p>
            {/* } */}
            <Button type="primary" onClick={() => {
                dispatch(removeBook({id}));
            }}>Remove</Button>
        </div>
    );

export default
    connect()(Book);

