import React from 'react';

const SeatingPicture = (props) => {

    if (props.backdrop === null) {
        return (
            <div className="col-md-12" style={{height: "125px", backgroundColor: "#2e2e2e", padding: "0"}}>
                <div style={{textAlign: "center", padding: "2%", backgroundColor: "#343434"}}>
                </div>
            </div>
        );
    }

    return (
        <div className="col-md-12" style={{height: "300px", backgroundColor: "#e6b31e", padding: "0"}}>
            <div style={{textAlign: "center", padding: "2%", backgroundColor: "#343434"}}>
                <img
                    className="shaded-image"
                    src={`https://image.tmdb.org/t/p/${props.size}${props.backdrop}`}
                    alt="Backdrop" style={{width: "100%", filter: "grayscale(80%)"}}
                />
                <div style={shading}/>
            </div>
        </div>
    );
}

export default SeatingPicture;


const shading = {
    position: "absolute",
    bottom: "-200%",
    right: "0",
    height: "200%",
    width: "100%",
    background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #343434 50%, #343434 100%)",
}
