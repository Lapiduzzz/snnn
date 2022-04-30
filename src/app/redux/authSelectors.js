
export const getAuthorizedUserId = (state) =>{
    return state.auth.id
}

export const getIsAuth = (state) =>{
    return state.auth.isAuth
}

export const getErrorMessages = (state) =>{
    return state.auth.errorMessages
}

export const getCaptchaUrl= (state) =>{
    return state.auth.captchaURL
}