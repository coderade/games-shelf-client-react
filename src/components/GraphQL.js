import React, {Component, Fragment, useEffect, useState} from 'react'
import GraphQLService from "../services/GraphQLService";

const GraphQL = () => {
    const [games, setGames] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState("")

    const doSearch = () => {
        const payload = `
        {
           search(titleContains: "${searchTerm}") {
                id
                title
                publisher
                year
                description
            }
        }
        `
        GraphQLService.list(payload)
            .then(result => setGames(result.search))
            .catch(err => {
                const errorMessage = `Error loading genres: ${err.status} - ${err.statusText}`;
                setError(errorMessage)
            })
    }

    const handleChange = (evt) =>  {
        let value = evt.target.value;
        setSearchTerm(value)
    }

    useEffect(() => {
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
            .then(result => setGames(result.list))
            .catch(err => {
                const errorMessage = `Error loading genres: ${err.status} - ${err.statusText}`;
                setError(errorMessage)
            })
    }, [])

    return (<Fragment>
        <h2>GraphQL</h2>
        <hr/>
        <div className="mb-3">
            <label htmlFor="search" className="form-label">
                Search
            </label>
            <input type="text" className="form-control"
                   id="search" name="search" value={searchTerm}
                   onBlur={() => doSearch()} placeholder="Search..."
                   onChange={handleChange}/>
        </div>
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

export default GraphQL;