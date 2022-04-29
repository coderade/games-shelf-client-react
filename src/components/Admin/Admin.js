import React, {Component, useEffect, useState} from 'react'
import {Table} from "react-bootstrap";
import ShelfService from "../../services/ShelfService";
import {Link, useNavigate} from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState([])
    const [error, setError] = useState("")

    const goToAddGamesPage = () => {
        navigate("/admin/games/add");
    }

    useEffect(() => {
        ShelfService.getAllGames()
            .then(result => setGames(result.games))
            .catch(err => {
                const errorMessage = `Error loading games: ${err}`;
                setError(errorMessage)
            })
    }, [])

    return (<div>
        <h2>Manage games</h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Publisher</th>
                <th>Rating</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {games.map(game => (<tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.title}</td>
                <td>{game.publisher}</td>
                <td>{game.rating}</td>
                <td className="text-center align-middle">
                    <div className="btn-group">
                        <Link to={`/games/${game.id}`} className="btn btn-outline-primary">View</Link>
                    </div>
                </td>

            </tr>))}
            </tbody>
        </Table>

        <button className="btn btn-primary" onClick={goToAddGamesPage}>Add Game</button>
    </div>);
}

export default Admin