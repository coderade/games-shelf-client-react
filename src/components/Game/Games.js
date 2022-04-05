import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";
import './Games.css'

export default class Games extends Component {

    state = {
        games: [], isLoaded: false, error: null
    }

    componentDidMount() {
        ShelfService.getAllGames()
            .then(result => {
                this.setState({
                    games: result.games, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {games, isLoaded, error} = this.state;
        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
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