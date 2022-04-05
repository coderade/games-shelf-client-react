import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";

export default class Games extends Component {

    state = {
        games: [], isLoaded: false
    }

    componentDidMount() {
        ShelfService.getAllGames().then(result => this.setState({games: result.games, isLoaded: true}))
    }

    render() {
        const {games, isLoaded} = this.state;
        if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2> Choose a game </h2>
                <ul>
                    {games.map(game => (<li key={game.id}>
                        <Link to={`/games/${game.id}`}>
                            {game.title}
                        </Link>
                    </li>))}
                </ul>
            </Fragment>);
        }
    }
}