import React from "react";
import { connect } from "react-redux";
import "./Sidebar.scss";

import SidebarItem from "./SidebarItem/SidebarItem";

import Scissors from "../../assets/SVG/scissors.svg";
import Chat from "../../assets/SVG/chat.svg";
import User from "../../assets/SVG/user.svg";

const menu = [
    {
        id: 1,
        title: "Booking",
        position: 0,
        url: "/booking/location",
        icon: Scissors
    },
    { id: 2, title: "Chat", position: 1, url: "/chat", icon: Chat },
    { id: 3, title: "Profile", position: 2, url: "/profile", icon: User }
];

const Sidebar = props => {
    return (
        <div className="widget__sidebar">
            <div className="widget__sidebar--brand">
                <img
                    src={props.salon.logo}
                    alt="logo"
                    className="widget__sidebar-logo"
                />
            </div>
            <nav className="widget_navigation">
                {menu.map(item => (
                    <SidebarItem key={item.id} item={item} />
                ))}
            </nav>
            <div className="legacy">
                <div className="copyright">
                    &copy; 2019 OpenSalon. Evgeny Skarlat. All right reserved.
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        salon: state.sal.salon
    };
};

export default connect(mapStateToProps)(Sidebar);
