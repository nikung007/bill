import { useState } from 'react';

import Slider from '../components/slider';
import Login from '../pages/login/index';

import '../styles/globals.css';
import '../styles/uptown.css';

function MyApp({ Component, pageProps }) {

    const [login, setLogin] = useState(0);

    const [logInData, setLogInData] = useState({ username: "", password: "" });
    const [logInError, setLogInError] = useState({ username_error: false, password_error: false, });

    const loginChange = (e) => {
        setLogInData({ ...logInData, [e.target.name]: e.target.value });
        setLogInError({ ...logInError, [`${e.target.name}_error`]: false });
    };

    const loginSubmit = () => {
        if (logInData.username != "" && logInData.password != "") {
            if (logInData.username == "admin" && logInData.password == "1234") {
                setLogin(1);
            }
            else {
                if (logInData.username != "admin") {
                    setLogInError({ ...logInError, username_error: true });
                }
                else if (logInData.password != "1234") {
                    setLogInError({ ...logInError, password_error: true });
                }
            }
        }
        else {
            if (logInData.username == "") {
                setLogInError({ ...logInError, username_error: true });
            }
            else if (logInData.password == "") {
                setLogInError({ ...logInError, password_error: true });
            }
        }
    };

    return (
        <div>
            {
                login == 0
                    ?
                    <Login
                        logInData={ logInData }
                        logInError={ logInError }
                        loginChange={ loginChange }
                        loginSubmit={ loginSubmit }
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
        </div>)
}

export default MyApp