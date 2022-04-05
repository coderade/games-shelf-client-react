import React, {Component, Fragment} from "react";
import ShelfService from "../../services/ShelfService";
import { useParams } from "react-router-dom"

class Game extends Component {
    state = {
        game: {}, isLoaded: false, error: null
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
                const errorMessage = `Error loading games: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {game, isLoaded, error} = this.state;
        if(!game.genres) game.genres = [];


        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2>{game.title} ({game.year})</h2>
                <div className="float-start">
                    <small>Rating {game.rating}</small>
                </div>
                <div className="float-end">
                    {game.genres.map((genre, idx) => (
                        <span className="badge bg-secondary me-1" key={idx}>
                            {genre.name}
                        </span>
                    ))}
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

export default withRouter(Game);