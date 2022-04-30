import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import s from "./login.module.sass"
import {Redirect} from "react-router-dom";


const Login = (props) => {

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            remember: false,
            captcha: ''
        },
        validationSchema: Yup.object({
            login: Yup.string().email('Must be a valid email')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: formData => props.login(formData.login, formData.password, formData.remember, formData.captcha)
    })

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div>
            <form className={s.form} onSubmit={formik.handleSubmit}>
                <label htmlFor="login">Login</label>
                <input id="login"
                       name="login"
                       type="text"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.login}
                       className={formik.touched.login && formik.errors.login ? s.errorsBorder : null}
                />
                {formik.touched.login && formik.errors.login
                    ? (<div className={s.errors}>{formik.errors.login}</div>)
                    : null}
                <label htmlFor="password">Password</label>
                <input id="password"
                       name="password"
                       type="password"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.password}
                       className={formik.touched.password && formik.errors.password ? s.errorsBorder : null}

                />
                {formik.touched.password && formik.errors.password
                    ? (<div className={s.errors}>{formik.errors.password}</div>)
                    : null}
                <div className={s.remem}>
                    <label htmlFor="remember">Remember me</label>
                    <input id="remember"
                           name="remember"
                           type='checkbox'
                           onChange={formik.handleChange}
                           value={formik.values.remember}
                    />
                </div>
                {props.captchaURL ? <img className={s.captcha} src={props.captchaURL}/> : null}
                {props.captchaURL && <input {...formik.getFieldProps('captcha')}/>}
                <div className={`${s.errors} ${s.messages}`}>{props.messages}</div>
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}




export default Login;