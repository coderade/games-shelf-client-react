import React, {Component, Fragment} from 'react'
import ShelfService from "../../services/ShelfService";

export default class Genre extends Component {
    state = {
        games: [], isLoaded: false, error: null
    }

    componentDidMount() {
        const gameId = this.props.params.id;
        ShelfService.getGame(gameId)
            .then(result => {
                this.setState({
                    game: result.game, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        return <h2>Genre: {this.props.title}</h2>
    }

}