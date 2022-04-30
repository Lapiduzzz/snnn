import React from "react";
import {NavLink} from "react-router-dom";
import s from './user.module.sass'
import userPhoto from './../../../../../assests/ava.png'
import PreLoader from "../../../common/preloader/preLoader";
import * as axios from "axios";
import {buttonFollowAPI} from "../../../../api/api";
import Paginator from "../../../common/paginator/paginator";


const User = (props) => {
    return (
        <div>
            <Paginator {...props}/>
            {props.isFetching ? <PreLoader/> : null}
            {props.usersData.map(u =>
                <div key={u.id}>
                    <div className={s.user}>
                        <div className={s.userInfo}>
                            <div className={s.userAva}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto}/>
                                </NavLink>
                            </div>
                            <div className={s.description}>
                                <p className={s.name}>{u.name}</p>
                                <p className={s.location}>City, Country</p>
                                <p className={s.status}>{u.status}</p>
                            </div>
                        </div>
                        <div className={s.buttons}>
                            {u.followed
                                ? <button className={s.unfollow}
                                          disabled={props.followingProgress.some(id => id === u.id)}
                                          onClick={() => { props.unfollowUser(u.id)}}>UNFOLLOW</button>
                                :
                                <button className={s.follow}
                                        disabled={props.followingProgress.some(id => id === u.id)}
                                        onClick={() => {props.followUser(u.id)}}>FOLLOW</button>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default User;