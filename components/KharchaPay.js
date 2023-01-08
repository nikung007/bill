import Link from 'next/link'
import React from 'react'
import Style from '../styles/uchina.module.css'

const KharchaPay = (props) => {

    return (
        <div>
            <section>
                <h1 style={ { margin: "auto" } }>Kharcha Balance</h1>
            </section>
            <section>
                <div className={ `card ${Style.add_fild}` }>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>TransactionDate</label>
                        <input
                            value={ props.kharcha.tdate }
                            name='tdate'
                            onChange={ props.kharcha_change }
                            type="date" />
                        {
                            props.error.tdate ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please enter a date</span>
                                : null
                        }

                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>Kharcha Name</label>
                        <select
                            name='kharchaname'
                            onChange={ props.kharcha_change }
                            value={ props.kharcha.kharchaname }>
                            <option value="">Select</option>
                            {
                                props.party.map((ele, index) => {
                                    return (
                                        <option key={ index } value={ ele }>{ ele }</option>
                                    )
                                })
                            }
                        </select>
                        {
                            props.error.partyname ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please Select Partname</span>
                                : null
                        }

                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>Kharcha Group</label>
                        <input
                            disabled
                            value={ props.kharcha_group }
                            type="text" />

                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>Bank Name</label>
                        <select
                            name='bankname'
                            onChange={ props.kharcha_change }
                            value={ props.kharcha.bankname }
                        >
                            <option value="">Select</option>
                            {
                                props.bank_name.map((ele, index) => {
                                    return (
                                        <option key={ index } value={ ele }>{ ele }</option>
                                    )
                                })
                            }
                        </select>
                        {
                            props.error.bankname ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please Select Bank</span>
                                : null
                        }

                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>Transtion Type</label>
                        <select
                            name='transactiontype'
                            onChange={ props.kharcha_change }
                            value={ props.kharcha.transactiontype }
                        >
                            <option value="">Select bank</option>
                            <option value="Receive">Receive</option>
                            <option value="Payment">Payment</option>
                        </select>
                        {
                            props.error.transactiontype ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please Select Transtion Type</span>
                                : null
                        }
                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label> Amount</label>
                        <input
                            value={ props.kharcha.amount }
                            placeholder='Enter a amount'
                            name='amount'
                            onChange={ props.kharcha_change }
                            type="number" />
                        {
                            props.error.amount ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please enter a Amount</span>
                                : null
                        }
                    </div>
                    <div className={ `${Style.add_all_fild}` }>
                        <label>Remark</label>
                        <input
                            value={ props.kharcha.remark }
                            placeholder='Enter a remark'
                            name='remark'
                            onChange={ props.kharcha_change }
                            type="text" />
                    </div>
                    <div
                        style={ { margin: "0" } }
                        className={ `${Style.add_all_fild}` }>
                        <button
                            onClick={ props.save_data }
                        >{ props.savename }</button>
                        <Link href="/transaction/kharacha/all-kharcha">
                            <button className='secondary'>All List</button>
                        </Link>
                        <Link href="/">
                            <button className='warning'>Close</button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default KharchaPay