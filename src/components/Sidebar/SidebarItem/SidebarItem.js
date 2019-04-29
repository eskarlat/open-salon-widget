import React from "react";
import { NavLink } from "react-router-dom";

import SelectedItems from "../../../components/SelectedItems/SelectedItems";

const SidebarItem = props => {
    const selectedItems = props.item.position === 0 && <SelectedItems />;

    return (
        <React.Fragment>
            <NavLink
                activeClassName="widget_navigation__item-active"
                className="widget_navigation__item"
                to={props.item.url}
            >
                <img
                    className="widget_navigation__icon"
                    src={props.item.icon}
                    alt={props.item.title}
                />
                <span className="widget_navigation__text">
                    {props.item.title}
                </span>
            </NavLink>
            {selectedItems}
        </React.Fragment>
    );
};

export default SidebarItem;
