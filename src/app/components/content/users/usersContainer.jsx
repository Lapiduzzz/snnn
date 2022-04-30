import React from "react";
import {connect} from "react-redux";
import {
    SET_CURRENT_PAGE_ACTION_CREATOR,
    getUsersThunkCreator,
    FollowUserThunkCreator,
    unfollowUserThunkCreator
} from "../../../redux/userReducer";
import User from "./user/user";
import {
    getCurrentPage, getFollowingProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersData
} from "../../../redux/usersSelectors";


class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }


    render = () => {
        return (
            <div>
                <User
                    {...this.props} onPageChanged={this.onPageChanged}
                />
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)


    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (id) => {
            dispatch(FollowUserThunkCreator(id))
        },
        unfollowUser: (id) => {
            dispatch(unfollowUserThunkCreator(id))
        },
        getUsers: (currentPage, pageSize) => {
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        },
        setCurrentPage: (currentPage) => {
            dispatch(SET_CURRENT_PAGE_ACTION_CREATOR(currentPage))
        }
    }
}


let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent)
export default UsersContainer;