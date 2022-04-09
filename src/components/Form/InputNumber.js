import React from "react";

const InputNumber = (props) => {
    const errorMessage = `Please enter a ${props.name}.`;
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <input type="number" className={`form-control ${props.hasError(props.name) ? "is-invalid" : ""}`}
               id={props.name} name={props.name} value={props.value}
               onChange={props.onChange} placeholder={props.placeholder}
               min={props.min} max={props.max} maxLength={props.maxLength}/>
        <div className={props.hasError(props.name) ? "text-danger" : "d-none"}>{errorMessage} </div>
    </div>)
}

export default InputNumber;