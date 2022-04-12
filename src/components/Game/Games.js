import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";
import './Games.css'

export default class Games extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: [], isLoaded: false, error: null
        }
    }

    componentDidMount() {
        ShelfService.getAllGames()
            .then(result => {
                this.setState({
                    games: result.games, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games: ${err}`;
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
                <div className="list-group">
                    {games.map(game => (
                        <Link key={game.id} to={`/games/${game.id}`} className="list-group-item list-group-item-action" >
                            {game.title}
                        </Link>))}
                </div>
            </Fragment>);
        }
    }
}