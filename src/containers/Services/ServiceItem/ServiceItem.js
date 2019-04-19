import React from 'react';
import './ServiceItem.scss';

const ServiceItem = props => {
    return (
        <div className="service-item" onClick={() => props.clicked(props.service)}>
            <span>{props.service.title}</span>/
            <span>{props.service.duration}</span>/
            <span>{props.service.cost}</span>
        </div>
    );
}

export default ServiceItem;