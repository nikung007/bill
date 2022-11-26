import React, { useState } from 'react'
import Log_in_Style from '../../styles/login.module.css'

const Index = (props) => {
    return (
        <div>
            <section>
                <div className={ `card ${Log_in_Style.login_main}` }>
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
                    <div className={ `${Log_in_Style.log_button}` }>
                        <button onClick={ props.loginSubmit }>Submit</button>
                        <button className='secondary'>Cancel</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Index
