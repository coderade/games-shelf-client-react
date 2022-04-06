import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";

export default class Genres extends Component {
    state = {
        genres: [], isLoaded: false, error: null
    }

    componentDidMount() {
        ShelfService.getGenres()
            .then(result => {
                this.setState({
                    genres: result.genres, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading genres: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {genres, isLoaded, error} = this.state;

        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2>Genres</h2>
                <ul>
                    {genres.map(genre => (<li key={genre.id}>
                        <Link to={`/genres/${genre.id}`} state={{genreName: genre.name}}>
                            {genre.name}
                        </Link>
                    </li>))}
                </ul>
            </Fragment>)
        }
    }
}