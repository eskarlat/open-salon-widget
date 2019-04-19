import React from 'react';
import './Basic.scss';

//Components
import Sidebar from '../../components/Sidebar/Sidebar';

const Basic = props => {
    return (
        <div className="widget">
            <div className="widget__left">
                <Sidebar/>
            </div>
            <div className="widget__right">
                {props.children}
            </div>
        </div>
    );
}

export default Basic;