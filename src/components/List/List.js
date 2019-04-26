import React from "react";
import "./List.scss";

const List = props => {
    return <div className="widget__list">{props.children}</div>;
};

export default List;
