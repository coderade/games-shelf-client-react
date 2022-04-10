import React from "react";

const Modal = (props) => {
    const divStyle = {
        display: 'block'
    };
    return (<div className="modal fade show" role="dialog" style={divStyle}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{props.title}</h5>
                </div>
                <div className="modal-body">
                    <p>{props.description}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        props.onClick();
                        props.onClose();
                    }}>Yes
                    </button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            onClick={props.onClose}>Close
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

export default Modal;