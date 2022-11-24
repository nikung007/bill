// import { useState } from 'react'
import Slider from '../components/slider'
// import Login from './login/index'
import '../styles/globals.css'
import '../styles/uptown.css'

function MyApp({ Component, pageProps }) {

    return (
        <div>
            <div>
                <div className="columns two">
                    <Slider />
                </div>
                <div className="columns ten">
                    <Component { ...pageProps } />
                </div>
            </div>

        </div>)
}
export default MyApp