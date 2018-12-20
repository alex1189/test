import React from 'react';
import {
    Form, Input, Button,
} from 'antd';

export default class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPublishedChange = this.onPublishedChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: props.book ?props.book.title: '',
            author: props.book ? props.book.author : '',
            description: props.book ? props.book.description : '',
            published: props.book ? props.book.published : 0,

            error: ''
        };
    }

    onTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({ title: title }));
    }

    onAuthorChange(e) {
        const author = e.target.value;
        this.setState(() => ({ author: author }));
    }

    onDescriptionChange(e) {
        const description = e.target.value;
        this.setState(() => ({ description: description }));
    }

    onPublishedChange(e) {
        const published = parseInt(e.target.value);
        this.setState(() => ({ published: published }));
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.title || !this.state.author || !this.state.published) {
            this.setState(() => ({ error: 'Please set title & author & published!' }));
        } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmitBook(
                {
                    title: this.state.title,
                    author: this.state.author,
                    description: this.state.description,
                    published: this.state.published
                }
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <Form onSubmit={this.onSubmit} className='add-book-form'>

                    <Input type="text" placeholder="title" autoFocus
                           value={this.state.title}
                           onChange={this.onTitleChange} />
                    <br />

                    <Input type="text" placeholder="author"
                           value={this.state.author}
                           onChange={this.onAuthorChange} />
                    <br />

                    <Input type='textarea' placeholder="description"
                              value={this.state.description}
                              onChange={this.onDescriptionChange} />
                    <br />

                    <Input type="number" placeholder="published"
                           value={this.state.published}
                           onChange={this.onPublishedChange} />
                    <br />


                    <Form.Item>
                        <Button size="large" type="primary"  htmlType="submit">
                            Add book
                        </Button>
                    </Form.Item>


                </Form>
            </div>
        );
    }
}