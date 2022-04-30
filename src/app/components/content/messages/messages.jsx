import React from 'react';
import s from "./messages.module.sass";
import Contacts from "./contacts/contacts";
import Message from "./message/message";
import NewMessageContainer from "./new_message/newMessageContainer"


const Messages = (props) => {


    let contactsElement = props.contactsData.map(c => <Contacts id={c.id}
                                                                key={c.id}
                                                                name={c.name}/>);

    let messagesElement = props.messagesData.map(m => <Message message={m.message}
                                                               key={m.id}/>);

        return (
            <div className={s.dialogs}>
                <div className={s.contacts}>
                    {contactsElement}
                </div>
                <div className={s.messages}>
                    {messagesElement}
                </div>
                <div className={s.new_message}>
                    <NewMessageContainer/>
                </div>
            </div>
        )
}


export default Messages;