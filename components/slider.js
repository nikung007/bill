import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/silder.module.css'

const Slider = () => {
    const [arco, setArco] = useState("")
    const arco_Change = (e) => {
        setArco(e)
    }
    return (
        <div>
            <div className={ `card ${styles.silder_Main}` }>
                <h2>Mor Gems</h2>
                <Link href="/">
                    <div onClick={ () => arco_Change("") }>
                        <h5 className={ `card ${styles.silder_Main_Heading}` } >Dashbord</h5>
                    </div>
                </Link>
                <div className={ `${styles.silder_Arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("master") } className={ `${styles.silder_Arcoding_Heading}` }>
                        <h5>Master</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "master" ?
                            <div className={ `${styles.silder_Arcoding_Button}` }>
                                <div>
                                    <Link href="/master/partymaster">
                                        <button className="link">Party Master</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/master/brokermaster">
                                        <button className="link">Broker Master</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/master/kharchamaster">
                                        <button className="link">Kharcha Master</button>
                                    </Link>
                                </div>
                            </div> : null
                    }

                </div>
                <div className={ `${styles.silder_Arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("transaction") } className={ `${styles.silder_Arcoding_Heading}` }>
                        <h5>Transaction</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "transaction" ?
                            <div className={ `${styles.silder_Arcoding_Button}` }>
                                <div>
                                    <Link href="/transaction/purchase">
                                        <button className="link">Purchase</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/transaction/sell">
                                        <button className="link">Sell</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/transaction/payment-receive">
                                        <button className="link">Payment/Receive</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/transaction/interchange">
                                        <button className="link">Interchange Balance</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/transaction/uchina">
                                        <button className="link">Uchina</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/transaction/uchina-pay-rec">
                                        <button className="link">Uchina-pay-rec</button>
                                    </Link>
                                </div>

                            </div> : null
                    }

                </div>
                <div className={ `${styles.silder_Arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("report") } className={ `${styles.silder_Arcoding_Heading}` }>
                        <h5>Report</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "report" ?
                            <div className={ `${styles.silder_Arcoding_Button}` }>
                                <div>
                                    <Link href="/report/out-standing">
                                        <button className="link">Out Standing</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/report/something-new">
                                        <button className="link">Something</button>
                                    </Link>
                                </div>
                            </div> : null
                    }

                </div>
                <div className={ `${styles.silder_Arcoding_Button_logout}` }>
                    <button className='secondary'>Log Out</button>
                </div>

            </div>
        </div>
    )
}

export default Slider