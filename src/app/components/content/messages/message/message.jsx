import React from 'react';
import s from './message.module.sass';

const Message = (props) =>{
    return(
        <div>
            <div className={s.message_text}>{props.message}</div>
        </div>
    )
}

export default Message;