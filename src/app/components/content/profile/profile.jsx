import React from 'react';
import s from "./profile.module.sass";
import ProfileInfo from "./profileInfo/profileInfo";
import Posts from "./posts/posts";
import PostsContainer from "./posts/postsContainer";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo userProfile={props.userProfile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner ={props.isOwner}
                         savePhoto={props.savePhoto}
                         updateProfile={props.updateProfile}
            />
            <PostsContainer {...props}/>
        </div>
    )
}

export default Profile;