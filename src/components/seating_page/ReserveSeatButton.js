import React, { useState} from "react";
import "./ReserveSeatButton.css";
import axios from "axios";
import {API_RESERVATION_URL, OCCUPIED_SEAT_CLASS, OWN_RESERVED_SEAT_CLASS} from "../../Constants";
import {Link} from "react-router-dom";

const ReserveSeatButton = (props) => {
  let id = props.showId;
  let [modalMessage, setModalMessage] = useState("");
  let userNotLoggedInMessage =
      <div>Please
      <Link
          to="/auth/login"
          id="button_to_login"
          key="button_to_login"
          onClick={dismissModal}
          style={{color: "white"}}
      > log in
      </Link> to reserve seats.
      <br/>If you do not have an account, please <Link
          to="/auth/register"
          id="button_to_register"
          key="button_to_register"
          onClick={dismissModal}
          style={{color: "white"}}
      > register
      </Link> first.</div>;
  let noSeatsSelectedMessage = `Please select seats for reservation.`
  let successfulPurchaseMessage = `Thank you for reserving seats for '${props.movieTitle}'! 
                                    Your reservation was successful.`;
  let failedPurchaseMessage = `Sorry, we can't fulfill your reservation for '${props.movieTitle}' at the moment.`;

  function dismissModal() {
      document.getElementById("closeButton").click();
  }

  function reserveSeat(event) {
    if (!localStorage.getItem("username")) {
        setModalMessage(userNotLoggedInMessage);
        return;
    }

    let seats = [];
    let reservedSeats = document.getElementsByClassName(`${OWN_RESERVED_SEAT_CLASS}`);
    for (let i = 0; i < reservedSeats.length; i++) {
      seats.push(parseInt(reservedSeats.item(i).dataset.id))
    }

    if (seats.length === 0) {
        setModalMessage(noSeatsSelectedMessage);
        return;
    }

    axios.post(API_RESERVATION_URL,
        {id: parseInt(id), seats: seats},
        {withCredentials: true}
    )
        .then((response) => {
          setModalMessage(response.data ? successfulPurchaseMessage : failedPurchaseMessage)
          let seatToModify = document.getElementsByClassName(`${OWN_RESERVED_SEAT_CLASS}`);

          for (let i = seatToModify.length - 1; i > -1; i--) {
            let seat = reservedSeats.item(i);
            seat.classList.remove(OWN_RESERVED_SEAT_CLASS);
            seat.classList.add(OCCUPIED_SEAT_CLASS);
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
                <button type="button" id="closeButton" className="close" data-dismiss="modal" aria-label="Close">
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
