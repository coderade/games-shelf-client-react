import React, {Component, Fragment} from 'react'
import "./AddEditGame.css"
import Input from "../../Form/Input";
import TextArea from "../../Form/TextArea";
import InputNumber from "../../Form/InputNumber";
import {useParams} from "react-router-dom";
import ShelfService from "../../../services/ShelfService";

class AddEditGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                id: 0, title: "", description: "", year: 0, publisher: "", rating: 0
            }, isLoaded: false, error: null, isEditing: false, errors: []
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
                        game: result.game, isLoaded: true, isEditing: true
                    })
                })
                .catch(err => {
                    const errorMessage = `Error loading games: ${err}`;
                    this.setState({error: errorMessage, isLoaded: true})
                })
        }
    }

    render() {
        let {game, isEditing} = this.state
        return (<Fragment>
            {isEditing ? <h2>Edit Game ID: {game.id}</h2> : <h2> Add Game</h2>}
            <hr/>
            <form method="post" onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" id="id"
                       value={game.id} onChange={this.handleChange}/>
                <Input title="Title" type="text" value={game.title} onChange={this.handleChange}
                       name="title" className={this.hasError("title") ? "is-invalid" : ""}
                       errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                       errorMsg={"Please enter a title"}/>
                <TextArea title="Description" name="description"
                          value={game.description} onChange={this.handleChange}
                          className={this.hasError("description") ? "is-invalid" : ""}
                          errorDiv={this.hasError("description") ? "text-danger" : "d-none"}
                          errorMsg={"Please enter a description"}/>
                <Input title="Publisher" type="text" name="publisher"
                       value={game.publisher} onChange={this.handleChange}
                       className={this.hasError("publisher") ? "is-invalid" : ""}
                       errorDiv={this.hasError("publisher") ? "text-danger" : "d-none"}
                       errorMsg={"Please enter a publisher"}/>
                <InputNumber title="Year" name="year" value={game.year}
                             onChange={this.handleChange} min="1970" max="2022" maxLength="4"
                             className={this.hasError("year") ? "is-invalid" : ""}
                             errorDiv={this.hasError("year") ? "text-danger" : "d-none"}
                             errorMsg={"Please enter an year"}/>
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
            </form>
            <div className="mt-3">
                <pre>{JSON.stringify(this.state, null, 3)}</pre>
            </div>
        </Fragment>)
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        if(this.validateForm()){
            const data = new FormData(evt.target)
            const payload = Object.fromEntries(data.entries());

            ShelfService.addGame(payload).then(result => {
                console.log(result)
            })
                .catch(err => {
                    const errorMessage = `Error loading games: ${err}`;
                    this.setState({error: errorMessage, isLoaded: true})
                })
        }


    }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState(prevState => ({game: {...prevState.game, [name]: value}}))
    }

    hasError(key) {
        return this.state.errors.includes(key)
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

        if(errors.length){
            return true
        }
    }


}

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        return <Component {...props} params={params}/>
    }

    return ComponentWithRouter
}

export default withRouter(AddEditGame);