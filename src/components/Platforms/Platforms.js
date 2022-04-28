import React, {Component, Fragment} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";

export default class Platforms extends Component {
    state = {
        platforms: [], isLoaded: false, error: null
    }

    componentDidMount() {
        ShelfService.getPlatforms()
            .then(result => {
                this.setState({
                    platforms: result.platforms, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading platforms: ${err.status} - ${err.statusText}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {platforms, isLoaded, error} = this.state;

        if (error) {
            return <div className="error-message">{error}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (<Fragment>
                <h2>Platforms</h2>
                <div>
                    {platforms.map(platform => (
                        <Link key={platform.id} to={`/platforms/${platform.id}`} state={{platformName: platform.name}}
                              className="list-group-item list-group-item-action">
                            {platform.name}
                        </Link>))}
                </div>
            </Fragment>)
        }
    }
}