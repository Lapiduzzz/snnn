import s from "./profileInfo.module.sass";
import React from "react";

const ProfileDescription = (props) => {
//    let cont = Object.keys(props.userProfile.contacts).map(c => <div><b>{c}:</b></div>)

    const contacts = (name, value) =>{
        if(value){
            return (
                <div className={s.contactsItem}><b>{name}</b>: {value}</div>
            )
        }
    }

    return(
        <div>
            <div className={s.info}>
                <p>{props.userProfile.aboutMe}</p>
                <p className={s.jobDescripton}>{props.userProfile.lookingForAJobDescription}</p>
                <p className={s.jobDescripton}><b>Looking for a Job: </b>{props.userProfile.lookingForAJob ? 'YES' : 'NO'}</p>
            </div>
            <div className={s.contacts}>
                {contacts('GitHub' , props.userProfile.contacts.github)}
                {contacts('Facebook' , props.userProfile.contacts.facebook)}
                {contacts('VK' , props.userProfile.contacts.vk)}
                {contacts('Instagram' , props.userProfile.contacts.instagram)}
                {contacts('Twitter' , props.userProfile.contacts.twitter)}
                {contacts('YouTube' , props.userProfile.contacts.youtube)}
                {contacts('WebSite' , props.userProfile.contacts.website)}
                {contacts('MainLink' , props.userProfile.contacts.mainLink)}
            </div>
        </div>
    )
}


export default ProfileDescription;