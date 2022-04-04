import React, {Component, Fragment} from 'react'
import { Link} from 'react-router-dom'

export default class Platforms extends Component {
    render() {
        return (
            <div>
                <h2>Platforms</h2>
                <ul>
                    <li>
                        <Link to='n64'>Nintendo 64</Link>
                    </li>
                    <li>
                        <Link to='ps1'>PS1</Link>
                    </li>
                </ul>
            </div>
        )
    }
}