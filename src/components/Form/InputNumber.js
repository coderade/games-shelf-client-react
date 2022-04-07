import React from "react";

const InputNumber = (props) => {
    return (<div className="mb-3">
        <label htmlFor={props.name} className="form-label">
            {props.title}
        </label>
        <input type="number" className="form-control"
               id={props.name} name={props.name} value={props.value}
               onChange={props.onChange} placeholder={props.placeholder}
               min={props.min} max={props.max} maxLength={props.maxLength}/>
    </div>)
}

export default InputNumber;