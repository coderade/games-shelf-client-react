import React, {Component, Fragment} from 'react'
import { Link} from 'react-router-dom'

export default class Genre extends Component {
    render() {
        return <h2>Genre: {this.props.title}</h2>
    }

}