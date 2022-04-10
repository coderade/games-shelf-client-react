import React, {Component, Fragment} from 'react'
import "./AddEditGame.css"
import Input from "../../Form/Input";
import TextArea from "../../Form/TextArea";
import InputNumber from "../../Form/InputNumber";
import {useNavigate, useParams} from "react-router-dom";
import ShelfService from "../../../services/ShelfService";
import FormAlert from "../../Alert/Alert";
import Modal from "../../Modal/Modal";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


class AddEditGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            game: {
                id: 0, title: "", description: "", year: 0, publisher: "", rating: 0
            }, isLoaded: false, error: null, isEditing: false, errors: [], showAlert: false, alert: {
                show: false, initialGame: {}
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentDidMount() {
        const gameId = this.props.params.id;
        if (gameId) {
            ShelfService.getGame(gameId)
                .then(result => {
                    this.setState({
                        game: result.game, initialGame: result.game, isLoaded: true, isEditing: true, alert: {
                            variant: "success",
                            title: "Success!",
                            message: "Games loaded from database successfully!",
                            show: true
                        }
                    })
                })
                .catch(err => {
                    const errorMessage = `Error loading games: ${err}`;
                    this.setState({
                        alert: {variant: "danger", title: "Error", message: errorMessage, show: true}, isLoaded: true
                    })
                })
        }
    }

    render() {
        let {game, isEditing, alert} = this.state
        return (<Fragment>
            {isEditing ? <h2>Edit Game ID: {game.id}</h2> : <h2> Add Game</h2>}
            {alert.show ? <FormAlert variant={alert.variant}
                                     message={alert.message}
                                     title={alert.title}
                                     onClose={this.showAlert}/> : ""}

            <hr/>

            <form method="post" onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" id="id"
                       value={game.id} onChange={this.handleChange}/>
                <Input title="Title" type="text" value={game.title} onChange={this.handleChange}
                       name="title" hasError={this.hasError}/>
                <TextArea title="Description" name="description"
                          value={game.description} onChange={this.handleChange}
                          hasError={this.hasError}/>
                <Input title="Publisher" type="text" name="publisher"
                       value={game.publisher} onChange={this.handleChange}
                       hasError={this.hasError}/>
                <InputNumber title="Year" name="year" value={game.year} hasError={this.hasError}
                             onChange={this.handleChange} min="1970" max="2022" maxLength="4"/>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <select className="form-select" value={game.rating} name="rating"
                            onChange={this.handleChange}>
                        <option className="form-select"> Choose...</option>
                        {Array.from({length: 11}, (x, i) => i).map(value => <option key={value} className="form-select"
                                                                                    value={value}>{value}</option>)}
                    </select>
                </div>
                <button className="btn btn-primary">Save</button>
                {isEditing ? <button className="btn btn-danger"
                                     onClick={() => this.confirmDelete(game)}>Delete</button> : ""}
            </form>
        </Fragment>)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        if (this.validateForm()) {
            const data = new FormData(evt.target)
            const payload = Object.fromEntries(data.entries());

            // state has been changed
            if (this.state.initialGame !== this.state.game) {
                if (this.state.isEditing) {
                    ShelfService.editGame(payload).then(_ => {
                        this.setState({
                            alert: {
                                variant: "success", title: "Success!", message: "Games saved successfully!", show: true
                            }, isLoaded: true, initialGame: this.state.game
                        })
                    })
                        .catch(err => {
                            const errorMessage = `Error Editing games: ${err}`;
                            this.setState({
                                alert: {
                                    variant: "danger", title: "Error!", message: errorMessage, show: true
                                }, isLoaded: true
                            })
                        })
                } else {
                    ShelfService.addGame(payload).then(_ => {
                        this.setState({
                            alert: {
                                variant: "success", title: "Success!", message: "Games saved successfully!", show: true
                            }, isLoaded: true, initialGame: this.state.game
                        })
                    })
                        .catch(err => {
                            const errorMessage = `Error adding games: ${err}`;
                            this.setState({
                                alert: {
                                    variant: "danger", title: "Error!", message: errorMessage, show: true
                                }, isLoaded: true
                            })
                        })
                }


            } else {
                console.log("Form not submitted, state has not been changed...")
            }


        }


    }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState(prevState => ({game: {...prevState.game, [name]: value}}))
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


    hasError = (key) => {
        return this.state.errors.includes(key)
    }

    showAlert = (status) => {
        this.setState({alert: {show: status}})
    }

    validateForm() {
        let errors = [];
        if (!this.state.game.title) {
            errors.push('title')
        }
        if (!this.state.game.description) {
            errors.push('description')
        }
        if (!this.state.game.publisher) {
            errors.push('publisher')
        }
        if (!this.state.game.year) {
            errors.push('year')
        }

        this.setState({errors: errors})

        if (!errors.length) {
            return true
        }
    }


}

function withRouter(Component) {
    function ComponentWithRouter(props) {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate}/>
    }

    return ComponentWithRouter
}

export default withRouter(AddEditGame);