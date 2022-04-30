import {authAPI, securityAPI, usersAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'
const ERRORS_LOGIN = 'ERRORS_LOGIN'
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL'


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    errorMessages: null,
    captchaURL: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }
        case ERRORS_LOGIN:
            return {
                ...state,
                errorMessages: action.messages
            }
        default:
            return state
    }

}

export const SET_USER_DATA_ACTION_CREATOR = (id, email, login, isAuth) => ({type: SET_USER_DATA, payload:{id, email, login, isAuth}})
export const ERRORS_LOGIN_ACTION_CREATOR = (messages) => ({type: ERRORS_LOGIN, messages})
export const GET_CAPTCHA_URL_ACTION_CREATOR = (captchaURL) => ({type: GET_CAPTCHA_URL, payload: {captchaURL}})


export const authThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.auth()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data
            dispatch(SET_USER_DATA_ACTION_CREATOR(id, email, login, true))
        }
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authThunkCreator())
        } else {
            if (response.data.resultCode === 10){
                dispatch(captchaThunkCreator())
            }
            dispatch(ERRORS_LOGIN_ACTION_CREATOR(response.data.messages))
        }
    }
}

export const captchaThunkCreator = () =>{
    return async (dispatch) => {
        let response = await securityAPI.captcha()
        let responseCaptchaURL = response.data.url
        dispatch(GET_CAPTCHA_URL_ACTION_CREATOR(responseCaptchaURL))
    }
}

export const logoutThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(SET_USER_DATA_ACTION_CREATOR(null, null, null, false))
        }
    }
}

export default authReducer;