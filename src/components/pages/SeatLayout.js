import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    API_URL_MOVIE,
    IMAGE_SIZES,
    API_SHOW_URL,
    API_ROOM_URL,
    API_RESERVATION_URL
} from "../../Constants";
import {getIdFromUrl} from "../../Utils";
import SeatingPicture from "../seating_page/SeatingPicture";
import FirstRow from "./movie_detail_page/FirstRow";
import SeatingChart from "../seating_page/SeatingChart";
import ShowTime from "../seating_page/ShowTime";
import ShowDate from "../seating_page/ShowDate";
import TheaterRoomName from "../seating_page/TheaterRoomName";
import RuntimeElement from "../seating_page/RuntimeElement";
import ScreenLine from "../seating_page/ScreenLine";
import Legends from "../seating_page/Legends";
import ReserveSeatButton from "../seating_page/ReserveSeatButton";
import "../seating_page/TheaterTextSizing.css";

const SeatLayout = (props) => {
    let screeningId = getIdFromUrl();
    let movieUrl = "";

    const [showId, setShowId] = useState(null);
    const [movieDbId, setMovieDbId] = useState(null);
    const [movieId, setMovieId] = useState(null);
    const [startingTime, setStartingTime] = useState(null);
    const [startingDate, setStartingDate] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [room, setRoom] = useState(null);
    const [reservedSeats, setReservedSeats] = useState(null);

    const [backdrop, setBackdrop] = useState(null);
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [runtime, setRuntime] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`${API_SHOW_URL}/${screeningId}`, {withCredentials: true})
            .then((res) => {
                setShowId(res.data.id);
                setMovieDbId(res.data.movieDbId);
                setMovieId(res.data.movieId);
                setStartingTime(res.data.startingTime.substring(0, 5));
                setStartingDate(res.data.startingDate);
                setRoomId(res.data.roomId);
            });
    }, [screeningId])

    useEffect(() => {
        if (roomId != null){
            axios
                .get(`${API_ROOM_URL}/${roomId}`, {withCredentials: true})
                .then(res => {
                    setRoom(res.data);
                })
        }
    }, [roomId])

    useEffect(() => {
        if (showId != null) {
            axios
                .get(`${API_RESERVATION_URL}/show/${showId}`, {withCredentials: true})
                .then(res => {
                    setReservedSeats(res.data.bookings);
                })
        }
    }, [showId])

    useEffect(() => {
        if (movieDbId) {
            movieUrl = `${API_URL_MOVIE}/${movieDbId}`;
            axios
                .get(movieUrl, {withCredentials: true})
                .then((res) => {
                    setBackdrop(res.data["backdrop_path"]);
                    setTitle(res.data["title"]);
                    setReleaseDate(res.data["release_date"]);
                    setRuntime(res.data["runtime"]);
                })
        }
    }, [movieDbId]);

    return (
        <div className="row no-gutters">
            <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
            </div>
            <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
                <div className="container-fluid" style={{padding: "0"}}>
                    <FirstRow/>
                    <div className="row no-gutters">
                        <SeatingPicture size={IMAGE_SIZES.backdrop_sizes[3]}
                                        backdrop={backdrop}/>
                    </div>
                    <div>
                        <h1 className="movie-title">{title} <span className="hazy">({releaseDate.substring(0, 4)})</span>
                        </h1>
                        {room ? <TheaterRoomName theater={room.name}/> : <div/>}
                        <ShowTime time={startingTime}/>
                        <ShowDate date={startingDate}/>
                        <RuntimeElement runtime={runtime}/>
                        <ScreenLine/>
                        {room ?
                            reservedSeats ? <SeatingChart room={room} reservedSeats={reservedSeats}/>
                                : <div>Reservations are loading...</div>
                            : <div>Room is loading...</div>}
                        <Legends/>
                        <ReserveSeatButton showId={screeningId} movieTitle={title}/>
                    </div>
                </div>
            </div>
            <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
        </div>
    )
}

export default SeatLayout;

const mainColumnStyle = {
    flexFlow: "row wrap",
    height: "1500px",
    padding: "0"
}

