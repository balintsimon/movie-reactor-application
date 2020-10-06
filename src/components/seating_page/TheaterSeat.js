import React from "react";
import {FREE_SEAT_CLASS, OWN_RESERVED_SEAT_CLASS} from "../../Constants";
import "./Theater.css";

const TheaterSeat = (props) => {
    let seatPlaceMessage = `Seat No. ${props.column} in row No. ${props.row}.`;
    let logInMessage = `${seatPlaceMessage} Log in to reserve seats.`;
    let ownSeatMessage = `${seatPlaceMessage} You have already reserved this seat.`;

    let message = localStorage.getItem("username") ?
        (props.own ? ownSeatMessage
            : seatPlaceMessage)
        : logInMessage;

    function addReserveSeatListener(event) {
        if (localStorage.getItem("username") &&
            (event.target.classList.contains(FREE_SEAT_CLASS)
                || event.target.classList.contains(OWN_RESERVED_SEAT_CLASS))) {
            event.target.classList.toggle(FREE_SEAT_CLASS);
            event.target.classList.toggle(OWN_RESERVED_SEAT_CLASS);
        }
    }

    return (
            <div className={`theater-seat seat ${props.seatOccupiedClass}`} aria-hidden="true"
               data-row={props.row}
               data-column={props.column}
               data-id={props.id}
               data-toggle="tooltip"
               title={message}
               // style={{...seatStyle, color: props.seatColor, opacity: props.seatOpacity}}
               style={{opacity: props.seatOpacity}}
               onClick={addReserveSeatListener}
            />
    )
}

export default TheaterSeat;

const seatStyle = {
    // width: "25px",
    // height: "30px",
    // borderRadius: "7px",
    // background: "linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A)",
    // transform: "scale(2) skew(-8deg)",
    // marginTop: "-32px",
    // boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",


    // // transform: "scale(5)",
    // // margin: "1.8em",
    // // textShadow: "0px 0px 3px #e6b31e",
    // width: "25px",
    // height: "30px",
    // borderRadius: "7px",
    // background: "linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A)",
    // // marginBottom: "10px",
    // // marginBottom: "1.5em",
    // transform: "scale(2) skew(-8deg)",
    // // transform: "skew(-8deg)",
    // marginTop: "-32px",
    // boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
}
