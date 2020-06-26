import React, { Component } from 'react';
import TodoItem from './TodoItem.js';
import PropTypes from 'prop-types';

export default class Todos extends Component {
    render() {
        return this.props.todos.sort( (b, a) => b.completed - a.completed ).map(todo => (
            <TodoItem
                key={ todo._id }
                todo={ todo }
                markComplete={ this.props.markComplete }
                removeTodo={ this.props.removeTodo }
            />
        ))
    }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
