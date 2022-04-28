import React, {Fragment, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";

const Genres = () => {

    const [genres, setGenres] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        ShelfService.getGenres()
            .then(result => {
                setGenres(result.genres)
            })
            .catch(err => {
                const errorMessage = `Error loading genres: ${err.status} - ${err.statusText}`;
                setError(errorMessage)
            })
    }, [])

    if (error) {
        return <div className="error-message">{error}</div>
    } else {
        return (<Fragment>
            <h2>Genres</h2>
            <div className="list-group">
                {genres.map(genre => (<Link key={genre.id} to={`/genres/${genre.id}`}  state={{ genreName: genre.name }}
                                            className="list-group-item list-group-item-action">
                    {genre.name}
                </Link>))}
            </div>
        </Fragment>)
    }
}

export default Genres;