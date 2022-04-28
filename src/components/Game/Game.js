import React, {Component, Fragment, useEffect, useState} from "react";
import ShelfService from "../../services/ShelfService";
import {useNavigate, useParams} from "react-router-dom"
import {confirmAlert} from "react-confirm-alert";
import Modal from "../Modal/Modal";
import FormAlert from "../Alert/Alert";

function Game(props) {
    const navigate = useNavigate();
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [error, setError] = useState("")
    const [alert, setAlert] = useState({show: false})


    useEffect(() => {
        ShelfService.getGame(id)
            .then(result => {
                setGame(result.game)
            })
            .catch(err => {
                const errorMessage = `Error loading games: ${err}`;
                setError(errorMessage)
            })
    }, [id])

    const editGame = (game) => {
        let path = `/admin/games/edit/${game.id}`;
        navigate(path);
    }

    const deleteGame = (game) => {
        ShelfService.deleteGame(game.id).then(_ => {
            setAlert({
                variant: "success", title: "Success!", message: `Game ${game.title} deleted successfully!`, show: true
            })
            navigate("/games")
        })
            .catch(err => {
                const errorMessage = `Error deleting the game ${game.title}: ${err}`;
                setAlert({
                    variant: "danger", title: "Error!", message: errorMessage, show: true
                })
            })
    }

    const showAlert = (status) => {
        setAlert({show: status})
    }

    const confirmDelete = (game) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (<Modal title={"Delete Game?"}
                               description={`Are you sure you want to delete the game ${game.title}?`}
                               onClose={onClose} onClick={() => deleteGame(game)}/>);
            }
        });
    }

    return (<Fragment>
        <h2>{game.title} ({game.year})</h2>
        {alert.show ? <FormAlert variant={alert.variant}
                                 message={alert.message}
                                 title={alert.title}
                                 onClose={showAlert}/> : ""}
        <div className="float-start">
            <small> Rating {game.details?.metacritic_url ?
                <a href={game.details.metacritic_url}>{game.details.metacritic}</a> : game?.details?.metacritic}
            </small>
        </div>
        <div className="float-end">
            {game?.genres?.map((genre, idx) => (<span className="badge bg-secondary me-1" key={idx}>
                            {genre.name}
                        </span>))}
        </div>
        <div className="clearfix"/>
        <hr/>
        <table className="table table-compact table-striped">
            <thead/>
            <tbody>
            <tr>
                <td><strong>Title:</strong></td>
                <td>{game.title}</td>
            </tr>
            <tr>
                <td><strong>Description</strong></td>
                <td>{game.description}</td>
            </tr>
            <tr>
                <td><strong>Publisher</strong></td>
                <td>{game.publisher}</td>
            </tr>
            </tbody>
        </table>
        <div className="col-md-10"><img src={game.details?.background_image} alt=""/></div>
        {props.signed ? <div className="btn-wrapper">
            <button className="btn btn-secondary btn-space" onClick={() => editGame(game)}>Edit</button>
            <button className="btn btn-danger btn-space" onClick={() => confirmDelete(game)}>Delete
            </button>
        </div> : ""}

    </Fragment>);

}


export default Game;