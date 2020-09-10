import React, { useState} from "react";
import "./ReserveSeatButton.css";
import axios from "axios";
import {API_RESERVATION_URL, OCCUPIED_SEAT_CLASS, OWN_RESERVED_SEAT_CLASS, REACTOR_YELLOW} from "../../Constants";

const ReserveSeatButton = (props) => {
  let id = props.showId;
  let [modalMessage, setModalMessage] = useState("");
  let successfulPurchaseMessage = `Thank you for reserving seats for '${props.movieTitle}'! 
                                    Your reservation was successful.`;
  let failedPurchaseMessage = `Sorry, we can't fulfill your reservation for '${props.movieTitle}' at the moment.`;

  function reserveSeat(event) {
    let reservedSeats = document.getElementsByClassName(`theater-seat fa ${OWN_RESERVED_SEAT_CLASS}`);
    let seats = [];
    for (let i = 0; i < reservedSeats.length; i++) {
      seats.push(parseInt(reservedSeats.item(i).dataset.id))
    }

    axios.post(API_RESERVATION_URL,
        {id: parseInt(id), seats: seats},
    )
        .then((response) => {
          setModalMessage(response.data ? successfulPurchaseMessage : failedPurchaseMessage)
          let seatToModify = document.getElementsByClassName(`theater-seat fa ${OWN_RESERVED_SEAT_CLASS}`);

          for (let i = seatToModify.length - 1; i > -1; i--) {
            let seat = reservedSeats.item(i);
            seat.classList.remove(OWN_RESERVED_SEAT_CLASS);
            seat.classList.add(OCCUPIED_SEAT_CLASS);
            seat.style.color = REACTOR_YELLOW;
            seat.style.opacity = "0.5";
          }
        });
  }

  return (
      <>
        <div className="modal fade" id="reservationModal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {`Reservation for ${props.movieTitle}`}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {modalMessage}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary modal-button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>


        <div className="reserve-button" onClick={reserveSeat} data-toggle="modal" data-target="#reservationModal">
          <div className="hazy">Reserve selected</div>
        </div>
      </>
  )
}

export default ReserveSeatButton;
