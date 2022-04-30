const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_MESSAGE_TEXT = "UPDATE_MESSAGE_TEXT"

let initialState = {
    contactsData: [
        {id: 1, name: "Jhon"},
        {id: 2, name: "Sarah"},
        {id: 3, name: "Peter"},
        {id: 4, name: "Bernard"},
        {id: 5, name: "Anna"},
        {id: 6, name: "Tamara"}
    ],
    messagesData: [
        {id: 1, message: "Hello"},
        {id: 2, message: "Bonjur"},
        {id: 3, message: "Konichiwa"},
        {id: 4, message: "Hola"},
        {id: 5, message: "Guten tag"},
        {id: 6, message: "Nihao"},
    ],
    newMessageText: 'привет'
}

/*
const messagesReducer = (state = initialState, action) => {
    switch (action.type){
        case SEND_MESSAGE:
            let newMessage = {
                id:7,
                message: state.newMessageText
            }
            state.messagesData.push(newMessage);
            state.newMessageText = '';
            return state
        case UPDATE_MESSAGE_TEXT:
            state.newMessageText = action.text;
            return state
        default:
            return state
    }
}
*/

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 7,
                message: state.newMessageText
            }

            return {
                ...state,
                messagesData: [...state.messagesData, newMessage],
                newMessageText: ''
            }
        case UPDATE_MESSAGE_TEXT:

            return {
                ...state,
                newMessageText: action.text
            }
        default:
            return state
    }
}


export const SEND_MESSAGE_ACTION_CREATOR = () => ({type: SEND_MESSAGE})
export const UPDATE_MESSAGE_TEXT_ACTION_CREATOR = (text) => ({type: UPDATE_MESSAGE_TEXT, text: text})


export default messagesReducer;