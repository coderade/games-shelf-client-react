import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";

export default class Games extends Component {

    state = {games: []}

    componentDidMount() {
        this.setState({
            games: [{id: 1, title: "Super Mario 64", Publisher: "Nintendo"}, {
                id: 2,
                title: "The Legend of Zelda: Ocarina of Time",
                Publisher: "Nintendo"
            }, {id: 3, title: "GoldenEye 007", Publisher: "Nintendo"}]
        })
    }

    render() {
        return (<Fragment>
            <h2> Choose a game </h2>
            <ul>
                {this.state.games.map(game => (<li key={game.id}>
                    <Link to={`/games/${game.id}`}>
                        {game.title}
                    </Link>
                </li>))}
            </ul>
        </Fragment>);
    }
}