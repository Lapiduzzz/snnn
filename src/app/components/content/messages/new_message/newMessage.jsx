import React from 'react'
import s from './newMessage.module.sass'




const NewMessage = (props) => {


    let updateMessageText = (e) => {
        let text = e.target.value;
        props.updateMessageText(text)
    }

    let sendMessage = (e) => {
        e.preventDefault();
        props.sendMessage();
    }

    return(
        <div>
            <form className={s.form}>
                <textarea className={s.new_message} placeholder='New message'
                          value={props.newMessageText} onChange={updateMessageText}/>
                <button className={s.button} onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default NewMessage;