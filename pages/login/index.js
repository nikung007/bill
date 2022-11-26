import React, { useState } from 'react'
import styles from '../../styles/login.module.css'

const Index = (props) => {
    return (
        <div>
            <section>
                <div className={ `card ${styles.login_Main}` }>
                    <h1>Log In</h1>
                    <label>Username</label>
                    <input
                        name='username'
                        value={ props.logInData.username }
                        onChange={ props.loginChange }
                        type="text" />
                    {
                        props.logInError.username_error ?
                            <label style={ { color: "red", top: "240px" } }>Enter a Username / Valid username</label>
                            : null
                    }
                    <label>Password</label>
                    <input
                        name='password'
                        value={ props.logInData.password }
                        onChange={ props.loginChange }
                        type="password" />
                    {
                        props.logInError.password_error ?
                            <label style={ { color: "red", top: "320px" } }>Enter a Password / Valid password</label>
                            : null
                    }
                    <div className={ `${styles.log_button}` }>
                        <button onClick={ props.loginSubmit }>Submit</button>
                        <button className='secondary'>Cancel</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Index
