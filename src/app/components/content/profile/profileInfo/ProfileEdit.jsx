import {useFormik} from "formik";
import * as Yup from "yup";
import s from "./profileInfo.module.sass";
import React from "react";

const ProfileEdit = (props) => {

    let reset = () => {
        props.setEditMode(false)
    }

    const formik = useFormik({
        initialValues : {
            fullName: props.userProfile.fullName,
            aboutMe: props.userProfile.aboutMe,
            lookingForAJob: props.userProfile.lookingForAJob,
            lookingForAJobDescription: props.userProfile.lookingForAJobDescription,
            contacts: {
                github: props.userProfile.contacts.github,
                facebook: props.userProfile.contacts.facebook,
                vk: props.userProfile.contacts.vk,
                instagram: props.userProfile.contacts.instagram,
                twitter: props.userProfile.contacts.twitter,
                youtube: props.userProfile.contacts.youtube,
                website: props.userProfile.contacts.website,
                mainLink: props.userProfile.contacts.mainLink
            }
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(4, 'Too short!')
                .max(20, 'Too long!')
                .required('Required'),
            aboutMe: Yup.string()
                .max(400, 'Too long!')
                .required('Required'),
            lookingForAJobDescription: Yup.string()
                .max(200, 'Too long!')
                .required('Required'),
            contacts: Yup.object({
                github: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                facebook: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                vk: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                instagram: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                twitter: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                youtube: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                website: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    ),
                mainLink: Yup.string()
                    .matches(
                        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                        'Enter correct url!'
                    )
            })
        }),
        onSubmit:  async (formData,) => {
            await props.updateProfile(formData)
            debugger
            props.setEditMode(false)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.info}>
                    <p><input {...formik.getFieldProps('fullName')}
                              placeholder='FullName'
                              className={`${s.inputForm} ${s.fullname}`}/></p>
                    {formik.errors.fullName ?<p className={s.errors}>{formik.errors.fullName}</p> :null}

                </div>
                <div className={s.info}>
                    <p><input {...formik.getFieldProps('aboutMe')}
                              placeholder='About Me'
                              className={`${s.inputForm} ${s.aboutMe}`}/></p>
                    {formik.errors.aboutMe ?<p className={s.errors}>{formik.errors.aboutMe}</p> :null}
                </div>
                <div className={s.info}>
                    <p><input {...formik.getFieldProps('lookingForAJobDescription')}
                              placeholder='Professional Skills'
                              className={`${s.inputForm} ${s.skills}`}/></p>
                    {formik.errors.lookingForAJobDescription ?<p className={s.errors}>{formik.errors.lookingForAJobDescription}</p> :null}
                </div>
                <div className={s.lookingJob}> Looking for a job: <input type='checkbox'
                                                                         {...formik.getFieldProps('lookingForAJob')}
                                                                         checked={formik.values.lookingForAJob}/>
                </div>
                <div className={s.contacts}>
                    <div className={s.contactsItem}>GitHub:
                        <input {...formik.getFieldProps('contacts.github')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.github}</p> :null}
                    </div>
                    <div className={s.contactsItem}>Facebook:
                        <input {...formik.getFieldProps('contacts.facebook')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.facebook}</p> :null}
                    </div>
                    <div className={s.contactsItem}>Vk:
                        <input {...formik.getFieldProps('contacts.vk')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.vk}</p> :null}
                    </div>
                    <div className={s.contactsItem}>Instagram:
                        <input {...formik.getFieldProps('contacts.instagram')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.instagram}</p> :null}
                    </div>
                    <div className={s.contactsItem}>Twitter:
                        <input {...formik.getFieldProps('contacts.twitter')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.twitter}</p> :null}
                    </div>
                    <div className={s.contactsItem}>YouTube:
                        <input {...formik.getFieldProps('contacts.youtube')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.youtube}</p> :null}
                    </div>
                    <div className={s.contactsItem}>WebSite:
                        <input {...formik.getFieldProps('contacts.website')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.website}</p> :null}
                    </div>
                    <div className={s.contactsItem}>MainLink:
                        <input {...formik.getFieldProps('contacts.mainLink')} className={s.contactsItemForm}/>
                        {formik.errors.contacts ?<p className={s.errorsSmall}>{formik.errors.contacts.mainLink}</p> :null}
                    </div>
                </div>
                <div className={s.buttons}>
                    <button className={s.submit} type='submit'>✔</button>
                    <button className={`${s.submit} ${s.exit}`} onClick={reset}>✘</button>
                </div>
            </form>
        </div>
    )
}


export default ProfileEdit;