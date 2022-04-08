import React from "react";

const TextArea = (props) => {
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <textarea rows="3" className={`form-control ${props.className}`}
                  id={props.name} name={props.name} value={props.value}
                  onChange={props.onChange}/>
        <div className={props.errorDiv}>{props.errorMsg} </div>
    </div>)
}

export default TextArea;