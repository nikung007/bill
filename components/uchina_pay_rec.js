import Link from 'next/link'
import React from 'react'
import Pay_Rec_Style from '../styles/paymentReceive.module.css'

const Uchina_pay_rec = (props) => {
    return (
        <div className={ `${Pay_Rec_Style.delete_main}` }>
            {
                props.pop_delete ?
                    <div className={ `${Pay_Rec_Style.delete}` }>
                        <h1>Are you sure delete ?</h1>
                        <div className={ `${Pay_Rec_Style.delete_button}` }>
                            <button className='secondary' onClick={ props.close_del }>
                                Cancel
                            </button>
                            <button className='warning' onClick={ () => props.click_delte() }>
                                Conform
                            </button>
                        </div>
                    </div>
                    : null
            }
            {
                props.show_data == true && props.party_rec.alluchinapayrec == "guchina" ?
                    <div className={ `${Pay_Rec_Style.sell_list}` }>
                        <article>
                            <h2 style={ { color: "white" } }>Lot List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Partyname</th>
                                        <th>T-Date</th>
                                        <th>T-type</th>
                                        <th>R-Amount</th>
                                        <th>Bankname</th>
                                        <th>Amount</th>
                                        <th>O-amount</th>
                                        <th>Remark</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.all_invoice.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.u_id }</td>
                                                    <td>{ ele.partyname }</td>
                                                    <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.receive_amount }</td>
                                                    <td>{ ele.bankname }</td>
                                                    <td>{ ele.amount }</td>
                                                    <td>{ ele.outstanding_amount }</td>
                                                    <td>{ ele.remark }</td>
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
                    </div> : null
            }
            {
                props.show_data == true && props.party_rec.alluchinapayrec == "tuchina" ?
                    <div className={ `${Pay_Rec_Style.sell_list}` }>
                        <article>
                            <h2 style={ { color: "white" } }>Lot List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Partyname</th>
                                        <th>T-type</th>
                                        <th>R-Amount</th>
                                        <th>O-amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.all_invoice.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.t_id }</td>
                                                    <td>{ ele.buypartyname }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.recamount }</td>
                                                    <td>{ ele.outstandingamount }</td>
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
            {
                props.show_data == true && props.party_rec.alluchinapayrec == "vuchina" ?
                    <div className={ `${Pay_Rec_Style.sell_list}` }>
                        <article>
                            <h2 style={ { color: "white" } }>Lot List</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>VayaPartyname</th>
                                        <th>T-type</th>
                                        <th>Partyname</th>
                                        <th>R-Amount</th>
                                        <th>PayAmount</th>
                                        <th>O-amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.all_invoice.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.v_id }</td>
                                                    <td>{ ele.vaipartyname == "0" ? "-" : ele.vaipartyname }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.partyname }</td>
                                                    <td>{ ele.recamount }</td>
                                                    <td>{ ele.payamount }</td>
                                                    <td>{ ele.outstandingamount }</td>
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
                    </div> : null
            }

            <section>
                <div className={ `card ${Pay_Rec_Style.pay_rec_heading}` }>
                    <h4> {/* props.name */ }All Uchina Receive Form</h4>
                    <article>
                        <label style={ { width: "10%" } }>Uchina Type</label>
                        <div className={ `column two` }>
                            <select
                                value={ props.party_rec.alluchinapayrec }
                                name='alluchinapayrec'
                                onChange={ props.party_rec_change }>
                                <option value="">Select</option>
                                <option value="guchina">GamUchina</option>
                                <option value="tuchina">TradingUchina</option>
                                <option value="vuchina">ViaUchina</option>
                            </select>
                        </div>
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
                            props.show_invoice == true && props.party_rec.alluchinapayrec == "guchina" ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Partyname</th>
                                            <th>T-Date</th>
                                            <th>T-type</th>
                                            <th>R-Amount</th>
                                            <th>Bankname</th>
                                            <th>Amount</th>
                                            <th>O-amount</th>
                                            <th>Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ props.invoice_selected.u_id }</td>
                                            <td>{ props.invoice_selected.partyname }</td>
                                            <td>{ props.invoice_selected.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ props.invoice_selected.transactiontype }</td>
                                            <td>{ props.invoice_selected.receive_amount }</td>
                                            <td>{ props.invoice_selected.bankname }</td>
                                            <td>{ props.invoice_selected.amount }</td>
                                            <td>{ props.invoice_selected.outstanding_amount }</td>
                                            <td>{ props.invoice_selected.remark }</td>
                                        </tr>
                                    </tbody>
                                </table>
                                : null
                        }
                        {
                            props.show_invoice == true && props.party_rec.alluchinapayrec == "tuchina" ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Partyname</th>
                                            <th>T-type</th>
                                            <th>R-Amount</th>
                                            <th>O-amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ props.invoice_selected.t_id }</td>
                                            <td>{ props.invoice_selected.buypartyname }</td>
                                            <td>{ props.invoice_selected.transactiontype }</td>
                                            <td>{ props.invoice_selected.recamount }</td>
                                            <td>{ props.invoice_selected.outstandingamount }</td>
                                        </tr>
                                    </tbody>
                                </table> : null
                        }
                        {
                            props.show_invoice == true && props.party_rec.alluchinapayrec == "vuchina" ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>VayaPartyname</th>
                                            <th>T-type</th>
                                            <th>Partyname</th>
                                            <th>R-Amount</th>
                                            <th>PayAmount</th>
                                            <th>O-amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ props.invoice_selected.v_id }</td>
                                            <td>{ props.invoice_selected.vaipartyname == "0" ? "-" : props.invoice_selected.vaipartyname }</td>
                                            <td>{ props.invoice_selected.transactiontype }</td>
                                            <td>{ props.invoice_selected.partyname }</td>
                                            <td>{ props.invoice_selected.recamount }</td>
                                            <td>{ props.invoice_selected.payamount }</td>
                                            <td>{ props.invoice_selected.outstandingamount }</td>
                                        </tr>
                                    </tbody>
                                </table> : null
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
                                    name='bankName'
                                    onChange={ props.trans_change }
                                    value={ props.bankName }
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
                                { props.error_tdata.bank ? <span style={ { color: "red", position: "absolute" } }>Bank select</span> : null }
                            </div>
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.purchase_filds}` }>
                                <label>Bank Balance</label>
                                <input
                                    value={ props.bank }
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
                                    value={ props.party_rec.alluchinapayrec == "guchina" ? props.invoice_selected.outstanding_amount :
                                        props.party_rec.alluchinapayrec == "tuchina" ? props.invoice_selected.outstandingamount :
                                            props.party_rec.alluchinapayrec == "vuchina" ? props.invoice_selected.outstandingamount : 0 }
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
                        <div className={ `column two` }></div>
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
                                                <td>{ ele.all_id }</td>
                                                <td>{ ele.partyname }</td>
                                                <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                                <td>{ ele.amount }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </article>
                    <div className={ `${Pay_Rec_Style.delete_invoice}` }>
                        <button onClick={ props.delete_data } className='warning'>All Delete</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Uchina_pay_rec