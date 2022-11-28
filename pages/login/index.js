import React from 'react'
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
                        value={ props.log_In_data.username }
                        onChange={ props.logIn_change }
                        type="text" />
                    {
                        props.log_in_error.username_error ?
                            <label style={ { color: "red", top: "240px" } }>Enter a Username / Valid username</label>
                            : null
                    }
                    <label>Password</label>
                    <input
                        name='password'
                        value={ props.log_In_data.password }
                        onChange={ props.logIn_change }
                        type="password" />
                    {
                        props.log_in_error.password_error ?
                            <label style={ { color: "red", top: "320px" } }>Enter a Password / Valid password</label>
                            : null
                    }
                    <div className={ `${Log_in_Style.log_button}` }>
                        <button onClick={ props.log_In_submit }>Submit</button>
                        <button className='secondary'>Cancel</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Index
