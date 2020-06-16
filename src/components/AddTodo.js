import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        title: ''
    }

    render() {
        return (
            <form
                className="addForm"
                onSubmit={ (e) => {
                    e.preventDefault();
                    this.props.addTodo(this.state.title);
                    this.setState({ title: '' });
                }}
            >
                <input
                    type="text"
                    id="inputText"
                    placeholder="Add new todo"
                    value={ this.state.title }
                    onChange={ (e) => this.setState({ title: e.target.value })}
                />
                <br />
                <input type="submit" value="Add" />
            </form>
        )
    }
}
