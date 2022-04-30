import React from "react";
import s from './users.module.sass'
import User from "./user/user";
import * as axios from "axios";


const UsersFuncXxx = (props) => {

    if (props.usersData.length === 0){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response =>{
            debugger
            props.setUsers(response.data.items)
        })
    }

    let userElement = props.usersData.map(u => <User
        id={u.id}
        key={u.id}
        name={u.name}
        avatar={u.photos.small}
        country='Country'
        city='City'
        status={u.status}
        followed={u.followed}
        followUser={props.followUser}
        unfollowUser={props.unfollowUser}
    />)

    return (
        <div>
            {userElement}
        </div>
    )
}


export default UsersFuncXxx;