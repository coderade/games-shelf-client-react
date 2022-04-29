import React, {Component, Fragment, useEffect, useState} from 'react'
import "./AddEditGame.css"
import Input from "../../Form/Input";
import TextArea from "../../Form/TextArea";
import InputNumber from "../../Form/InputNumber";
import {useNavigate, useParams} from "react-router-dom";
import ShelfService from "../../../services/ShelfService";
import FormAlert from "../../Alert/Alert";
import 'react-confirm-alert/src/react-confirm-alert.css';


const AddEditGame = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [initialGame, setInitialGame] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [errors, setErrors] = useState([])
    const [alert, setAlert] = useState({show: false})


    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (validateForm()) {
            const data = new FormData(evt.target)
            const payload = Object.fromEntries(data.entries());

            // state has been changed
            if (initialGame !== game) {
                if (isEditing) {
                    ShelfService.editGame(payload).then(_ => {
                        setAlert({
                            variant: "success", title: "Success!", message: "Games saved successfully!", show: true
                        })
                    })
                        .catch(err => {
                            const errorMessage = `Error Editing games: ${err}`;
                            setAlert({
                                variant: "danger", title: "Error!", message: errorMessage, show: true
                            })
                        })
                } else {
                    ShelfService.addGame(payload).then(_ => {
                        setAlert({
                            variant: "success", title: "Success!", message: "Games saved successfully!", show: true
                        })
                        setInitialGame(game)
                    })
                        .catch(err => {
                            const errorMessage = `Error adding games: ${err}`;
                            setAlert({
                                variant: "danger", title: "Error!", message: errorMessage, show: true
                            })
                        })
                }

            } else {
                console.log("Form not submitted, state has not been changed...")
            }
        }


    }

    const handleChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        setGame(prevState => ({...prevState, [name]: value}))
    }

    const hasError = (key) => {
        return errors.includes(key)
    }

    const showAlert = (status) => {
        setAlert({show: status})
    }

    const validateForm = () => {
        let errors = [];
        if (!game.title) {
            errors.push('title')
        }
        if (!game.description) {
            errors.push('description')
        }
        if (!game.publisher) {
            errors.push('publisher')
        }
        if (!game.year) {
            errors.push('year')
        }

        setErrors(errors)

        if (!errors.length) {
            return true
        }
    }

    useEffect(() => {
        if (id) {
            ShelfService.getGame(id)
                .then(result => {
                    console.log("got game")
                    setGame(result.game)
                    setInitialGame(result.game)
                    setIsEditing(true)
                    setAlert({
                        variant: "success",
                        title: "Success!",
                        message: "Games loaded from database successfully!",
                        show: true
                    })
                })
                .catch(err => {
                    const errorMessage = `Error loading games: ${err}`;
                    setAlert({variant: "danger", title: "Error", message: errorMessage, show: true})
                })
        }
    }, [])

    return (<Fragment>
        {isEditing ? <h2>Edit Game ID: {game.id}</h2> : <h2> Add Game</h2>}
        {alert.show ? <FormAlert variant={alert.variant}
                                 message={alert.message}
                                 title={alert.title}
                                 onClose={showAlert}/> : ""}

        <hr/>

        <form method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="id" id="id"
                   value={game.id} onChange={handleChange}/>
            <Input title="Title" type="text" value={game.title} onChange={handleChange}
                   name="title" hasError={hasError}/>
            <TextArea title="Description" name="description"
                      value={game.description} onChange={handleChange}
                      hasError={hasError}/>
            <Input title="Publisher" type="text" name="publisher"
                   value={game.publisher} onChange={handleChange}
                   hasError={hasError}/>
            <InputNumber title="Year" name="year" value={game.year} hasError={hasError}
                         onChange={handleChange} min="1970" max="2022" maxLength="4"/>
            <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                    Rating
                </label>
                <select className="form-select" value={game.rating} name="rating"
                        onChange={handleChange}>
                    <option className="form-select"> Choose...</option>
                    {Array.from({length: 11}, (x, i) => i).map(value => <option key={value} className="form-select"
                                                                                value={value}>{value}</option>)}
                </select>
            </div>
            <button className="btn btn-primary">Save</button>
        </form>
    </Fragment>)

}

export default AddEditGame;