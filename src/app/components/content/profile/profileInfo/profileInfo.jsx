import React, {useState} from "react"
import s from './profileInfo.module.sass'
import PreLoader from "../../../common/preloader/preLoader";
import userPhoto from "../../../../../assests/ava.png"
import ProfileStatus from "./profileStatus";
import edit from "../../../../../assests/pen.png"
import ProfileDescription from "./ProfileDescription";
import ProfileEdit from "./ProfileEdit";
import upload from '../../../../../assests/upload.png'

const ProfileInfo = (props) => {

    const [avaActive, setAvaActive] = useState(false)
    const [editButton, setEditButton] = useState(false)
    const [editMode, setEditMode] = useState(false)



    if(!props.userProfile){
        return <PreLoader/>
    }

    const onAvatarSelected = (e) =>{
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    return(

        <div className={s.profile_info}>
            <div className={s.back_img}>
                <div className={s.status_block}>
                    <ProfileStatus status ={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>
                </div>
                <img className={s.img_back} src="https://imgcomfort.com/Userfiles/Upload/images/illustration-geiranger.jpg"
                   // onClick={()=>{return <input className={s.avaSelected} type={'file'} onChange={onAvatarSelected}/> }}
                />
            </div>
            <div className={s.infoBlock}
                 onMouseOver={()=>{setEditButton(true)}}
                 onMouseLeave={()=>{setEditButton(false)}}>
                <div>
                    {props.isOwner && avaActive
                        ?<label className={s.avaSelectedWrapper}
                                onMouseLeave={()=>{setAvaActive(false)}}>
                            <img src={upload}/>
                            <input className={s.avaSelected} type={'file'} onChange={onAvatarSelected}/>
                        </label>
                        :<img className={s.img_profile}
                              onMouseOver={()=>{setAvaActive(true)}}
                              src={props.userProfile.photos.large != null ? props.userProfile.photos.large : userPhoto} />}
                </div>
                {props.isOwner && editButton
                    ? <img className={s.editIcon} src={edit} onClick={()=>{setEditMode(true)}}/>
                    : null}
                {!editMode ?<p><b>{props.userProfile.fullName}</b></p> :null}
                {props.isOwner && editMode
                    ?<ProfileEdit {...props} setEditMode={setEditMode}/>
                    :<ProfileDescription {...props}/>
                }
            </div>
        </div>
    )
}






export default ProfileInfo;