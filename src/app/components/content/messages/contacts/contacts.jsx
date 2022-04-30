import React from 'react';
import s from './contacts.module.sass';
import {NavLink} from "react-router-dom";


const Contacts = (props) =>{
    let path ="/messages/" + props.id
    return(
        <div className={s.contact_name}>
            <NavLink to={path} activeClassName={s.active}>{props.name}</NavLink>
        </div>
    )
}

export default Contacts;