import React, {useEffect, useState} from "react";
import Get from "../hook/FetchGet";
import MovieCard from "./MovieCard";
import {API_URL_MOVIE} from "../../Constants";

const SelectionPage = (props) => {
  let url = `${API_URL_MOVIE}/${props.selection}`;

  const [isLoading, data] = Get(url);
  const [barStyle, setBarStyle] = useState(36);
  const [scrollY, setScrollY] = React.useState(window.pageYOffset);

  const getScrollY = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    let element = document.querySelector('#outer-container');
    let style = getComputedStyle(element)

    if (style.overflow === "hidden") {
      setBarStyle(100 + (window.innerHeight / 1000) * scrollY);
    } else {
      setBarStyle(36);
    }

    window.addEventListener("scroll", getScrollY);
    return () => window.removeEventListener("scroll", getScrollY);
  }, [getScrollY, scrollY]);

  return (
      <React.Fragment>
        <div className="row" style={{backgroundColor: "#e6b31e"}}>
          <div
              className="col-2 align-self-start d-flex align-items-stretch"
              style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#e6b31e",
              }}
          >
            <b style={{
              ...pageTitleStyle,
              top: barStyle,
              transitionTimingFunction: "linear"
            }}>{props.title.toUpperCase()}</b>
          </div>
          <div
              className="col-10 align-self-end"
              style={{
                display: "flex",
                flexFlow: "row wrap",
                backgroundColor: "#2e2e2e",
                marginTop: "30px",
              }}
          >
            {data ? (
                data.results.map(movie => (
                    <div key={movie.id} className="card-deck ml-5 mr-3 mt-5">
                      <MovieCard
                          movie={movie.id}
                      />
                    </div>
                ))
            ) : (
                <div>Loading</div>
            )}
          </div>
        </div>
      </React.Fragment>
  );
};

export default SelectionPage;

const pageTitleStyle = {
  position: "fixed",
  left: "12%",
  backgroundColor: "#e6b31e",
  zIndex: "1",
  textAlign: "left",
  height: "90%",
  fontSize: "1.2em",
  textOrientation: "upright",
  writingMode: "vertical-rl",
};
