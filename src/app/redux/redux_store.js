import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import messagesReducer from "./messagesReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import thunk from "redux-thunk";
import appReducer from "./appReducer";
import themeReducer from "./themeReducer";


const reducers = combineReducers({
    profile: profileReducer,
    messages: messagesReducer,
    users: userReducer,
    auth: authReducer,
    theme: themeReducer,
    app: appReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(compose(applyMiddleware(thunk))))
//const store = createStore(reducers, applyMiddleware(thunk));

window.store = store
export default store;