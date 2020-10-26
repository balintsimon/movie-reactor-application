import React from "react";

const Legends = () => {

    return (
        <>
            <div style={{...bookedSeatLegend, ...legend}}>
                <div className="hazy" style={{...takenSeatPict, ...seatPicture}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Booked</div>
            </div>
            <div style={{...yourSeatLegend, ...legend}}>
                <div className="hazy" style={{...yourSeatPict, ...seatPicture}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Your seats</div>
            </div>

            <div style={{...freeSeatLegend, ...legend}}>
                <div className="hazy" style={{...freeSeatPict, ...seatPicture}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Available</div>
            </div>
            <div style={{...selectedSeatLegend, ...legend}}>
                <div className="hazy" style={{...selectedSeatPict, ...seatPicture}}/>
                <div className="hazy" style={{fontSize: ".4em"}}>Selected</div>
            </div>
        </>
    )
}

export default Legends;

const legend = {
    position: "absolute",
    bottom: "6%",
    transform: "translate(-50%, -50%) scale(3)",
    zIndex: "1",
    color: "white",
}

const bookedSeatLegend = {
    left: "20%"
}

const yourSeatLegend = {
    left: "30%",
}

const freeSeatLegend = {
    left: "39.5%",
}

const selectedSeatLegend = {
    left: "48%",
}

const seatPicture = {
    width: "20px",
    height: "20px",
    borderRadius: "3px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
}

const takenSeatPict = {
    marginLeft: "1px",
    background: "linear-gradient(to top, #fac834, #e6b31e, #e6b31e, #e6b31e, #e6b31e, #fac834, #ffda6e)",
    opacity: "0.4"
}

const yourSeatPict = {
    marginLeft: "5px",
    background: "linear-gradient(to top, #fac834, #e6b31e, #e6b31e, #e6b31e, #e6b31e, #fac834, #ffda6e)"
}

const freeSeatPict = {
    marginLeft: "3px",
    background: "white"
}
const selectedSeatPict = {
    marginLeft: "2.5px",
    background: "linear-gradient(to top, #761818, #761818, #761818, #761818, #761818, #B54041, #F3686A)"
}
