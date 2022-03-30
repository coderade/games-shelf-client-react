import React, {Component, Fragment} from 'react'
import { Link} from 'react-router-dom'

export default class Genre extends Component {
    render() {
        return (
            <div>
                <h2>Genres</h2>
                <ul>
                    <li>
                        <Link to='adventure'>Adventure</Link>
                    </li>
                    <li>
                        <Link to='action'>Action</Link>
                    </li>
                </ul>
            </div>
        )
    }
}