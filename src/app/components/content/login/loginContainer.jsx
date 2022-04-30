import React from "react";
import Login from "./login";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../../redux/authReducer";
import {getCaptchaUrl, getErrorMessages, getIsAuth} from "../../../redux/authSelectors";


class LoginContainer extends React.Component {
    render() {
        return <Login {...this.props} login={this.props.loginThunkCreator}/>

    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        messages: getErrorMessages(state),
        captchaURL: getCaptchaUrl(state)
}
}


export default connect(mapStateToProps, {loginThunkCreator})(LoginContainer)