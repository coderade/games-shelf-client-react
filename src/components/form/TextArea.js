import React from "react";

const TextArea = (props) => {
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <textarea rows="3" className="form-control" name={props.name}
                  id={props.name} value={props.value}
                  onChange={props.handleChange}/>
    </div>)
}

export default TextArea;