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

// export async function getServerSideProps({ query }) {

//     const getData = JSON.parse(localStorage.getItem("form"));
//     if (getData == "undefined") {
//         localStorage.setItem('name', 'Obaseki Nosa');
//     }
//     console.log(getData)

//     return {
//         props: {
//             "getData": getData,
//             // "login": login
//         },
//     }
// }
export default MyApp