import React from "react";

const Theater = (props) => {

    return (
        <div style={theaterStyle}>
            <div className="hazy" style={{fontSize: "1.2em"}}>Theater</div>
            <div style={{fontSize: "2.5em"}}>{props.theater}</div>
        </div>
    )
}

export default Theater;

const theaterStyle = {
    position: "absolute",
    top: "42%",
    left: "5%",
    zIndex: "0",
    color: "white",
}