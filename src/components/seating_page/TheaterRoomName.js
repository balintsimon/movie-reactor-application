import React from "react";
import "./TheaterTextSizing.css";

const TheaterRoomName = (props) => {

    return (
        <div style={theaterStyle}>
            <div className="hazy sub-title">Theater</div>
            <div className="field-data">{props.theater}</div>
        </div>
    )
}

export default TheaterRoomName;

const theaterStyle = {
    position: "absolute",
    top: "42%",
    left: "5%",
    zIndex: "0",
    color: "white",
}