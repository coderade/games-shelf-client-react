import React, {Component, Fragment} from 'react'
import "./EditGame.css"
import game from "../../Game/Game";

export default class EditGame extends Component {
    state = {
        game: {}, isLoaded: false, error: null
    }

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

    componentDidMount() {
        this.setState()
    }

    render() {
        let {game} = this.state

        return (<Fragment>
            <h2>Add/Edit Game</h2>
            <hr/>
            <form method="post" onSubmit={this.handleSubmit}>
                <input type="hidden" name="id" id="id" value={game.id} onChange={this.handleChange}/>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control"
                           id="title" name="title" value={game.title}
                           onChange={this.handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea rows="3" className="form-control" id="description" name="description"
                              value={game.description} onChange={this.handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">
                        Publisher
                    </label>
                    <input type="text" className="form-control" id="publisher" name="publisher"
                           value={game.publisher} onChange={this.handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">
                       Year
                    </label>
                    <input type="number" min="1970" max="2022" className="form-control" id="year" name="year"
                           maxLength="4" value={game.year} onChange={this.handleChange}/>
                </div>
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
}