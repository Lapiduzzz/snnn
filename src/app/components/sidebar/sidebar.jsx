import React from 'react'
import s from './sidebar.module.sass'
import {NavLink} from "react-router-dom";

const Sidebar = () =>{
    return(
        <div className={s.sidebar}>
            <ul className={s.nav}>
                <li ><NavLink to="/profile" activeClassName={s.active}>Profile</NavLink></li>
                <li><NavLink to="/messages" activeClassName={s.active}>Messages</NavLink></li>
                <li ><NavLink to="/feed" activeClassName={s.active}>News Feed</NavLink></li>
                <li><NavLink to="/friends" activeClassName={s.active}>Friends</NavLink></li>
                <li ><NavLink to="/photo" activeClassName={s.active}>Photo</NavLink></li>
                <li><NavLink to="/music" activeClassName={s.active}>Music</NavLink></li>
                <li><NavLink to="/users" activeClassName={s.active}>Users</NavLink></li>
            </ul>
        </div>
    )
}

export default Sidebar;