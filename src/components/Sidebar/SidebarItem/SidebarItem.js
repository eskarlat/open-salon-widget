import React from "react";
import { NavLink } from "react-router-dom";

import SelectedItems from "../../../components/SelectedItems/SelectedItems";

const SidebarItem = props => {
    const selectedItems = props.item.position === 0 && <SelectedItems />;

    return (
        <React.Fragment>
            <div className="widget_navigation__item">
                <img
                    className="widget_navigation__icon"
                    src={props.item.icon}
                    alt={props.item.title}
                />
                <NavLink
                    className="widget_navigation__text"
                    to={props.item.url}
                >
                    {props.item.title}
                </NavLink>
            </div>
            {selectedItems}
        </React.Fragment>
    );
};

export default SidebarItem;
