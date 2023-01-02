import Link from 'next/link'
import React, { useState } from 'react'
import style from '../styles/silder.module.css'

const Slider = (props) => {

    return (
        <div className={ `${style.main_nav}` }>
            <div className={ `${style.bg_dark}` }>
                <div className={ `${style.bg_dark} ${style.flex}` }>
                    <nav>
                        <ul className={ `${style.main_menu}` }>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <a href="#">Master</a>
                                <ul className={ `${style.sub_menu}` }>
                                    <li>
                                        <Link href="/master/partymaster">
                                            Party Master
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/master/brokermaster">
                                            Broker Master
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/master/kharchamaster">
                                            Kharcha Master
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Transaction</a>
                                <ul style={ { width: "215px" } } className={ `${style.sub_menu}` }>
                                    <li>
                                        <Link href="/transaction/purchase">
                                            Purchase
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/sell">
                                            Sell
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/payment-receive">
                                            Payment/Receive
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/interchange">
                                            Interchange Balance
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/uchina">
                                            Uchina
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/all-uchina-pay-rec">
                                            All-Uchina-pay-rec
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/transaction/kharacha">
                                            Kharacha
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Report </a>
                                <ul className={ `${style.sub_menu}` }>
                                    <li>
                                        <Link href="/report/out-standing">
                                            Out Standing
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/report/all-uchina">
                                            All Uchina
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/report/something-new">
                                            Something
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <button onClick={ props.close_menu } className='warning' style={ { margin: "5px 10px 0 0", height: "40px" } }>Log Out</button>
                </div>
            </div>
        </div>
    )
}

export default Slider