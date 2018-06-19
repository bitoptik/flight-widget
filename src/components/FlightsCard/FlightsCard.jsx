import PropTypes from "prop-types";
import React from 'react';
import './style.scss';

function FlightsCard({ flight }) {
    return (
        <div className="card">
            <div className="direction">
                <div className="from">
                    <div className="title">From</div>
                    <div className="city">{flight.direction.from}</div>
                </div>
                <div className="to">
                    <div className="title">To</div>
                    <div className="city">{flight.direction.to}</div>
                </div>
            </div>
            <div className="time-block">
                <div className="departure">
                    <div className="title">Departure</div>
                    <div className="time">{formatDate(new Date(flight.departure))}</div>
                </div>
                <div className="arrival">
                    <div className="title">Arrival</div>
                    <div className="time">{formatDate(new Date(flight.arrival))}</div>
                </div>
            </div>
            <div className="carrier-name">{flight.carrier}</div>
        </div>
    )
}

//Helpers
function formatDate(date) {
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let month = date.getMonth() + 1;

    month = month < 10 && "0" + month;

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

FlightsCard.propTypes = {
    flight: PropTypes.object
};

export default FlightsCard;
