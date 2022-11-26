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
                     <label className={ `${styles.error_Username}` }>Enter a Username / Valid username</label>
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
                     <label className={ `${styles.error_Password}` } >Enter a Password / Valid password</label>
                     : null
               }
               <div className={ `${styles.log_Button}` }>
                  <button onClick={ props.loginSubmit }>Submit</button>
                  <button className='secondary'>Cancel</button>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Index
