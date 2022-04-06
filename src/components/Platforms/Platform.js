import React, {Component, Fragment} from "react";
import ShelfService from "../../services/ShelfService";
import {Link, useLocation, useParams} from "react-router-dom"

class Platform extends Component {
    state = {
        games: [], platformName: '', isLoaded: false, error: null
    }

    componentDidMount() {
        const platformId = this.props.params.id;
        ShelfService.getAllGames(null, platformId)
            .then(result => {
                this.setState({
                    games: result.games, isLoaded: true, platformName: this.props.location.state.platformName
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games by platform: ${err}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        let {games, isLoaded, platformName, error} = this.state;
        if(!games) games =[];

        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2>Platform: {platformName} </h2>
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
        const location = useLocation();
        return <Component {...props} params={params} location={location} />
    }
    return ComponentWithRouter
}

export default withRouter(Platform);