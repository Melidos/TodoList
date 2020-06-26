import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class TodoItem extends Component {
    getStyle = () => {
        return {
            background: "f4f4f4",
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? "line-through" : "none",
            color: this.props.todo.completed ? "grey" : "black"
        };
    }

    render() {
        const { _id, name } = this.props.todo;
        return (
            <div style={ this.getStyle() }>
                <p>
                    <input type="checkbox" onChange={ this.props.markComplete.bind(this, _id) } checked={ this.props.todo.completed }/>
                    { name }
                    <button className="btnRemove" onClick={ this.props.removeTodo.bind(this, _id) }>Remove</button>
                </p>
            </div>
        )
    }
}

TodoItem.propTypes = {
    todo: propTypes.object.isRequired
}