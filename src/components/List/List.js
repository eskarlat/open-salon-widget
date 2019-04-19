import React from 'react';
import './List.scss';

const List = props => {
    return (
        <div className="widget-list">
            {props.children}
        </div>
    );
}

export default List; 