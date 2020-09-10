import React, {useEffect} from "react";
import TheaterSeat from "./TheaterSeat";
import {FREE_SEAT_CLASS, OCCUPIED_SEAT_CLASS, REACTOR_YELLOW} from "../../Constants";
const SeatingChart = (props) => {
    let occupiedSeats = props.reservedSeats;
    let room = props.room;
    let seats = room.seats;
    let seatingArray = [[]];

    function getOccupiedSeatIds() {
        let occupiedSeatIds = [];
        for (let occupiedSeat of occupiedSeats) {
            occupiedSeatIds.push(parseInt(occupiedSeat.seat.id));
        }
        return occupiedSeatIds;
    }

    function createEmpty2DContainer(numberOfRows, numberOfColumns) {
        let table = [[]];
        for (let actualRowNumber = 0; actualRowNumber < numberOfRows - 1; actualRowNumber++) {
            let row = []
            for (let actualSeatNumber = 0; actualSeatNumber < numberOfColumns; actualSeatNumber++) {
                row.push(<div>Seat loading</div>)
            }
            table.push(row);
        }
        return table;
    }

    function generateSeats(occupiedSeatIds, seatsHolder) {
        let previousSeat = null;
        for (let seat of seats) {
            let isSeatOccupied = occupiedSeatIds.includes(parseInt(seat.id));
            let seatStyleClass = isSeatOccupied ? OCCUPIED_SEAT_CLASS : FREE_SEAT_CLASS;
            let seatColor = isSeatOccupied ? REACTOR_YELLOW : "white";
            let seatOpacity = isSeatOccupied ? "0.5" : "1";
            let currentRowNumber = parseInt(seat.rowNumber);
            let currentSeatNumber = parseInt(seat.seatNumber);

            seatsHolder[currentRowNumber - 1][currentSeatNumber - 1] = (
                <TheaterSeat key={`row-${currentRowNumber}-seat-${currentSeatNumber}`}
                             row={currentRowNumber}
                             column={currentSeatNumber}
                             id={seat.id}
                             seatOccupiedClass={seatStyleClass}
                             seatColor={seatColor}
                             seatOpacity={seatOpacity}
                />);
            if (previousSeat != null && parseInt(previousSeat.rowNumber) < currentRowNumber + 1) {
                seatsHolder[currentRowNumber - 1][currentSeatNumber] =
                    <p key={`element-${currentRowNumber}`} className="row no-gutters"/>;
            }
            previousSeat = seat;
        }
        return seatsHolder;
    }

    function fillSeatsTable() {
        let occupiedSeatIds = getOccupiedSeatIds();
        seatingArray = createEmpty2DContainer(room.numberOfRows, room.numberOfSeatsPerRow);
        seatingArray = generateSeats(occupiedSeatIds, seatingArray);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    fillSeatsTable();

    return (
        <div style={mainCardStyle}
             key="seating-chart"
             className="card-deck m-auto">
            {seatingArray}
        </div>
    )
}

export default SeatingChart;

const mainCardStyle = {
    position: "absolute",
    top: "58%",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "0",
    flex: "wrap"
}