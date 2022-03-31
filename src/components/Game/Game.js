import React, {Component, Fragment} from "react";

export default class Game extends Component {
    state = {
        game: {}
    }

    componentDidMount() {
        this.setState({
            game: {
                id: 1,
                title: "A Game",
                publisher: "Sony"
            }
        })
    }

    render() {
        return (<Fragment>
            <h2>Movie: {this.state.game.title}</h2>
            <table className="table table-compact table-stripe">
                <thead/>
                <tbody>
                <tr>
                    <td><strong>Title:</strong></td>
                    <td>{this.state.game.title}</td>
                </tr>
                <tr>
                    <td><strong>Publisher</strong></td>
                    <td>{this.state.game.publisher}</td>
                </tr>
                </tbody>
            </table>
        </Fragment>);
    }
}