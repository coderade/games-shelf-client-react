import React from "react";

const TextArea = (props) => {
    const errorMessage = `Please enter a ${props.name}.`;
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <textarea rows="3" className={`form-control ${props.hasError(props.name) ? "is-invalid" : ""}`}
                  id={props.name} name={props.name} value={props.value}
                  onChange={props.onChange}/>
        <div className={props.hasError(props.name) ? "text-danger" : "d-none"}>{errorMessage}</div>
    </div>)
}

export default TextArea;