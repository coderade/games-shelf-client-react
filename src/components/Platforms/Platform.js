import React, {Fragment, useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom"
import ShelfService from "../../services/ShelfService";

const Platform = () => {
    const location = useLocation();
    const {id} = useParams()
    const [games, setGames] = useState([])
    const [error, setError] = useState("")

    useEffect((id) => {
        ShelfService.getAllGames(null, id)
            .then(result => {
                setGames(result.games)
            })
            .catch(err => {
                const errorMessage = `Error loading games by platform: ${err}`;
                setError(errorMessage)
            })
    }, [id])

    if (error) {
        return <div className="error-message">{error}</div>
    } else {
        return (<Fragment>
            <h2>Platform: {location.state.platformName} </h2>
            <div className="list-group">
                {games.map(game => (
                    <Link to={`/games/${game.id}`} className="list-group-item list-group-item-action" key={game.id}>
                        {game.title}
                    </Link>))}
            </div>

        </Fragment>);
    }
}

export default Platform;