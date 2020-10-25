import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {uuid} from 'uuidv4';

import HorizontalLine from "../movie_detail_page/FirstRow";

import {
  checkStatus,
  formatDateWithDecimals,
  formatTime,
  getDayNameFromDate,
  getYearFromDate,
  parseJSON
} from "../../../Utils";
import {API_SCHEDULE_URL, API_URL_MOVIE, API_URL_PICTURE, IMAGE_SIZES} from "../../../Constants";

import axios from "axios";
import "./SchedulePage.css";

const SchedulePage = () => {

      const [movieIds, setMovieIds] = useState([]);
      const [shows, setShows] = useState([]);
      const [startingDates, setStartingDates] = useState([]);
      // For now is unnecessary, but will be useful if we need calculate with the starting dates.
      const [startingTimes, setStartingTimes] = useState([]);
      const [playedMovies, setPlayedMovies] = useState([]);

      useEffect(() => {
        window.scrollTo(0, 0);

        axios.get(API_SCHEDULE_URL, {withCredentials: true})
            .then((res) => {
              setMovieIds([...new Set(res.data.shows.map(item => item["movieDbId"]))]); // rewrite to get movieDb Id from other service
              //
                res.data.shows.map(show => (
                  setShows(prevState => [...prevState,
                    {
                      showId: show["id"],
                      startingDate: show["startingDate"],
                      startingTime: show["startingTime"],
                      movieDbId: show["movieDbId"],
                      movieId: show["movieId"]
                    }])
              ));
              setStartingDates([...new Set(res.data.shows.map(item => item["startingDate"]))]);
              setStartingTimes([...new Set(res.data.shows.map(item => item["startingTime"]))]);
            });
      }, []);

      useEffect(() => {
        const urls = movieIds.map(movieId => `${API_URL_MOVIE}/${movieId}`);

        Promise.all(urls.map(url =>
            fetch(url)
                .then(checkStatus)
                .then(parseJSON)
                .catch(error => console.log('There was a problem!', error))
        ))
            .then(data => {
              setPlayedMovies(data.map((movieDbId) => movieDbId));
            })
      }, [movieIds]);

      const scheduleFirstRow = () => {
        let firstRow = [];
        for (let i = 0; i < startingDates.length + 1; i++) {
          if (i === 0) {
            firstRow.push(<div key={uuid()} className="schedule-movie-detail"/>);
          } else {
            firstRow.push(<div key={uuid()} className="schedule-item schedule-date-item">
              <div className="schedule-day">{getDayNameFromDate(startingDates[i - 1])}</div>
              <div className="schedule-date">{formatDateWithDecimals(startingDates[i - 1])}</div>
            </div>)
          }
        }
        return (<div key={uuid()} className="schedule-row-item schedule-first-row">{firstRow}</div>);
      };

      const findShows = (shows, movieId, startingDate) => {
        const foundedShows = shows.find(show => {
          return show["movieDbId"] === movieId && show["startingDate"] === startingDate; // rewrite to get movieDb Id from other service
        })
        // If there is one movie on the same day in two different time - Here we can process it! Map through them instead of display one item.
        if (foundedShows) {
          return (
              <div key={uuid()} className="schedule-item schedule-show-item">
                <Link to={`/reserve/${foundedShows["showId"]}`}>
                  <div className="schedule-starting-time">
                    {formatTime(foundedShows["startingTime"])}
                  </div>
                </Link></div>);
        }

        return <div className="schedule-item schedule-show-item"/>;
      };

      const findMovieDetails = (playedMovies, movieId) => {
        let foundedMovie;
        if (playedMovies.includes(undefined)) {
          foundedMovie = undefined;
        } else {
          foundedMovie = playedMovies.find(movie => {
            return movie["id"] === movieId;
          });
        }

        if (foundedMovie) {
          return (
              <div key={uuid()} className="schedule-item schedule-movie-detail">
                <Link to={`/movie/${foundedMovie["id"]}`}>
                  <div className="schedule-movie-title">{foundedMovie["title"]}</div>
                </Link>
                <div className="schedule-movie-year">{`${getYearFromDate(foundedMovie["release_date"])}`}<span
                    className="schedule-movie-runtime">{"   "}{`${foundedMovie["runtime"]} min`}</span></div>
              </div>);
        }
        return <div className="schedule-item schedule-movie-detail" key={uuid()}>
          <div className="schedule-movie-title">
            {"Sorry, something went wrong! We are unable to load movie details"}
          </div>
        </div>;
      };

      const schedule = () => {
        let rows = [];

        rows.push(scheduleFirstRow());

        for (let i = 0; i < movieIds.length; i++) {
          let movieRow = []

          for (let j = 0; j < startingDates.length + 1; j++) {
            if (j === 0) {
              movieRow.push(findMovieDetails(playedMovies, movieIds[i]));
            } else {
              movieRow.push(findShows(shows, movieIds[i], startingDates[j - 1]));
            }
          }
          rows.push(<div key={uuid()} className="schedule-row-item schedule-movie-row">{movieRow}</div>);
        }

        return rows;
      }

      return (
          <div className={"media"}>
            <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
            </div>
            <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
              {/* The center container div. There is a grid in it. */}
              <div className="container-fluid" style={{padding: "0"}}>
                <HorizontalLine/>
                {/*Container for cover pictures*/}
                <div className="row no-gutters" style={{backgroundColor: "green"}}>
                  <div className="col-md-12 cover-container-column">
                    <div className="cover-container">
                      {playedMovies.map((movie) => (
                          movie !== undefined ?
                              <div key={uuid()} className="cover-item">
                                <Link to={`/movie/${movie["id"]}`}>
                                  <img className="cover-img-top"
                                       src={`${API_URL_PICTURE}${IMAGE_SIZES["poster_sizes"][2]}${movie["poster_path"]}`}
                                       alt=""/>
                                </Link>
                              </div> : <div key={uuid()} className="cover-item">
                                <img className="cover-img-top"
                                     src={"/images/no_poster.png"}
                                     alt=""/>
                              </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/*Can remove or change color if it isn't fit into the look*/}
                <HorizontalLine/>
                <div className="row no-gutters" style={{padding: "0"}}>
                  <div className="col-md-12 schedule-container-column">
                    <div className="schedule-container">
                      {schedule()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
          </div>
      );
    }
;

const mainColumnStyle = {
  display: "flex",
  flexFlow: "row wrap",
  height: "1200px",
  padding: "0"
}

export default SchedulePage;
