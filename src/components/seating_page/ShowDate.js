import React from "react";
import "./TheaterTextSizing.css";

const ShowDate = (props) => {

    return (
        <div style={dateStyle}>
            {/*<div className="hazy" style={{fontSize: "1.2em"}}>Date</div>*/}
            <div className="hazy sub-title">Date</div>
            {/*<div style={{fontSize: "2.5em"}}>{props.date}</div>*/}
            <div className="field-data">{props.date}</div>
        </div>
    )
}

export default ShowDate;

const dateStyle = {
  position: "absolute",
  top: "42%",
  left: "38%",
  zIndex: "0",
  color: "white",
};
