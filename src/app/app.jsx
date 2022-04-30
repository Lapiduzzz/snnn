import React, {Suspense, useEffect} from 'react';
import {Route} from "react-router-dom";
import '/src/style/style.sass';
import {connect} from "react-redux";
import Sidebar from "./components/sidebar/sidebar";
import Footer from "./components/footer/footer";
import HeaderContainer from "./components/header/headerContainer";
import {initializedThunkCreator} from "./redux/appReducer";
import PreLoader from "./components/common/preloader/preLoader";
const Profile = React.lazy(()=> import("./components/content/profile/profileContaier"))
const Messages = React.lazy(()=> import("./components/content/messages/messagesContainer"))
const Users = React.lazy(()=> import("./components/content/users/usersContainer"))
const Login= React.lazy(()=> import("./components/content/login/loginContainer"))


const App = (props) => {

    useEffect(()=>{
        props.initialized()
    }, [])

    if (!props.initialize){
        return <PreLoader/>
    }
    else return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Sidebar/>
            <div className='content'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path='/profile/:userId?'
                           render={() => <Profile/>}/>
                    <Route path='/messages'
                           render={() => <Messages/>}/>
                    <Route path='/users'
                           render={() => <Users/>}/>
                    <Route path='/login'
                           render={() => <Login/>}/>
                </Suspense>
            </div>
            <Footer/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
    initialize: state.app.initialized
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initialized: () => {
            dispatch(initializedThunkCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


