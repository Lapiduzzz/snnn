import React from 'react';
import {connect} from "react-redux";
import {
    getStatusThunkCreator,
    savePhotoThunkCreator, updateProfileThunkCreator,
    updateStatusThunkCreator,
    usersProfileThunkCreator
} from "../../../redux/profileReducer";
import Profile from "./profile";
import {Redirect, withRouter} from 'react-router-dom'
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getStatus, getUserProfile} from "../../../redux/profileSelectors";
import {getAuthorizedUserId, getIsAuth} from "../../../redux/authSelectors";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId){
                return <Redirect to={'/login'}/>
            }
        }
        this.props.setUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            let userId = this.props.match.params.userId
            if (!userId) {
                userId = this.props.authorizedUserId
                if (!userId) {
                    return <Redirect to={'/login'}/>
                }
            }
            this.props.setUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props} userProfile={this.props.userProfile} isOwner={!this.props.match.params.userId}
                savePhoto={this.props.savePhoto} updateProfile={this.props.updateProfile}/>
            </div>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        userProfile: getUserProfile(state),
        status: getStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getIsAuth(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUserProfile: (userId) => {
            dispatch(usersProfileThunkCreator(userId))
        },
        getStatus: (userId) =>{
            dispatch(getStatusThunkCreator(userId))
        },
        updateStatus: (status) => {
            dispatch(updateStatusThunkCreator(status))
        },
        savePhoto: (photo) =>{
            dispatch(savePhotoThunkCreator(photo))
        },
        updateProfile: (profile) =>{
            dispatch(updateProfileThunkCreator(profile))
        },


    }
}


/*let authRedirectComponents = withAuthRedirect(ProfileContainer)

let UrlDataContainerComponents = withRouter(authRedirectComponents )

let profileContainer = connect(mapStateToProps, mapDispatchToProps)(UrlDataContainerComponents)
export default profileContainer;
*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect)(ProfileContainer)