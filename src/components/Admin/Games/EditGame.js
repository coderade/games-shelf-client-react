import React, {Component, Fragment} from 'react'
import "./EditGame.css"
import Input from "../../Form/Input";
import TextArea from "../../Form/TextArea";
import InputNumber from "../../Form/InputNumber";
import {useParams} from "react-router-dom";
import ShelfService from "../../../services/ShelfService";

class EditGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                id: 0, title: "", description: "", year: 0, publisher: "", rating: 0
            }, isLoaded: false, error: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const gameId = this.props.params.id;

        if(gameId){
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
    }

    render() {
        let {game} = this.state

        return (<Fragment>
            <h2>Add/Edit Game</h2>
            <hr/>
            <form method="post" onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" id="id" value={game.id} onChange={this.handleChange}/>
                <Input title="Title" type="text" name="title" value={game.title} onChange={this.handleChange}/>
                <TextArea title="Description" name="description" value={game.description} onChange={this.handleChange}/>
                <Input title="Publisher" type="text" name="publisher" value={game.publisher} onChange={this.handleChange}/>
                <InputNumber title="Year" name="year" value={game.year} onChange={this.handleChange}
                             min="1970" max="2022" maxLength="4" />
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">
                        Rating
                    </label>
                    <select className="form-select" value={game.rating} name="rating" onChange={this.handleChange}>
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
        console.log("Form was submitted")
        evt.preventDefault()
    }

    handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState(prevState => ({
            game: {
                ...prevState.game, [name]: value
            }
        }))
    }



}

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}

export default withRouter(EditGame);