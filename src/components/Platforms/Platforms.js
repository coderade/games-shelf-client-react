import React, {Component, Fragment, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import ShelfService from "../../services/ShelfService";

const Platforms = () => {
    const [platforms, setPlatforms] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        ShelfService.getPlatforms()
            .then(result => {
                setPlatforms(result.platforms)
            })
            .catch(err => {
                const errorMessage = `Error loading platforms: ${err.status} - ${err.statusText}`;
                setError(errorMessage)
            })
    }, [])

    if (error) {
        return <div className="error-message">{error}</div>
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

export default Platforms;