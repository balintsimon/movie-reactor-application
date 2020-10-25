import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import Menu from "./components/layout/Menu";
import axios from "axios";

import SelectionPage from "./components/pages/SelectionPage";
import MovieDetailPage from "./components/pages/movie_detail_page/MovieDetailPage";
import SchedulePage from "./components/pages/schedule_page/SchedulePage";
import RegisterPage from "./components/pages/registration/RegisterPage";
import LoginPage from "./components/pages/registration/LoginPage";

import {WatchlistProvider} from "./components/context/WatchlistContext";
import Watchlist from "./components/pages/Watchlist";
import SeatLayout from "./components/pages/SeatLayout";

import "./App.css";
import ActorDetailPage from "./components/pages/actor_detail_page/ActorDetailPage";
import Logout from "./components/pages/registration/Logout";
import UserProfilePage from "./components/pages/profile_page/UserProfilePage";

function App() {

    document.title = "Movie Reactor";
    return (
        <div id="outer-container">
            <Router>
                <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"}/>
                <WatchlistProvider>
                    <main id="page-wrap">
                        <ThemeProvider theme={theme}>
                            <div
                                className="container-fluid"
                                style={{maxWidth: "3000px", padding: "0"}}
                            >
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <SelectionPage
                                                // selection={"top_rated"}
                                                // title={"Top rated movies"}
                                                selection={"popular"}
                                                title={"Popular movies"}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/top_rated"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <SelectionPage
                                                selection={"top_rated"}
                                                title={"Top rated movies"}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/now_playing"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <SelectionPage
                                                selection={"now_playing"}
                                                title={"Movies now playing"}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/popular"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <SelectionPage
                                                selection={"popular"}
                                                title={"Popular movies"}
                                            />
                                        </div>
                                    )}
                                />
                                <Route
                                    exact
                                    path="/upcoming"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <SelectionPage
                                                selection={"upcoming"}
                                                title={"Upcoming movies"}
                                            />
                                        </div>
                                    )}
                                />
                                <Route path="/movie/:id" children={<MovieDetailPage/>}/>
                                <Route path="/actor/:id" children={<ActorDetailPage/>}/>
                                <Route path="/schedule" children={<SchedulePage/>}/>
                                <Route path="/auth/register" children={<RegisterPage/>}/>
                                <Route path="/auth/login" children={<LoginPage/>}/>
                                <Route path="/auth/logout" children={<Logout/>}/>
                                {/*<Route path="/profile" children={<UserProfilePage/>}/>*/}
                                <Route path="/reservations" children={<UserProfilePage/>}/>
                                <Route
                                    exact
                                    path="/watchlist"
                                    render={() => (
                                        <div style={cardStyle}>
                                            <Watchlist title={"Your Watchlist"}/>
                                        </div>
                                    )}
                                />
                                <Route path="/reserve/:id" children={<SeatLayout/>}/>
                            </div>
                        </ThemeProvider>
                    </main>
                </WatchlistProvider>
            </Router>
        </div>
    );
}

const theme = {
    background: "none",
    textAlign: "center",
    padding: "10px",
    fontSize: "1.3rem",
    borderRadius: "15px",
    fontFamily: " Helvetica, Arial, sans-serif",
};

const cardStyle = {
    display: "flex",
    flexFlow: "row wrap",
};

export default App;
