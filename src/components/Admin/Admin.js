import React, {Component} from 'react'
import {Table} from "react-bootstrap";
import ShelfService from "../../services/ShelfService";
import {Link, useNavigate} from "react-router-dom";

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        ShelfService.getAllGames()
            .then(result => {
                this.setState({
                    games: result.games, isLoaded: true
                })
            })
            .catch(err => {
                const errorMessage = `Error loading games: ${err}`;
                this.setState({error: errorMessage, isLoaded: true})
            })
    }

    render() {
        const {games} = this.state;

        return (<div>
            <h2>Manage games</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Publisher</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {games.map(game => (<tr  key={game.id}>
                    <td>{game.id}</td>
                    <td>{game.title}</td>
                    <td>{game.publisher}</td>
                    <td>{game.rating}</td>
                    <td className="text-center align-middle">
                        <div className="btn-group">
                            <Link to={`/games/${game.id}`} className="btn btn-outline-primary">View</Link>
                        </div>
                    </td>

                </tr>))}
                </tbody>
            </Table>

            <button className="btn btn-primary" onClick={this.goToAddGamesPage} >Add Game</button>
        </div>);
    }


    goToAddGamesPage = () => {
        this.props.navigate("/admin/games/add");
    }}

function withNavigate(Component) {
    function ComponentWithNavigate(props) {
        let navigate = useNavigate()
        return <Component {...props} navigate={navigate} />
    }
    return ComponentWithNavigate
}

export default withNavigate(Admin)