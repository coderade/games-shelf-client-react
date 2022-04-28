import React, {Fragment, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";
import './Games.css'

function Games(props) {
    const [games, setGames] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        ShelfService.getAllGames()
            .then(result => setGames(result.games))
            .catch(err => {
                const errorMessage = `Error loading games: ${err}`;
                setError(errorMessage)
            })
    }, [])

    if (error) {
        return <div className="error-message">{error}</div>
    } else {
        return (<Fragment>
            <h2> Choose a game </h2>
            <div className="list-group">
                {games.map(game => (
                    <Link key={game.id} to={`/games/${game.id}`} className="list-group-item list-group-item-action">
                        {game.title}
                    </Link>))}
            </div>
        </Fragment>);
    }
}

export default Games;