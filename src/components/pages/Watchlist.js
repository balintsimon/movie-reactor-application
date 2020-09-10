import React, { useContext, useEffect, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieCard from "./MovieCard";

const Watchlist = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const [watchlist, setWatchlist] = useContext(WatchlistContext);

  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });

  return (
    <div className="row media">
      <div
        className="col-2 align-self-start"
        style={{
          ...{ backgroundColor: "#e6b31e", minHeight: height, height: "100%" },
        }}
      >
        <b style={pageTitleStyle}>{props.title.toUpperCase()}</b>
      </div>
      <div
        className="col-10 align-self-center"
        style={{
          ...mainColumnStyle,
          ...{ backgroundColor: "#343434" },
          width: width,
          minHeight: height,
        }}
      >
        {watchlist.length !== 0 ? (
          watchlist.map((movie) => (
            <div key={movie} className="card-deck ml-5 mr-3 mt-5">
              <MovieCard movie={movie}/>
            </div>
          ))
        ) : (
          <div className="card-deck ml-5 mr-3 mt-5">
            <div
              className="card border-secondary mt-1 mb-3 clearfix overflow-hidden"
              style={cardStyle}
            >
              <div className="card-body">
                <div className="backdrop-container">
                  <img
                    src={window.location.origin + "/no_image.png"}
                    alt={"Not available"}
                    height="42"
                    style={centerImage}
                  />
                </div>
                <div>
                  <h5 className="card-title" style={{ textAlign: "center" }}>
                    {`YOU HAVEN'T WATCHLISTED ANYTHING YET`}
                  </h5>
                  <p className="card-text overflow-hidden">
                    If you would like to add a movie to your Watchlist, please
                    select one from the lists that are available through the
                    menu or choose one from the details page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;

const pageTitleStyle = {
  position: "fixed",
  left: "12%",
  top: "36px",
  backgroundColor: "#e6b31e",
  zIndex: "1",
  textAlign: "left",
  height: "90%",
  fontSize: "1.2em",
  textOrientation: "upright",
  writingMode: "vertical-rl",
};

const mainColumnStyle = {
  display: "flex",
  flexFlow: "row wrap",
  padding: "10",
  transition: "opacity 1s ease-in",
  transitionDuration: "0.3s",
  transitionTimingFunction: "ease",
};

const cardStyle = {
  width: "18rem",
  minHeight: "28rem",
  height: "28rem",
  backgroundColor: "#e6b31e",
  borderRadius: "8px",
  textAlign: "justify",
  boxShadow:
    "  0 2.8px 2.2px rgba(200, 200, 200, 0.034),\n" +
    "  0 6.7px 5.3px rgba(200, 200, 200, 0.048),\n" +
    "  0 12.5px 10px rgba(200, 200, 200, 0.06),\n" +
    "  0 22.3px 17.9px rgba(200, 200, 200, 0.072),\n" +
    "  0 41.8px 33.4px rgba(200, 200, 200, 0.086),\n" +
    "  0 100px 80px rgba(200, 200, 200, 0.12)",
};

const centerImage = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  minHeight: "180px",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(0%, -5%) scale(1)",
};
