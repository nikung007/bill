import Link from 'next/link'
import React, { useState } from 'react'
import Silder_Style from '../styles/silder.module.css'

const Slider = () => {
    const [arco, setArco] = useState("")
    const arco_Change = (e) => {
        setArco(e)
    }
    return (
        <div>
            <div className={ `card ${Silder_Style.silder_main}` }>
                <h2>Mor Gems</h2>
                <Link href="/">
                    <div onClick={ () => arco_Change("") }>
                        <h5 style={ { margin: "5px 0 5px 12px", cursor: "pointer", textAlign: "left" } }>Dashbord</h5>
                    </div>
                </Link>
                <div className={ `${Silder_Style.silder_arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("master") } className={ `${Silder_Style.silder_arcoding_heading}` }>
                        <h5>Master</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "master" ?
                            <div className={ `${Silder_Style.silder_arcoding_button}` }>
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
                <div className={ `${Silder_Style.silder_arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("transaction") } className={ `${Silder_Style.silder_arcoding_heading}` }>
                        <h5>Transaction</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "transaction" ?
                            <div className={ `${Silder_Style.silder_arcoding_button}` }>
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
                                    <Link href="/transaction/all-uchina-pay-rec">
                                        <button className="link">All-Uchina-pay-rec</button>
                                    </Link>
                                </div>

                            </div> : null
                    }

                </div>
                <div className={ `${Silder_Style.silder_arcoding}` }>
                    <hr style={ { margin: "auto" } } />
                    <div onClick={ () => arco_Change("report") } className={ `${Silder_Style.silder_arcoding_heading}` }>
                        <h5>Report</h5>
                        <i style={ { transform: "rotate(270deg)" } } className="icon-prev"></i>
                    </div>
                    <hr style={ { margin: "auto" } } />
                    {
                        arco == "report" ?
                            <div className={ `${Silder_Style.silder_arcoding_button}` }>
                                <div>
                                    <Link href="/report/out-standing">
                                        <button className="link">Out Standing</button>
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/report/all-uchina">
                                        <button className="link">All Uchina</button>
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
                <div className={ `${Silder_Style.silder_arcoding_button_logout}` }>
                    <button className='secondary'>Log Out</button>
                </div>

            </div>
        </div>
    )
}

export default Slider