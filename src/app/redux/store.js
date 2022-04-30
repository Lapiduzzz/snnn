import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";

const store = {
    _state : {
        profile: {
            postsData : [
                {id:1, name: "Jhon Smith", message:"Hello, it's my first post", likeCount: 5},
                {id:2, name: "Jhon Smith", message:"i'm learning React", likeCount: 2},
                {id:3, name: "Jhon Smith", message:"React it's so cool", likeCount: 10},
                {id:4, name: "Jhon Smith", message:"React.js and React Native are popular open source platforms for developing user interfaces (UIs); both rank well for desirability and use in StackOverflow's 2019 Developer Survey. React.js was developed by Facebook in 2011 as a JavaScript library to address the need for cross-platform, dynamic, and high-performing UIs, while React Native, which Facebook released in 2015, is used for building native applications using JavaScript.", likeCount: 15}
            ],
            newPostText : ""
        },
        messages: {
            contactsData: [
                {id: 1, name: "Jhon"},
                {id: 2, name: "Sarah"},
                {id: 3, name: "Peter"},
                {id: 4, name: "Bernard"},
                {id: 5, name: "Anna"},
                {id: 6, name: "Tamara"}
            ],
            messagesData: [
                {id:1, message: "Hello"},
                {id:2, message: "Bonjur"},
                {id:3, message: "Konichiwa"},
                {id:4, message: "Hola"},
                {id:5, message: "Guten tag"},
                {id:6, message: "Nihao"},
            ],
            newMessageText: 'привет'
        }
    },
    _callSubscriber(){},
    getState() {
        return this._state;
    },

    dispatch(action){
        this._state.profile = profileReducer(this._state.profile, action)
        this._state.messages = messagesReducer(this._state.messages, action)
        this._callSubscriber(this._state);

    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
}

window.state = store._state

export default store;