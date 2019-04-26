import React from "react";
import "./Basic.scss";

//Components
import Sidebar from "../../components/Sidebar/Sidebar";

const Basic = props => {
    return (
        <div className="widget-app">
            <section className="widget">
                <Sidebar />
                <div className="widget__content">{props.children}</div>
            </section>
        </div>
    );
};

export default Basic;
