import Link from 'next/link'
import React from 'react'
import Pay_Rec_Style from '../styles/paymentReceive.module.css'

const Uchina_pay_rec = (props) => {
    return (
        <div>
            {
                props.show_data ?
                    <div className={ `${Pay_Rec_Style.sell_list}` }>
                        <article>
                            <h2 style={ { color: "white" } }>Lot List</h2>
                            <table style={ { width: "80%", margin: "auto" } }>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Uchina Date</th>
                                        <th>Party Name</th>
                                        <th>Amount</th>
                                        <th>Receive</th>
                                        <th>Outstanding</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.all_invoice.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.u_id }</td>
                                                    <td>{ ele.tdate.split("T")[0] }</td>
                                                    <td>{ ele.partyname }</td>
                                                    <td>{ ele.amount }</td>
                                                    <td>{ ele.receive_amount }</td>
                                                    <td>{ ele.outstanding_amount }</td>
                                                    <td><input
                                                        name='Radio'
                                                        onChange={ (e) => props.radio_value(e, ele.u_id) }
                                                        defaultChecked={ ele.check }
                                                        type="radio" /></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </article>
                        <div className={ `${Pay_Rec_Style.lot_save_cansal}` }>
                            <button
                                onClick={ props.click_cansal }
                                className='warning'>Close</button>
                        </div>
                    </div>
                    : null
            }
            <section>
                <div className={ `card ${Pay_Rec_Style.pay_rec_heading}` }>
                    <h4> {/* props.name */ } Uchina Receive Form</h4>
                    <article>
                        <div className={ `column three` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds_pyrc}` }>
                                <label style={ { width: "80%" } }>Transtion Type</label>
                                <select
                                    value={ props.party_rec.transition }
                                    name='transition'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select</option>
                                    <option value="Receive">Receive</option>
                                    <option value="Payment">Payment</option>
                                </select>
                            </div>
                            { props.error_payrec.extra ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `column four` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label style={ { width: "80%" } }>Party Name</label>
                                <select
                                    value={ props.party_rec.party_name }
                                    style={ { width: "160%" } }
                                    name='party_name'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select Party Name</option>
                                    {
                                        props.part_list.map((ele, index) => {
                                            return (
                                                <option key={ index } value={ ele }>{ ele }</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            { props.error_payrec.party_name ? <label style={ { color: "red", marginLeft: "110px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `${Pay_Rec_Style.show_button_pyrec}` }>
                            <button
                                onClick={ props.click_show }
                                className='warning'>Show Uchina List</button>
                        </div>
                    </article>
                    <article>

                    </article>
                    <hr />
                    <article>
                        {
                            props.show_invoice ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Uchina Date</th>
                                            <th>Party Name</th>
                                            <th>Amount</th>
                                            <th>Receive</th>
                                            <th>Outstanding</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ props.invoice_selected.u_id }</td>
                                            <td>{ props.invoice_selected.tdate.split("T")[0] }</td>
                                            <td>{ props.invoice_selected.partyname }</td>
                                            <td>{ props.invoice_selected.amount }</td>
                                            <td>{ props.invoice_selected.receive_amount }</td>
                                            <td>{ props.invoice_selected.outstanding_amount }</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                        }
                    </article>
                    <hr />
                    <article style={ { marginBottom: "0px !important" } }>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Transation Date</label>
                                <input
                                    name='tdate'
                                    onChange={ props.trans_change }
                                    value={ props.trans_data.tdate }
                                    type="date" />
                                { props.error_tdata.tdate ? <span style={ { color: "red", position: "absolute" } }>Date select</span> : null }
                            </div>
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Bank</label>
                                <select
                                    name='bank'
                                    onChange={ props.trans_change }
                                    value={ props.trans_data.bank }
                                >
                                    <option value="">Select</option>
                                    <option value="100000">Dhiram</option>
                                    <option value="200000">Dhiram1</option>
                                    <option value="300000">Dhiram2</option>
                                    <option value="400000">Dhiram3</option>
                                </select>
                                { props.error_tdata.bank ? <span style={ { color: "red", position: "absolute" } }>Bank select</span> : null }
                            </div>
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Bank Balance</label>
                                <input
                                    value={ props.trans_data.bank }
                                    disabled
                                    type="text" />
                            </div>
                            { props.error_bank.b_error ? <label style={ { color: "red", position: "absolute" } }>Invalid Bank Amount</label> : null }
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Transation Type</label>
                                <input
                                    value={ props.transationtype }
                                    disabled
                                    type="text" />
                            </div>
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Transation Amount</label>
                                <input
                                    name='tamount'
                                    onChange={ props.trans_change }
                                    value={ props.trans_data.tamount }
                                    type="number" />
                            </div>
                            { props.error_tdata.tamount ? <span style={ { color: "red" } }>Fill Amonut</span> : null }
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Total Amount</label>
                                <input
                                    value={ props.invoice_selected.outstanding_amount }
                                    disabled
                                    type="number" />
                            </div>
                        </div>
                    </article>
                    <article>
                        <div className={ `column two ${Pay_Rec_Style.button_submit}` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <button
                                    onClick={ props.save_data }>Save</button>
                            </div>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <Link href="/">
                                    <button className='secondary'>Close</button>
                                </Link>
                            </div>
                        </div>

                        <div className={ `column two` }></div>
                        <div className={ `column two` }></div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Total carat</label>
                                <input
                                    value={ props.invoice_selected.total_carat }
                                    disabled
                                    type="number" />
                            </div>
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Outstanding Amount</label>
                                <input
                                    value={ props.o_amount }
                                    disabled
                                    type="number" />
                            </div>
                            { props.error_bank.o_error ? <label style={ { color: "red", position: "absolute" } }>Invalid Transation Amount</label> : null }
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>no</label>
                                <input
                                    disabled
                                    type="number" />
                            </div>
                        </div>
                    </article>
                    <hr />
                    <article>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Party Name</th>
                                    <th>Transtion Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.payrec_data.map((ele, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>{ ele.u_id }</td>
                                                <td>{ ele.partyname }</td>
                                                <td>{ ele.tdate.split("T")[0] }</td>
                                                <td>{ ele.amount }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </article>
                    <div className={ `${Pay_Rec_Style.delete_invoice}` }>
                        <button onClick={ props.click_delte } className='warning'>All Delete</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Uchina_pay_rec