import {authAPI, usersAPI} from "../api/api";
import {authThunkCreator} from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }

}

export const INITIALIZED_SUCCESS_ACTION_CREATOR = () => ({type: INITIALIZED_SUCCESS})

export const initializedThunkCreator = () =>{
    return (dispatch)=>{
        let promise = dispatch(authThunkCreator())
        Promise.all([promise])
            .then(()=>{
            dispatch(INITIALIZED_SUCCESS_ACTION_CREATOR())
        })
    }
}



export default appReducer;