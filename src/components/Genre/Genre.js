import React, {Fragment, useEffect, useState} from "react";
import ShelfService from "../../services/ShelfService";
import {Link, useLocation, useParams} from "react-router-dom"

function Genre  () {

    const location = useLocation();
    const {id} = useParams()
    const [games, setGames] = useState([])
    const [error, setError] = useState("")


    useEffect(() => {
        ShelfService.getAllGames(id, null)
            .then(result => {
                setGames(result.games)
            })
            .catch(err => {
                const errorMessage = `Error loading games by genre: ${err}`;
                setError(errorMessage)
            })
    }, [id])
    if (error) {
        return <div className="error-message">{error}</div>
    } else {
        return (<Fragment>
            <h2>Genre: {location.state.genreName} </h2>
            <div className="list-group">

                {games ? games.map(game => (
                    <Link to={`/games/${game.id}`} className="list-group-item list-group-item-action" key={game.id}>
                        {game.title}
                    </Link>)) : "No games available for the genre"}
            </div>
        </Fragment>);
    }
}
export default Genre;