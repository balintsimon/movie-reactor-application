import React from 'react';
import {getYearFromDate} from "../../../Utils";

const TitleGenreRatingBox = (props) => {

    const validateRuntime = (runtime) => {
        if (runtime === null || runtime === 0) {
            return "N/A";
        } else {
            return `${runtime} min`
        }
    };

    const validateAvgVotes = (voteValue) => {
        if (voteValue === 0 || voteValue === null) {
            return "N/A";
        }
        return voteValue;
    }

    return (
        <div key="frosted" className="frosted">
            <div className="row no-gutters">
                <div className="col-md-12"
                     style={{
                         height: "200px",
                         textAlign: "left",
                         color: "white",
                         padding: "0",
                     }}>
                    <h1 style={{
                        marginLeft: "7%",
                        marginTop: "20px",
                        marginRight: "20px",
                    }}>{props.title}<span style={{fontStyle: "italic"}}>{getYearFromDate(props.releaseDate)}</span></h1>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-12" style={{
                    textAlign: "left",
                    color: "white",
                    padding: "0",
                    height: "50px",
                }}>
                    <div style={{
                        marginLeft: "7%",
                        marginTop: "10px",
                        fontStyle: "italic",
                        fontSize: "20px"
                    }}>{props.genres.join(", ")}
                    </div>
                </div>
            </div>
            <div className="row no-gutters">
                <div className="col-md-12" style={{
                    fontSize: "20px",
                    fontStyle: "bolder",
                    height: "50px",
                    width: "100%",
                    textAlign: "left",
                    color: "white",
                    padding: "0",
                }}>
                    <div style={{marginTop: "10px"}}>
                        <img style={{width: "32px", marginRight: "5px", marginLeft: "7%"}}
                             src={"/images/popularity64.png"} alt="Popularity"/><span
                        style={{marginRight: "15px"}}>{props.popularity}</span><img
                        style={{width: "32px", marginRight: "5px"}} src={"/images/star64.png"}
                        alt="Votes"/><span style={{marginRight: "5px"}}>{validateAvgVotes(props.voteAvg)}</span><img
                        style={{width: "32px", marginLeft: "10px", marginRight: "5px"}}
                        src={"/images/time64.png"}
                        alt="Duration"/><span style={{marginRight: "15px"}}>{validateRuntime(props.runtime)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TitleGenreRatingBox;