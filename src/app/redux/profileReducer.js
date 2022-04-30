import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST = 'UPDATE-NEW-POST'
const SET_USER_PROFILE ='SET_USER_PROFILE'
const SET_STATUS ='SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState =  {
    postsData : [
        {id:1, message:"Hello, it's my first post", likeCount: 5},
        {id:2, message:"i'm learning React", likeCount: 2},
        {id:3, message:"React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.", likeCount: 10},
        {id:4, message:"Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.", likeCount: 15}
    ],
    newPostText : "",
    userProfile: null,
    status: ""
}

/*
const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            let newPost = {
                id:5,
                name:"Jhon Smith",
                message: state.newPostText,
                likeCount: 12
            }
            state.postsData.push(newPost);
            state.newPostText = '';
            return state
        case UPDATE_NEW_POST:
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}
*/

const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            let newPost = {
                id:5,
                name:"Jhon Smith",
                message: state.newPostText,
                likeCount: 12
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        case UPDATE_NEW_POST:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state, userProfile: {...state.userProfile, photos: action.photos }
            }
        default:
            return state
    }
}


export const ADD_POST_ACTION_CREATE = () => ({type: ADD_POST })
export const UPDATE_NEW_POST_ACTION_CREATE = (text) => ({type: UPDATE_NEW_POST, newText: text})
export const SET_USERS_PROFILE_ACTION_CREATE = (profile) => ({type: SET_USER_PROFILE, profile})
export const SET_STATUS_ACTION_CREATOR =(status)=> ({type:SET_STATUS, status})
export const SAVE_PHOTO_SUCCESS_ACTION_CREATOR = (photos) => ({type:SAVE_PHOTO_SUCCESS, photos})

export const usersProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.profile(userId)
        dispatch(SET_USERS_PROFILE_ACTION_CREATE(response.data))
    }
}
export const getStatusThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(SET_STATUS_ACTION_CREATOR(response.data))
    }
}
export const updateStatusThunkCreator = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(SET_STATUS_ACTION_CREATOR(status))
        }
    }
}
export const savePhotoThunkCreator = (photo) => {
    return async (dispatch) => {
        let response = await profileAPI.savePhoto(photo)
        if (response.data.resultCode === 0){
            dispatch(SAVE_PHOTO_SUCCESS_ACTION_CREATOR(response.data.data.photos))
        }
    }
}
export const updateProfileThunkCreator = (profileInfo) => {
    return async (dispatch, getState) =>{
        let response = await profileAPI.updateProfile(profileInfo)
        if (response.data.resultCode === 0){
            debugger
            dispatch(usersProfileThunkCreator(getState().auth.id))
        }
    }
}
export default profileReducer;