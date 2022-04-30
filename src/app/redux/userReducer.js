import {usersAPI} from "../api/api";

const FOLLOW_USER = 'FOLLOW_USER'
const UNFOLLOW_USER = 'UNFOLLOW_USER'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
    usersData: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingProgress: []

}


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: true}
                        }
                        return u
                    }
                )
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                        if (u.id === action.userId) {
                            return {...u, followed: false}
                        }
                        return u
                    }
                )
            }
        case SET_USERS:
            return {
                ...state,
                usersData: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
}

export const FOLLOW_USER_ACTION_CREATOR = (userId) => ({type: FOLLOW_USER, userId})
export const UNFOLLOW_USER_ACTION_CREATOR = (userId) => ({type: UNFOLLOW_USER, userId})
export const SET_USERS_ACTION_CREATOR = (users) => ({type: SET_USERS, users})
export const SET_CURRENT_PAGE_ACTION_CREATOR = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const SET_TOTAL_USERS_COUNT_ACTION_CREATOR = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const TOGGLE_IS_FETCHING_ACTION_CREATOR = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const TOGGLE_FOLLOWING_PROGRESS_ACTION_CREATOR = (isFetching, userId) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFetching,
    userId
})


export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(TOGGLE_IS_FETCHING_ACTION_CREATOR(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(SET_USERS_ACTION_CREATOR(data.items));
        dispatch(SET_TOTAL_USERS_COUNT_ACTION_CREATOR(data.totalCount))
        dispatch(TOGGLE_IS_FETCHING_ACTION_CREATOR(false))
    }
}

export const FollowUserThunkCreator = (id) => {
    return async (dispatch) => {
        dispatch(TOGGLE_FOLLOWING_PROGRESS_ACTION_CREATOR(true, id))
        let resultCode = await usersAPI.follow(id)
        if (resultCode === 0) {
            dispatch(FOLLOW_USER_ACTION_CREATOR(id))
            dispatch(TOGGLE_FOLLOWING_PROGRESS_ACTION_CREATOR(false, id))
        }
    }
}

export const unfollowUserThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(TOGGLE_FOLLOWING_PROGRESS_ACTION_CREATOR(true, id))
        usersAPI.unfollow(id)
            .then(resultCode => {
                if (resultCode === 0) {
                    dispatch(UNFOLLOW_USER_ACTION_CREATOR(id))
                    dispatch(TOGGLE_FOLLOWING_PROGRESS_ACTION_CREATOR(false, id))
                }
            })
    }
}

export default userReducer;