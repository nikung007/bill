import Link from 'next/link'
import React from 'react'
import Payment_Style from '../styles/interchange.module.css'
const Inter_change = (props) => {
    const { interchange, interchange_change, save_data, interchange_error, bank } = props
    return (
        <div>
            <section>
                <h1 style={ { margin: "auto" } }>Interchange Balance</h1>
            </section>
            <section>
                <div className={ `card ${Payment_Style.add_fild}` }>
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label>TransactionDate</label>
                        <input
                            value={ interchange.date_today }
                            name='date_today'
                            onChange={ interchange_change }
                            type="date" />
                        {
                            interchange_error.date_today ?
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
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label>FromBank</label>
                        <select
                            name='pay_bank'
                            onChange={ interchange_change }
                            value={ interchange.pay_bank }>
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
                            interchange_error.pay_bank ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please enter a Payment Bank Name</span>
                                : null
                        }

                    </div>
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label>ToBank</label>
                        <select
                            name='rec_bank'
                            onChange={ interchange_change }
                            value={ interchange.rec_bank }
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
                            interchange_error.rec_bank ?
                                <span style={ {
                                    display: "flex",
                                    justifyContent: "center",
                                    position: "absolute",
                                    color: "red",
                                    left: "40%",
                                    top: "100%"
                                } }>Please enter a Receive Bank Name</span>
                                : null
                        }

                    </div>
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label> Amount</label>
                        <input
                            value={ interchange.pay_amount }
                            placeholder='Enter a amount'
                            name='pay_amount'
                            onChange={ interchange_change }
                            type="number" />
                        {
                            interchange_error.pay_amount ?
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
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label>To Amount</label>
                        <input
                            disabled
                            value={ interchange.rec_amount }
                            placeholder='Automatically value'
                            name='rec_amount'
                            onChange={ interchange_change }
                            type="number" />
                    </div>
                    <div className={ `${Payment_Style.add_all_fild}` }>
                        <label>Remark</label>
                        <input
                            value={ interchange.remark }
                            placeholder='Enter a remark'
                            name='remark'
                            onChange={ interchange_change }
                            type="text" />
                    </div>
                    <div
                        style={ { margin: "0" } }
                        className={ `${Payment_Style.add_all_fild}` }>
                        <button onClick={ save_data }>Save</button>
                        <Link href="/transaction/interchange/allinterchange">
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

export default Inter_change
