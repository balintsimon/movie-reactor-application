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
            <div className={`theater-seat seat ${props.seatOccupiedClass} row-${props.dataRow}`} aria-hidden="true"
               data-row={props.row}
               data-column={props.column}
               data-id={props.id}
               data-toggle="tooltip"
               title={message}
               style={{opacity: props.seatOpacity}}
               onClick={addReserveSeatListener}
            />
    )
}

export default TheaterSeat;
