import React, { Component } from 'react'

export default class AddTodo extends Component {
    state = {
        name: ''
    }

    render() {
        return (
            <form
                className="addForm"
                onSubmit={ (e) => {
                    e.preventDefault();
                    this.props.addTodo(this.state.name);
                    this.setState({ name: '' });
                }}
            >
                <input
                    type="text"
                    id="inputText"
                    placeholder="Add new todo"
                    value={ this.state.name }
                    onChange={ (e) => this.setState({ name: e.target.value })}
                />
                <br />
                <input type="submit" value="Add" />
            </form>
        )
    }
}
