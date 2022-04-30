import React from "react";
import s from './profileInfo.module.sass'
import pen from './../../../../../assests/pen.png'

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    activateEditMode = () =>{
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () =>{
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onChangeStatus = (e) =>{
        this.setState(
            {
                status: e.currentTarget.value
            }
        )
    }
    handleFocus = (e) => {
        e.target.select()
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <input
                        autoFocus={true}
                        onFocus={this.handleFocus}
                        onBlur={this.deactivateEditMode}
                        onChange={this.onChangeStatus}
                        className={s.status}
                        value={this.state.status}/>
                    : this.props.isOwner
                        ? <p onDoubleClick={this.activateEditMode}> {this.props.status || <img src={pen}/>} </p>
                        : this.props.status && <p> {this.props.status }</p>
                }
            </div>
        )
    }
}

export default ProfileStatus;