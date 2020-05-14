import React, {useEffect, useState} from "react";
import axios from "axios";

import FirstRow from "./FirstRow";
import CoverPicture from "./CoverPicture";
import PosterPicture from "./PosterPicture";
import LinksToExternalPagesGroup from "./LinksToExternalPagesGroup";
import TitleGenreRatingBox from "./TitleGenreRatingBox";
import Tagline from "./Tagline";
import SpokenLanguages from "./SpokenLanguages";
import AddToWatchlistButton from "./AddToWatchlistButton";
import Overview from "./Overview";

const API_KEY = process.env.REACT_APP_API_KEY;

const IMAGE_SIZES = {
    backdrop_sizes: ["w300", "w780", "w1280", "original"],
    logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
    poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
};

const MovieDetailPage = () => {

    const getMovieIdFromUrl = () => {
        let urlFragments = window.location.href.split("/");
        return urlFragments[urlFragments.length - 1];
    };
    let MOVIE_ID = getMovieIdFromUrl();

    const [movieObject, setMovieObject] = useState({})
    const [backdrop, setBackdrop] = useState(null);
    const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    const [popularity, setPopularity] = useState("");
    const [voteAvg, setVoteAvg] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [genres, setGenres] = useState([]);
    const [homepage, setHomepage] = useState("");
    const [runtime, setRuntime] = useState("");
    const [spokenLanguages, setSpokenLanguages] = useState([]);
    const [imdbId, setImdbId] = useState("");
    const [youtubeTrailer, setYoutubeTrailer] = useState("");
    const [overview, setOverview] = useState("");
    const [tagline, setTagline] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0)
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`
            )
            .then((res) => {
                if (res.data.results.length === 0) {
                    setYoutubeTrailer('no-trailer');
                } else {
                    setYoutubeTrailer(res.data.results[0].key);
                }
            });
        axios
            .get(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}`)
            .then((res) => {
                setMovieObject(res.data);
                setBackdrop(res.data["backdrop_path"]);
                setPoster(res.data["poster_path"]);
                setTitle(res.data["title"]);
                setPopularity(res.data["popularity"]);
                setVoteAvg(res.data["vote_average"]);
                setReleaseDate(res.data["release_date"]);
                setGenres(
                    res.data["genres"].map((item) => {
                        return item["name"];
                    })
                );
                setHomepage(res.data["homepage"]);
                setRuntime(res.data["runtime"]);
                setSpokenLanguages(
                    res.data["spoken_languages"].map((item) => {
                        return item["name"];
                    })
                );
                setImdbId(res.data["imdb_id"]);
                setOverview(res.data["overview"]);
                setTagline(res.data["tagline"]);
            });
    }, [MOVIE_ID]);

    return (
        <div className={"media"}>
            <div className="col-2 align-self-start" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}>
            </div>
            <div className="col-9 align-self-center" style={{...mainColumnStyle, ...{backgroundColor: "#343434"}}}>
                {/* The center container div. There is a grid in it. */}
                <div className="container-fluid" style={{padding: "0"}}>
                    <FirstRow/>
                    <div className="row no-gutters">
                        <CoverPicture size={IMAGE_SIZES.backdrop_sizes[3]}
                                      backdrop={backdrop}/>
                    </div>
                    <div className="row no-gutters" style={{padding: "0"}}>
                        <div className="col-md-5"
                             style={containerStyle}>
                            <PosterPicture imageSize={IMAGE_SIZES.poster_sizes[3]}
                                           poster={poster}/>
                            <div className="row no-gutters">
                                <Tagline tagline={tagline}/>
                            </div>
                            <div className="row no-gutters">
                                <LinksToExternalPagesGroup
                                    homepage={homepage}
                                    imdbId={imdbId}
                                    youtubeTrailer={youtubeTrailer}/>
                            </div>
                            <div className="row no-gutters">
                                <SpokenLanguages spokenLanguages={spokenLanguages}/>
                            </div>
                        </div>
                        <div className="col-md-7" style={containerStyle}>
                            <TitleGenreRatingBox backdrop={backdrop}
                                                 title={title}
                                                 releaseDate={releaseDate}
                                                 genres={genres}
                                                 popularity={popularity}
                                                 voteAvg={voteAvg}
                                                 runtime={runtime}/>
                            <div className="row no-gutters">
                                <Overview overview={overview}/>
                                <div className="col-md-4">
                                    <AddToWatchlistButton movieObject={movieObject}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-1 align-self-end" style={{...mainColumnStyle, ...{backgroundColor: "#e6b31e"}}}/>
        </div>
    );
}

const mainColumnStyle = {
    display: "flex",
    flexFlow: "row wrap",
    height: "1500px",
    padding: "0"
}

const containerStyle = {
    textAlign: "center", padding: "5% 5% 0"
}

export default MovieDetailPage;
