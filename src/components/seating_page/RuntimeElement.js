import React from "react";
import "./TheaterTextSizing.css";

const RuntimeElement = (props) => {

    return (
        <div style={runtimeStyle}>
            <div className="hazy sub-title">Runtime</div>
            <div className="field-data">{props.runtime} min</div>
        </div>
    )
}

export default RuntimeElement;

const runtimeStyle = {
    position: "absolute",
    top: "42%",
    right: "10%",
    zIndex: "0",
    color: "white",
}