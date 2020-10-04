import React, {useEffect, useState} from 'react';
import HorizontalLine from "../movie_detail_page/FirstRow";
import "./UserProfilePage.css";
import axios from "axios";

import {uuid} from "uuidv4";
import {
  API_RESERVATION_URL,
  API_KEY,
  API_URL_MOVIE,
} from "../../../Constants";
import {checkStatus, formatDateWithDecimals, formatTime, parseJSON} from "../../../Utils";
import {Link} from "react-router-dom";

const UserProfilePage = () => {
  let womanPicture = "woman_profile.jpg";
  let manPicture = "man_profile.png";
  let adminPicture = "admin_profile.png";

  const userProfilePictures = {};
  userProfilePictures["MAN"] = manPicture;
  userProfilePictures["WOMAN"] = womanPicture;
  userProfilePictures["GENERAL"] = adminPicture;

  const [reservations, setReservations] = useState([]);
  const [movieDbIds, setMovieDbIds] = useState([]);
  const [playedMovies, setPlayedMovies] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
        .get(API_RESERVATION_URL)
        .then(res => {
          let bookings = res.data.bookings;
          setMovieDbIds([...new Set(bookings.map(item => item["movieId"]))]);
          setReservations(bookings);
        })

  }, [])

  useEffect(() => {
    // const urls = movieDbIds.map(movieId => `${API_URL_MOVIE}${movieId}?api_key=${API_KEY}`);
    const urls = movieDbIds.map(movieId => `${API_URL_MOVIE}${movieId}`);
    Promise.all(urls.map(url =>
        fetch(url)
            .then(checkStatus)
            .then(parseJSON)
            .catch(error => console.log('There was a problem!', error))
    ))
        .then(data => {
          data.map((movie) => {
            let movieObj = {};
            movieObj[movie["id"]] = movie["title"];
            setPlayedMovies(prevState => [...prevState, movieObj]);
          })
        })
    // TODO: check if this code is needed at all; gets error log on push()
        // .then(() => {
        //   reservations.map((reservation) => {
        //     reservation.push("Title");
        //   })
        // })
  }, [movieDbIds]);

  const getMovieTitle = (movies, searchedId) => {
    for (const movie of movies) {
      for (const [key, value] of Object.entries(movie)) {
        if (parseInt(key) === searchedId) {
          return value;
        }
      }
    }
  }

  // TODO: sync with back-end: information is not enough to delete reservation
  const deleteReservedSeat = (event, showId, seatId, visitorId) => {
    let currentItem = event.target.parentElement.parentElement;
    let seatsForDelete = {};
    seatsForDelete.id = parseInt(showId);
    seatsForDelete.seats = [parseInt(seatId)];
    seatsForDelete.visitorId = parseInt(visitorId);
    axios
        .delete( API_RESERVATION_URL, {
          data: seatsForDelete
        })
        .then(response => {
          if (response.data === true) {
            successfulDeleteIndicator(currentItem);
          } else {
            unsuccessfulDeleteIndicator(currentItem, showId, seatId, visitorId);
          }
        });
  }

  const successfulDeleteIndicator = (element) => {
    element.innerHTML = `<div class=${"successful-delete"}>
            <strong>Reservation successfully deleted!</strong></div>`;
    setTimeout(() => {
      element.style.display = "none";
    }, 3000)
  };

  // TODO: rewrite code to either re-display full element OR modify it, showing that it has errors
  // TODO: rework back- and front-end to get the type of error
  const unsuccessfulDeleteIndicator = (element, showId, seatId, visitorId) => {
    let content = element.innerHTML;
    element.innerHTML = `<div class=${"unsuccessful-delete"}>
            <strong>Reservation not deleted! Try again later.</strong></div>`;
    setTimeout(() => {
      element.innerHTML = content;
      let image = element.querySelector(".delete-button-img");
      image.addEventListener('click', (event) => {
        deleteReservedSeat(event, showId, seatId, visitorId)
      } )
    }, 3000)
  };


  const displayReservations = () => {
    let reservationContainer = [];
    for (let reservation of reservations) {
      reservationContainer.push(
        <div key={uuid()} className="reservation-item-container">
          <div title={`Seat Id: ${reservation.id}\nShow Id: ${reservation.showId}`}
               className="reservation-seat-picture-container">
            <img className="reservation-seat-img" src={`/images/movie_seat_64.png`} alt="Movie seat"/>
          </div>
          <div className="reservation-data">{formatDateWithDecimals(reservation["show"]["startingDate"])}</div>
          <div className="reservation-data">{formatTime(reservation["show"]["startingTime"])}</div>
          <div className="reservation-data seat-info">{`Row: ${reservation["seat"]["rowNumber"]}`}</div>
          <div className="reservation-data seat-info">{`Seat: ${reservation["seat"]["seatNumber"]}`}</div>
          <div className="reservation-movie-title"><Link to={`/movie/${reservation["movieId"]}`}
                                                         className="movie-link">{getMovieTitle(playedMovies, reservation["movieId"])}</Link>
          </div>
          <div className="reservation-delete-button-container">
            <img className="delete-button-img" onClick={(event) => {
              deleteReservedSeat(event, reservation["show"]["id"], reservation["seat"]["id"], reservation["visitor"]["id"])
            }} src={`/images/delete_button_64.png`} alt="Delete reservation button"/>
          </div>
        </div>
      )
    }
    return <div className="reservations-rows-container">{reservationContainer}</div>
  }

  return (
      <div className={"media"}>
        <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
        </div>
        <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
          {/* The center container div. There is a grid in it. */}
          <div className="container-fluid" style={{padding: "0"}}>
            <HorizontalLine/>
            <div className="row no-gutters" style={{backgroundColor: "green"}}>
              <div className="picture-name-container">
                <div className="picture-container">
                  <div className="profile-picture">
                    <div className="profile-picture-frame">
                      <img className="picture" src={`/images/${userProfilePictures[localStorage.getItem("gender")]}`} alt="Profile"/>
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  <div className="username-container">
                    <div className="username-container-div">
                      <h1 className="user-name-title">{localStorage.getItem("username")}</h1>
                    </div>
                  </div>
                  {/*Empty div (currently a placeholder) for further user info, like: email, birthday, male, etc...*/}
                  <div className="user-details-container"/>
                </div>
              </div>
            </div>
            {/*Can remove or change color if it isn't fit into the look*/}
            <HorizontalLine/>
            <div className="row no-gutters" style={{padding: "0"}}>
              <div className="col-md-12 reservations-title-column">
                <div className="reservations">
                  <div className="reservations-title-container">
                    <div className="reservation-value">
                      {"Reservations".toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 reservations-container-column">
                <div className="reservations-container">
                  {playedMovies.length > 0 ? displayReservations() :
                      reservations.length > 0 ?
                          <div className="reservation-rows-container">
                            <div className="reservation-item-container">Reservations loading, please wait.</div>
                          </div> :
                          <div className="reservation-item-container">
                            <div className="reservation-item-container">{localStorage.getItem("username")} has no reservations.</div>
                          </div>
                  }
                  <div className="reservations-rows-container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
      </div>
  );
};

const mainColumnStyle = {
  display: "flex",
  flexFlow: "row wrap",
  height: "1200px",
  padding: "0"
}

export default UserProfilePage;
