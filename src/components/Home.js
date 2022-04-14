import React, {Component} from 'react'
import GamesAppImage from "../static/images/n64-image.webp"

export default class Home extends Component {
    render() {
        return (<div className="text-center">
            <h2>Games Shelf App</h2>
            <img src={GamesAppImage} alt="Games Shelf App"/>
        </div>);
    }
}