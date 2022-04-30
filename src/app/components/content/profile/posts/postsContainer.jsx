import React from 'react';
import {ADD_POST_ACTION_CREATE, UPDATE_NEW_POST_ACTION_CREATE} from "../../../../redux/profileReducer";
import Posts from "./posts";
import {connect} from "react-redux";
import {getNewPostText, getPosts, getPostsData, getUserProfile} from "../../../../redux/profileSelectors";


/*const PostsContainer = (props) => {

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(ADD_POST_ACTION_CREATE());
    }

    let onChange = (text) => {
        let action = UPDATE_NEW_POST_ACTION_CREATE(text);
        props.store.dispatch(action);
    }

    return( <Posts addPost={addPost}
                   onChange={onChange}
                   postsData={state.profile.postsData}
                   newPostText={state.profile.newPostText}/>)
}*/


let mapStateToProps = (state) => {
    return {
        postsData: getPostsData(state),
        newPostText: getNewPostText(state),
        userProfile: getUserProfile(state),
    }

}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(ADD_POST_ACTION_CREATE())
        },
        onChange: (text) => {
            dispatch(UPDATE_NEW_POST_ACTION_CREATE(text))
        }
    }
}


const PostsContainer = connect(mapStateToProps,mapDispatchToProps)(Posts);

export default PostsContainer;