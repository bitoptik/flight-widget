import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { selectCarrier } from 'store/actions/widget';
import CarriersSelect  from 'components/CarriersSelect/CarriersSelect';
import FlightsCards  from 'components/FlightsCards/FlightsCards';
import './style.scss';

function FlightsWidget({ selected, selectCarrier }) {
    const data = getData();
    const allCarriers = data.flights.map(flight => flight.carrier);
    const uniqueCarriers = unique(allCarriers);
    let flights = data.flights;

    if (selected !== 'all') {
        flights = flights.filter(flight => {
            return flight.carrier === selected;
        });
    }

    return (
        <div className="flights-widget">
            <CarriersSelect selectCarrier={selectCarrier} carriers={uniqueCarriers} />
            <FlightsCards flights={flights} />
        </div>
    )
}

//Helpers
function getData() {
    return {
        "flights": [
            {
                "id": 123,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T19:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "S7"
            },
            {
                "id": 193,
                "direction": {
                    "from": "Moscow",
                    "to": "New York"
                },
                "arrival": "2016-06-08T21:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "Aeroflot"
            },
            {
                "id": 133,
                "direction": {
                    "from": "Moscow",
                    "to": "Samara"
                },
                "arrival": "2016-09-08T13:52:27.979Z",
                "departure": "2016-08-08T17:51:20.979Z",
                "carrier": "KLM"
            },
            {
                "id": 126,
                "direction": {
                    "from": "Moscow",
                    "to": "London"
                },
                "arrival": "2016-08-10T13:52:27.979Z",
                "departure": "2016-08-09T17:51:20.979Z",
                "carrier": "S7"
            },
            {
                "id": 1543,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T13:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "Aeroflot"
            },
            {
                "id": 1213,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T13:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "Aeroflot"
            },
            {
                "id": 1523,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T13:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "KLM"
            },
            {
                "id": 1283,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T13:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "Aeroflot"
            },
            {
                "id": 12310,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-08T13:52:27.979Z",
                "departure": "2016-06-08T17:51:20.979Z",
                "carrier": "Aeroflot"
            },
            {
                "id": 19923,
                "direction": {
                    "from": "Moscow",
                    "to": "Berlin"
                },
                "arrival": "2016-06-11T13:52:27.979Z",
                "departure": "2016-06-10T17:51:20.979Z",
                "carrier": "KLM"
            },
            {
                "id": 2542,
                "direction": {
                    "from": "Madrid",
                    "to": "Paris"
                },
                "arrival": "2016-06-16T13:52:27.979Z",
                "departure": "2016-06-17T17:51:20.979Z",
                "carrier": "S7"
            }
        ]
    };
}

function unique(array) {
    let obj = {};

    array.forEach((item) => {
        obj[item] = true;
    });

    return Object.keys(obj);
}


const mapStateToProps = state => ({
    selected: state.widget.selected,
});

const mapDispatchToProps = dispatch => ({
    selectCarrier: (e) => {
        return dispatch(selectCarrier(e.target.value))
    }
});

FlightsWidget.propTypes = {
    selected: PropTypes.string,
    selectCarrier: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightsWidget);
