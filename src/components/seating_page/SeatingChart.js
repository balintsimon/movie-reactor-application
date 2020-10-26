import React, {useEffect} from "react";
import TheaterSeat from "./TheaterSeat";
import {FREE_SEAT_CLASS, OCCUPIED_SEAT_CLASS, REACTOR_YELLOW} from "../../Constants";
import "./Theater.css";

const SeatingChart = (props) => {
    let occupiedSeats = props.reservedSeats;
    let room = props.room;
    let seats = room.seats;

    let leftSideSeats = [];
    let rightSideSeats = [];

    function getOccupiedSeatIds() {
        let occupiedSeatIds = [];
        for (let occupiedSeat of occupiedSeats) {
            occupiedSeatIds.push(parseInt(occupiedSeat.seat.id));
        }
        return occupiedSeatIds;
    }

    function createEmpty2DContainer(numberOfRows, numberOfColumns) {
        let table = [[]];
        for (let actualSeatNumber = 0; actualSeatNumber < numberOfColumns; actualSeatNumber++) {
            let row = []
            for (let actualRowNumber = 0; actualRowNumber < numberOfRows - 1; actualRowNumber++) {
                row.push(<div>Seat loading</div>)
            }
            table.push(row);
        }
        return table;
    }

    function getOwnSeatIds() {
        let ownSeatIds = [];
        for (let occupiedSeat of occupiedSeats) {
            if (occupiedSeat.visitor["id"]) ownSeatIds.push(parseInt(occupiedSeat.seat.id));
        }
        return ownSeatIds;
    }

    function generateSeats(occupiedSeatIds, ownSeatIds, seatsHolder, seats) {
        let previousSeat = null;
        for (let seat of seats) {
            let isSeatOccupied = occupiedSeatIds.includes(parseInt(seat.id));
            let isSeatMine = ownSeatIds.includes(parseInt(seat.id));
            let seatStyleClass = isSeatOccupied ? OCCUPIED_SEAT_CLASS : FREE_SEAT_CLASS;
            let seatColor = isSeatOccupied && !isSeatMine ? REACTOR_YELLOW : "white";
            let seatOpacity = isSeatOccupied && !isSeatMine ? "0.4" : "1";
            let currentRowNumber = parseInt(seat.rowNumber);
            let currentSeatNumber = parseInt(seat.seatNumber);

            seatsHolder[currentSeatNumber - 1][currentRowNumber - 1] = (
                <TheaterSeat key={`row-${currentRowNumber}-seat-${currentSeatNumber}`}
                             row={currentRowNumber}
                             column={currentSeatNumber}
                             id={seat.id}
                             own={isSeatMine}
                             seatOccupiedClass={seatStyleClass}
                             seatColor={seatColor}
                             seatOpacity={seatOpacity}
                             dataRow={currentRowNumber}
                             dataColumn={currentSeatNumber}
                />);
            if (previousSeat != null && parseInt(previousSeat.rowNumber) < currentRowNumber + 1) {
                seatsHolder[currentSeatNumber][currentRowNumber - 1] =
                    <p key={`element-${currentRowNumber}`} className="row no-gutters"/>;
            }
            previousSeat = seat;
        }
        return seatsHolder;
    }

    function fillLeftSeatChart(seatingArray) {
        let seatChart = [];
        for (let rowNumber = 0; rowNumber < parseInt(room.numberOfSeatsPerRow / 2, 10); rowNumber++) {
            let seats = seatingArray[rowNumber];
            seatChart.push(
                <div className={`cinema-row`}>
                    {seats}
                </div>);
        }
        return seatChart;
    }

    function fillRightSeatChart(seatingArray) {
        let seatChart = [];
        for (let rowNumber = parseInt(room.numberOfSeatsPerRow / 2, 10); rowNumber < room.numberOfSeatsPerRow; rowNumber++) {
            let seats = seatingArray[rowNumber];
            seatChart.push(
                <div className={`cinema-row`}>
                    {seats}
                </div>);
        }
        return seatChart;
    }

    function fillSeatsTable() {
        let occupiedSeatIds = getOccupiedSeatIds();
        let ownSeatIds = getOwnSeatIds();
        let seatContainer = createEmpty2DContainer(room.numberOfRows, room.numberOfSeatsPerRow);
        seatContainer = generateSeats(occupiedSeatIds, ownSeatIds, seatContainer, seats);
        leftSideSeats = fillLeftSeatChart(seatContainer);
        rightSideSeats = fillRightSeatChart(seatContainer);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    fillSeatsTable();

    return (
        <div>
            <div style={mainCardStyle} key="seating-chart-left" className="cinema-seats left">
                {leftSideSeats}
            </div>
            <div style={mainCardStyle} key="seating-chart-left" className="cinema-seats right">
                {rightSideSeats}
            </div>
        </div>

    )
}

export default SeatingChart;

const mainCardStyle = {
    display: "flex",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%)",
    zIndex: "0",
    flex: "wrap"
}