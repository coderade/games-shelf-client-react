import React, {useState} from "react";
import Alert from "react-bootstrap/Alert"

const FormAlert = (props) => {

    return (<Alert variant={props.variant} onClose={() => props.onClose(false)} dismissible>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
            {props.message}
        </p>
    </Alert>);
}

export default FormAlert;