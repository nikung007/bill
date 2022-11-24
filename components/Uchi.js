import Link from 'next/link'
import React from 'react'
import Uchina_Style from '../styles/uchina.module.css'

const Uchi = (props) => {

    return (
        <div>
            <section>
                <h1 style={ { margin: "auto" } }>Uchina Balance</h1>
            </section>
            <section>
                <div className={ `card ${Uchina_Style.add_fild}` }>
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label>TransactionDate</label>
                        <input
                            value={ props.uchina.tdate }
                            name='tdate'
                            onChange={ props.uchina_change }
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
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label>Party Name</label>
                        <select
                            name='partyname'
                            onChange={ props.uchina_change }
                            value={ props.uchina.partyname }
                        >
                            <option value="">Select bank</option>
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
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label>Bank Name</label>
                        <select
                            name='bankname'
                            onChange={ props.uchina_change }
                            value={ props.uchina.bankname }
                        >
                            <option value="">Select bank</option>
                            {
                                props.bank.map((ele, index) => {
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
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label>Transtion Type</label>
                        <select
                            name='transactiontype'
                            onChange={ props.uchina_change }
                            value={ props.uchina.transactiontype }
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
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label> Amount</label>
                        <input
                            value={ props.uchina.amount }
                            placeholder='Enter a amount'
                            name='amount'
                            onChange={ props.uchina_change }
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
                    <div className={ `${Uchina_Style.add_all_fild}` }>
                        <label>Remark</label>
                        <input
                            value={ props.uchina.remark }
                            placeholder='Enter a remark'
                            name='remark'
                            onChange={ props.uchina_change }
                            type="text" />
                    </div>
                    <div
                        style={ { margin: "0" } }
                        className={ `${Uchina_Style.add_all_fild}` }>
                        <button
                            onClick={ props.save_data }
                        >Save</button>
                        <Link href="/transaction/uchina/alluchina">
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

export default Uchi