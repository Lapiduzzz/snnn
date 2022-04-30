import React from 'react'
import {SEND_MESSAGE_ACTION_CREATOR, UPDATE_MESSAGE_TEXT_ACTION_CREATOR} from "../../../../redux/messagesReducer";
import NewMessage from "./newMessage";
import {connect} from "react-redux";
import {getNewMessageText} from "../../../../redux/messagesSelectors";


let mapStateToProps = (state) => {
    return {
        newMessageText: getNewMessageText(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateMessageText: (text) => {
            dispatch(UPDATE_MESSAGE_TEXT_ACTION_CREATOR(text));
        },
        sendMessage: () => {
            dispatch(SEND_MESSAGE_ACTION_CREATOR())
        }
    }
}

const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessage);

export default NewMessageContainer;