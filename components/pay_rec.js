import Link from 'next/link'
import React from 'react'
import Pay_Rec_Style from '../styles/paymentReceive.module.css'
const Pay_rec = (props) => {
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
                                        <th>Invoice Date</th>
                                        <th>Carat</th>
                                        <th>Final Amount</th>
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
                                                    <td>{ ele.s_p_id }</td>
                                                    <td>{ ele.invoice_date.split("T")[0].split("-").reverse().join("-") }</td>
                                                    <td>{ ele.total_carat }</td>
                                                    <td>{ ele.final_amount }</td>
                                                    <td>{ ele.receive_amount }</td>
                                                    <td>{ ele.outstanding_amount }</td>
                                                    <td><input
                                                        name='Radio'
                                                        onChange={ (e) => props.radio_value(e, ele.s_p_id) }
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
                    <h4> {/* props.name */ } Payment Receive Form</h4>
                    <article>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label>Extra</label>
                                <select
                                    value={ props.party_rec.extra }
                                    name='extra'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            { props.error_payrec.extra ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label>Type</label>
                                <select
                                    value={ props.party_rec.type }
                                    name='type'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select</option>
                                    <option value="r">Real</option>
                                    <option value="t">Trading</option>
                                </select>
                            </div>
                            { props.error_payrec.type ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `column two` }>
                            <div style={ { width: '106%' } } className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label>Artical</label>
                                <select
                                    value={ props.party_rec.artical }
                                    name='artical'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select</option>
                                    <option value="rough">Rough</option>
                                    <option value="polish">Polish</option>
                                    <option value="jewellery">Jewellery</option>
                                </select>
                            </div>
                            { props.error_payrec.artical ? <label style={ { color: "red", marginLeft: "55px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `column two` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label>Transation</label>
                                <select
                                    style={ { width: "100px" } }
                                    value={ props.party_rec.transition }
                                    name='transition'
                                    onChange={ props.party_rec_change }
                                >
                                    <option value="">Select</option>
                                    <option value="buy">BUY</option>
                                    <option value="sell">SELL</option>
                                </select>
                            </div>
                            { props.error_payrec.transition ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                        </div>
                        <div className={ `column five` }>
                            <div className={ `${Pay_Rec_Style.pay_rec_filds}` }>
                                <label style={ { width: "50%" } }>Party Name</label>
                                <select
                                    value={ props.party_rec.party_name }
                                    style={ { width: "160%" } }
                                    name='party_name'
                                    onChange={ props.party_rec_change }>
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
                    </article>
                    <article>
                        <div className={ `${Pay_Rec_Style.show_button}` }>
                            <button
                                onClick={ props.click_show }
                                className='warning'>Show Invoice List</button>
                        </div>
                    </article>
                    <hr />
                    <article>
                        {
                            props.show_invoice ?
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Invoice Date</th>
                                            <th>Carat</th>
                                            <th>Final Amount</th>
                                            <th>Receive</th>
                                            <th>Outstanding</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ props.invoice_selected.s_p_id }</td>
                                            <td>{ props.invoice_selected.invoice_date.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ props.invoice_selected.total_carat }</td>
                                            <td>{ props.invoice_selected.final_amount }</td>
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
                                    name='bankName'
                                    onChange={ props.trans_change }
                                    value={ props.trans_data.bankName }
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
                                    value={ props.invoice_selected.outstanding_amount }
                                    disabled
                                    type="number" />
                            </div>
                        </div>
                    </article>
                    <article>
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
                                    value={ props.invoice_selected.sell_differnt_amount }
                                    disabled
                                    type="number" />
                            </div>
                        </div>
                    </article>
                    <hr />
                    <article>
                        <div className={ `column three ${Pay_Rec_Style.button_submit}` }>
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
                        <div className={ `column two ${Pay_Rec_Style.purchase_vaya}` }>
                            <label>Vaya Party</label>
                            <input value={ props.invoice_selected.vai_1 } type="text" disabled />
                            <label>Price</label>
                            <input value={ props.invoice_selected.vai_1_amount } type="text" disabled />
                        </div>
                        <div className={ `column two ${Pay_Rec_Style.purchase_vaya}` }>
                            <label>Vaya Party</label>
                            <input value={ props.invoice_selected.vai_2 } type="text" disabled />
                            <label>Price</label>
                            <input value={ props.invoice_selected.vai_2_amount } type="text" disabled />
                        </div>
                        <div className={ `column two ${Pay_Rec_Style.purchase_vaya}` }>
                            <label>Vaya Party</label>
                            <input value={ props.invoice_selected.vai_3 } type="text" disabled />
                            <label>Price</label>
                            <input value={ props.invoice_selected.vai_3_amount } type="text" disabled />
                        </div>
                        <div className={ `column two ${Pay_Rec_Style.purchase_vaya}` }>
                            <label>Vaya Party</label>
                            <input value={ props.invoice_selected.vai_4 } type="text" disabled />
                            <label>Price</label>
                            <input value={ props.invoice_selected.vai_4_amount } type="text" disabled />
                        </div>
                    </article>
                    <article>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Party Name</th>
                                    <th>Transtion Date</th>
                                    <th>Invoice $</th>
                                    <th>Carat</th>
                                    <th>Pay/Rec Amount</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.payrec_data.map((ele, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>{ ele.id }</td>
                                                <td>{ ele.partyname }</td>
                                                <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                                <td>{ ele.invoice_amount }</td>
                                                <td>{ ele.carat }</td>
                                                <td>{ ele.amount }</td>
                                                <td>
                                                    <button className='warning' onClick={ () => props.delete_part(ele.id, ele.p_s_id) }>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </article>
                    <div className={ `${Pay_Rec_Style.delete_invoice}` }>
                        {/* <button onClick={ props.click_delte } className='warning'>Delete</button> */ }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pay_rec