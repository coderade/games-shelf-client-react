import React from "react";

const Input = (props) => {
    const errorMessage = `Please enter a ${props.name}.`;
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <input type={props.type} className={`form-control ${props.hasError(props.name) ? "is-invalid" : ""}`}
               id={props.name} name={props.name} value={props.value}
               onChange={props.onChange} placeholder={props.placeholder}/>
        <div className={props.hasError(props.name) ? "text-danger" : "d-none"}>{errorMessage} </div>
    </div>)
}

export default Input;