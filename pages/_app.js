import Head from 'next/head'
import { useState } from 'react'
import Slider from '../components/slider'
import Login from '../pages/login/index'
import '../styles/globals.css'
import '../styles/uptown.css'

function MyApp({ Component, pageProps }) {

    const [login, setLogin] = useState(0)

    const [log_In_data, setLog_In_data] = useState({
        username: "",
        password: ""
    })
    const [log_in_error, setLog_in_error] = useState({
        username_error: false,
        password_error: false,
    })
    const logIn_change = (e) => {
        setLog_In_data({ ...log_In_data, [e.target.name]: e.target.value })
        setLog_in_error({ ...log_in_error, [`${e.target.name}_error`]: false })
    }
    const log_In_submit = () => {
        if (log_In_data.username != "" && log_In_data.password != "") {
            if (log_In_data.username == "admin" && log_In_data.password == "1234") {
                // alert("Log In Succsesful")
                setLogin(1)
            }
            else {
                if (log_In_data.username != "admin") {
                    setLog_in_error({ ...log_in_error, username_error: true })
                }
                else if (log_In_data.password != "1234") {
                    setLog_in_error({ ...log_in_error, password_error: true })
                }
            }
        }
        else {
            if (log_In_data.username == "") {
                setLog_in_error({ ...log_in_error, username_error: true })
            }
            else if (log_In_data.password == "") {
                setLog_in_error({ ...log_in_error, password_error: true })
            }
        }
    }
    return (
        <div>
            <Head>
                <title>Mor-Infotech</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {
                login == 0
                    ?
                    <Login
                        log_In_data={ log_In_data }
                        log_in_error={ log_in_error }
                        logIn_change={ logIn_change }
                        log_In_submit={ log_In_submit }
                    />
                    :
                    <div>
                        <div className="columns two">
                            <Slider />
                        </div>
                        <div className="columns ten">
                            <Component { ...pageProps } />
                        </div>
                    </div>
            }
        </div>
    )
}

export default MyApp