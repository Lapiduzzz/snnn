import React, {useState} from 'react'
import s from './header.module.sass'
import {NavLink} from "react-router-dom";
import ava from '../../../assests/ava.png'


const Header = (props) => {

    const [LIActive, setLIActive] = useState(false)


    return (
        <header className={s.header}>
            <div className={s.logo}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png" alt=""/>
            </div>
            <div className={s.login}>
                {props.isAuth
                    ?<div onMouseOver={()=>{setLIActive(true)}}
                          onMouseLeave={()=>{setLIActive(false)}}>
                        <span>{props.login}</span>
                        <div className={LIActive ? `${s.loginInfo} ${s.LIActive}` : s.loginInfo}>
                            <img src={
                                props.userProfile && props.userProfile.photos.small
                                ? props.userProfile.photos.small : ava}/>
                            <div className={s.changeTheme}>
                                <div className={`${s.changeThemeItems} ${s.default}`}
                                     onClick={()=>{props.changeTheme('default')}}>
                                </div>
                                <div className={`${s.changeThemeItems} ${s.dark}`}
                                     onClick={()=>{props.changeTheme('dark')}}>
                                </div>
                                <div className={`${s.changeThemeItems} ${s.monochrome}`}
                                     onClick={()=>{props.changeTheme('monochrome')}}>
                                </div>
                                <div className={`${s.changeThemeItems} ${s.light}`}
                                     onClick={()=>{props.changeTheme('light')}}>
                                </div>
                                <div className={`${s.changeThemeItems} ${s.darkGreen}`}
                                     onClick={()=>{props.changeTheme('darkGreen')}}>
                                </div>
                                <div className={`${s.changeThemeItems} ${s.darkBlue}`}
                                     onClick={()=>{props.changeTheme('darkBlue')}}>
                                </div>
                            </div>
                            <span onClick={props.logout}>Logout</span>
                        </div>

                    </div>
                    : <NavLink to='/login' activeClassName={s.active}>
                        <span>Login</span>
                    </NavLink>}
            </div>
        </header>
    )
}

export default Header;