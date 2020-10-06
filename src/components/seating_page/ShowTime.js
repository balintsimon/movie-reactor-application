import React from "react";
import "./TheaterTextSizing.css";

const ShowTime = (props) => {

    return (
        <div style={timeStlye}>
            <div className="hazy sub-title" >Show time</div>
            <div className="field-data">{props.time}</div>
        </div>
    )
}

export default ShowTime;

const timeStlye = {
    position: "absolute",
    top: "42%",
    left: "57%",
    zIndex: "0",
    color: "white",
}
