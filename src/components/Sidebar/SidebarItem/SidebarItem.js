import React from 'react';
import { NavLink } from 'react-router-dom';

import SelectedItems from '../../../components/SelectedItems/SelectedItems';

const SidebarItem = props => {
    const selectedItems = props.item.position === 0 && <SelectedItems/>;
    
    return (<li><NavLink to={props.item.url}>{props.item.title}</NavLink> {selectedItems}</li>);
}

export default SidebarItem;
