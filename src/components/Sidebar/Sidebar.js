import React from 'react';
import './Sidebar.scss';

import SidebarItem from './SidebarItem/SidebarItem';

const menu = [
    { id: 1, title: 'Booking', position: 0, url: '/booking/location' },
    { id: 2, title: 'Chat', position: 1, url: '/chat' },
    { id: 3, title: 'Profile', position: 2, url: '/profile' }
];

const Sidebar = props => {
    return (
        <ul className="widget-sidebar">
            {menu.map(item => (<SidebarItem key={item.id} item={item}/>))}
        </ul>
    );
}

export default Sidebar;