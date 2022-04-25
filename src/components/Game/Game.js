import React, {Component, Fragment} from "react";
import ShelfService from "../../services/ShelfService";
import {useNavigate, useParams} from "react-router-dom"
import {confirmAlert} from "react-confirm-alert";
import Modal from "../Modal/Modal";
import FormAlert from "../Alert/Alert";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {}, isLoaded: false, error: null, signed: props.signed, alert: {
                show: false
            }
        }
    }

    routeChange = () => {
        let path = `/admin/games/edit/${this.state.game.id}`;
        this.props.navigate(path);
    }

    confirmDelete = (game) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (<Modal title={"Delete Game?"}
                               description={`Are you sure you want to delete the game ${game.title}?`}
                               onClose={onClose} onClick={() => this.deleteGame(game)}/>);
            }
        });
    }

    showAlert = (status) => {
        this.setState({alert: {show: status}})
    }

    deleteGame = (game) => {
        ShelfService.deleteGame(game.id).then(_ => {
            this.setState({
                alert: {
                    variant: "success",
                    title: "Success!",
                    message: `Game ${game.title} deleted successfully!`,
                    show: true
                }, isLoaded: true, initialGame: this.state.game
            })
            this.props.navigate("/games")
        })
            .catch(err => {
                const errorMessage = `Error deleting the game ${game.title}: ${err}`;
                this.setState({
                    alert: {
                        variant: "danger", title: "Error!", message: errorMessage, show: true
                    }, isLoaded: true
                })
            })

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
                const errorMessage = `Error loading games: ${err}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {game, isLoaded, alert, signed} = this.state;
        if (!game.genres) game.genres = [];

        if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>


                <h2>{game.title} ({game.year})</h2>
                {alert.show ? <FormAlert variant={alert.variant}
                                         message={alert.message}
                                         title={alert.title}
                                         onClose={this.showAlert}/> : ""}
                <div className="float-start">
                    <small> Rating {game.details.metacritic_url ?
                        <a href={game.details.metacritic_url}>{game.details.metacritic}</a> :
                        game.details.metacritic
                    }

                    </small>
                </div>
                <div className="float-end">
                    {game.genres.map((genre, idx) => (<span className="badge bg-secondary me-1" key={idx}>
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
                <div className="col-md-10"><img src={game.details.background_image} alt=""/></div>
                {signed ? <div className="btn-wrapper">
                    <button className="btn btn-secondary btn-space" onClick={this.routeChange}>Edit</button>
                    <button className="btn btn-danger btn-space" onClick={() => this.confirmDelete(game)}>Delete
                    </button>
                </div> : ""}

            </Fragment>);
        }
    }
}

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate}/>
    }

    return ComponentWithRouter
}

export default withRouter(Game);