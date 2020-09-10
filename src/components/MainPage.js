import React, {useState, useEffect} from "react";
import axios from 'axios';
import {API_URL_MOVIE} from "../Constants";

const API_KEY = process.env.REACT_APP_API_KEY;
const imgURL = "url()";

const mainStyle = {
  backgroundImage: imgURL,
};

export default function MainPage() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
        axios.get(`${API_URL_MOVIE}top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        .then((response) => setTopRatedMovies(response.data.results));
        console.log(topRatedMovies);
  }, []);


  
  return <div style={mainStyle}> Main Page</div>;
}

