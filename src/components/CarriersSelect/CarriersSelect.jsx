import PropTypes from "prop-types";
import React from 'react';
import './style.scss';

function CarriersSelect({ carriers, selectCarrier }) {
    const options = carriers.map((carrier, index) => <option value={carrier} key={index}>{carrier}</option>);

    return (
        <select className="carriers-select" onChange={selectCarrier}>
            <option value="all">All carriers</option>
            {options}
        </select>
    )
}

CarriersSelect.propTypes = {
    carriers: PropTypes.array,
    selectCarrier: PropTypes.func,
};

export default CarriersSelect;
