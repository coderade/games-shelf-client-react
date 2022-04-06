import React, {Component, Fragment} from "react";
import ShelfService from "../../services/ShelfService";
import {Link, useParams} from "react-router-dom"

class Genre extends Component {
    state = {
        games: [], isLoaded: false, error: null
    }

    componentDidMount() {
        const genreId = this.props.params.id;
        ShelfService.getAllGames(genreId, null)
            .then(result => {
                this.setState({
                    games: result.games, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games by genre: ${err}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        let {games, isLoaded, error} = this.state;
        if(!games) games =[];

        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2>Genre: </h2>
                <div className="list-group">
                    {games.map(game => (
                        <Link to={`/games/${game.id}`} className="list-group-item list-group-item-action" key={game.id}>
                            {game.title}
                        </Link>
                    ))}
                </div>

            </Fragment>);
        }
    }
}

function withRouter(Component) {
    function ComponentWithRouter(props) {
        let params = useParams()
        return <Component {...props} params={params} />
    }
    return ComponentWithRouter
}

export default withRouter(Genre);