import React from "react";
import Header from "./header";
import {connect} from "react-redux";
import {logoutThunkCreator} from "../../redux/authReducer";
import {CHANGE_THEME_ACTION_CREATOR} from "../../redux/themeReducer";


class HeaderAPIContainer extends React.Component {

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userProfile: state.profile.userProfile
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        logout: ()=>{
            dispatch(logoutThunkCreator())
        },
        changeTheme: (theme)=>{
            dispatch(CHANGE_THEME_ACTION_CREATOR(theme))
        }
    }
}

let HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(HeaderAPIContainer)

export default HeaderContainer;