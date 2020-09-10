import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import {GET_CONFIG, API_WATCHLIST} from "../../Constants";

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get(API_WATCHLIST, GET_CONFIG) // TODO: check endpoint, delete config!
      .then((response) => setWatchlist(response.data.watchlist));
  }, []);

  return (
    <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
