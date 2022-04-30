import React from 'react'
import s from './post.module.sass'
import PreLoader from "../../../../common/preloader/preLoader";
import userPhoto from "../../../../../../assests/ava.png"



const post = (props) =>{
    if(!props.userProfile){
        return <PreLoader/>
    }
    return(
        <div className={s.post}>
            <img src={props.userProfile.photos.small != null ? props.userProfile.photos.small : userPhoto}/>
            <span className={s.name}>{props.userProfile.fullName}</span>
            <span className={s.item}>{props.message}</span>
            <span className={s.like}>Like {props.likeCount}</span>
        </div>
    )
}

export default post;