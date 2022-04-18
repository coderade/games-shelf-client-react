import React, {Component, Fragment} from 'react'
import GraphQLService from "../services/GraphQLService";

export default class GraphQL extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }


    render() {
        const {games} = this.state;
        return (<Fragment>
            <h2>GraphQL</h2>
            <hr/>
            <div className="list-group">
                {games.map(game => (<a key={game.id}
                                       href={`#/games/${game.id}`}
                                       className="list-group-item list-group-item-action">
                    <strong>{game.title}</strong>
                    <small className="text-muted">
                        ({game.year}) - {game.publisher}
                    </small>
                    <br/>
                    {game.description.slice(0, 100)}...

                </a>))}
            </div>
        </Fragment>);
    }

    componentDidMount() {
        const payload = `
        {
            list {
                id
                title
                publisher
                year
                description
            }
        }
        `

        GraphQLService.list(payload)
            .then(result => this.setState({games: result.list}))
            .catch(err => {
                const errorMessage = `Error loading genres: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }
}