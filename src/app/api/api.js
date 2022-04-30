import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "0ee386ea-5564-4f5c-a8fa-74d84af2ef4d"
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },

    follow(userId) {
        return instance
            .post(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode
            })
    },

    unfollow(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => {
                return response.data.resultCode
            })
    },

    profile(userId) {
        return instance
            .get(`profile/` + userId)
    },

}


export const profileAPI = {
    profile(userId) {
        return instance
            .get(`profile/` + userId)
    },
    getStatus(userId){
        return instance
            .get(`profile/status/` + userId)
    },
    updateStatus(status){
        return instance
            .put(`profile/status`, {status})
    },
    savePhoto(photo){
        let formData = new FormData()
        formData.append('image', photo)
        return instance
            .put(`profile/photo/`, formData )
    },
    updateProfile(profileInfo){
        return instance
            .put(`profile`, profileInfo )
    }
}

export const authAPI = {
    auth() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe, captcha) {
        return instance
            .post('auth/login', {email, password, rememberMe, captcha})
    },
    logout(){
        return instance
            .delete('auth/login')
    }
}

export const securityAPI = {
    captcha(){
        return instance.get(`security/get-captcha-url`)
    }
}