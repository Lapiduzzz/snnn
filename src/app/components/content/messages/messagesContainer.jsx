import React from 'react';
import {connect} from "react-redux";
import Messages from "./messages";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {getIsAuth} from "../../../redux/authSelectors";
import {getContactsData, getMessagesData} from "../../../redux/messagesSelectors";


let mapStateToProps = (state) => {
    return {
        contactsData: getContactsData(state),
        messagesData: getMessagesData(state),
        isAuth: getIsAuth(state)
    }

}

export default compose(connect(mapStateToProps), withAuthRedirect)(Messages)



