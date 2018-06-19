import PropTypes from "prop-types";
import React from 'react';
import FlightCard from 'components/FlightsCard/FlightsCard';
import './style.scss';

function FlightsCards({ flights }) {
    const cards = flights.map((flight, index) => <FlightCard key={index} flight={flight} />);

    return (
        <div className="cards">
            {cards}
        </div>
    )
}

FlightsCards.propTypes = {
    flights: PropTypes.array
};

export default FlightsCards;