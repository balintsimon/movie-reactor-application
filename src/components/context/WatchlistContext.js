import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import {API_WATCHLIST} from "../../Constants";

export const WatchlistContext = createContext([]);

export const WatchlistProvider = (props) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    axios
      .get(API_WATCHLIST, {withCredentials: true})
      .then((response) => setWatchlist(response.data.watchlist));
  }, []);

  return (
    <WatchlistContext.Provider value={[watchlist, setWatchlist]}>
      {props.children}
    </WatchlistContext.Provider>
  );
};
