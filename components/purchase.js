import Link from 'next/link'
import React from 'react'
import Purchase_Style from '../styles/purchase.module.css'
// import { Toaster } from 'react-hot-toast';

const Purchase = (props) => {

    return (
        <section>
            <div className={ `card ${Purchase_Style.purchase_heading}` }>
                <h4> { props.name } Purchase Form</h4>
                <article>
                    <div className={ `column two ${Purchase_Style.purchase_filds}` }>
                        <label>Invoice</label>
                        <input
                            name='invoice_number'
                            onChange={ props.change_purchese }
                            value={ props.purchase_data.invoice_number }
                            type="text" />
                    </div>
                    <div className={ `column five` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label style={ { width: "50%" } }>Party Name</label>
                            <select
                                value={ props.purchase_data.party_name }
                                style={ { width: "160%" } }
                                name='party_name'
                                onChange={ props.change_purchese }>
                                <option value="">Select Party Name</option>
                                {
                                    props.party_name.map((ele, index) => {
                                        return (
                                            <option value={ ele }>{ ele }</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        { props.error.error_party_name ? <label style={ { color: "red", marginLeft: "110px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label>Extra</label>
                            <select
                                value={ props.purchase_data.extra }
                                name='extra'
                                onChange={ props.change_purchese }>
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        { props.error.error_extra ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label>Type</label>
                            <select
                                value={ props.purchase_data.type }
                                name='type'
                                onChange={ props.change_purchese }>
                                <option value="">Select</option>
                                <option value="r">Real</option>
                                <option value="t">Trading</option>
                            </select>
                        </div>
                        { props.error.error_type ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div style={ { width: '106%' } } className={ `${Purchase_Style.purchase_filds}` }>
                            <label>Artical</label>
                            <select
                                value={ props.purchase_data.artical }
                                name='artical'
                                onChange={ props.change_purchese }>
                                <option value="">Select</option>
                                <option value="rough">Rough</option>
                                <option value="polish">Polish</option>
                                <option value="jewellery">Jewellery</option>
                            </select>
                        </div>
                        { props.error.error_artical ? <label style={ { color: "red", marginLeft: "55px", position: "absolute" } }>Plasese select</label> : null }
                    </div>

                </article>
                <article>
                    <div className={ `column three` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label style={ { width: "60%" } }>Invoice Date</label>
                            <input
                                value={ props.purchase_data.invoice_date }
                                name='invoice_date'
                                onChange={ props.change_purchese }
                                type="date" />
                        </div>
                        { props.error.error_invoice_date ? <label style={ { color: "red", marginLeft: "100px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label>Terms</label>
                            <input
                                value={ props.purchase_data.terms }
                                name='terms'
                                onChange={ props.change_purchese }
                                type="number" />
                        </div>
                        { props.error.error_terms ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese enter</label> : null }
                    </div>
                    <div className={ `column three ${Purchase_Style.purchase_filds}` }>
                        <label style={ { width: "40%" } }>Due Date</label>
                        <input
                            value={ props.due_date_now }
                            disabled
                            type="date" />
                    </div>
                </article>
                <hr />
                {
                    props.lot_list.map((ele, index) => {
                        return (
                            <article key={ index } className={ `${Purchase_Style.purchase_artical}` }>
                                <div className={ `column three ${Purchase_Style.purchase_filds}` }>
                                    <label>Carat</label>
                                    <input
                                        name='carat'
                                        onChange={ (e) => props.set_edit_lot(e, "new_carat") }
                                        disabled={ ele.edit_disable ? null : "disabled" }
                                        value={ ele.edit_disable ? props.new_edit.new_carat : ele.carat }
                                        placeholder='Carat value'
                                        type="number" />
                                </div>
                                <div className={ `column three ${Purchase_Style.purchase_filds}` }>
                                    <label>Price</label>
                                    <input
                                        name='price'
                                        onChange={ (e) => props.set_edit_lot(e, "new_price") }
                                        disabled={ ele.edit_disable ? null : "disabled" }
                                        value={ ele.edit_disable ? props.new_edit.new_price : ele.price }
                                        placeholder='Carat Price'
                                        type="number" />
                                </div>
                                <div className={ `column three ${Purchase_Style.purchase_filds}` }>
                                    <label>Amount</label>
                                    <input
                                        disabled
                                        value={ ele.edit_disable ? parseFloat(props.new_edit.new_carat * props.new_edit.new_price).toFixed(2) : ele.amount }
                                        placeholder='Total Amount'
                                        type="number" />
                                    {
                                        ele.edit_disable ?
                                            <div>
                                                <i onClick={ () => props.save_new_lot(ele.lot_id) } className="icon-credit-card"></i>
                                            </div> :
                                            <div>
                                                <i onClick={ () => props.edit_lot(ele.lot_id) } className="icon-edit"></i>
                                                <i onClick={ () => props.delete_lot(ele.lot_id) } className="icon-trash"></i>
                                            </div>

                                    }

                                </div>
                            </article>
                        )
                    })
                }
                <article className={ `${Purchase_Style.purchase_artical}` }>
                    <div className={ `column three` }>
                        <div className={ ` ${Purchase_Style.purchase_filds}` }>
                            <label>Carat</label>
                            <input
                                name='lot_carat'
                                value={ props.lot_obj.lot_carat }
                                onChange={ props.set_lot }
                                placeholder='Carat value'
                                type="number" />
                        </div>
                        { props.error_lot.error_lot_carat ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese add carat</label> : null }
                    </div>
                    <div className={ `column three` }>
                        <div className={ `${Purchase_Style.purchase_filds}` }>
                            <label>Price</label>
                            <input
                                name='lot_price'
                                value={ props.lot_obj.lot_price }
                                onChange={ props.set_lot }
                                placeholder='Carat Price'
                                type="number" />
                        </div>
                        { props.error_lot.error_lot_price ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese add price</label> : null }
                    </div>
                    <div className={ `column three ${Purchase_Style.purchase_filds}` }>
                        <label>Amount</label>
                        <input
                            disabled
                            value={ parseFloat(props.lot_obj.lot_carat * props.lot_obj.lot_price).toFixed(2) }
                            onChange={ props.change_purchese }
                            placeholder='Total Amount'
                            type="number" />
                        <i onClick={ props.add_lot } className="icon-add-section"></i>
                    </div>
                </article>
                <hr />
                <article className={ `${Purchase_Style.purchase_artical_difference}` }>
                    <div className="column two"></div>
                    <div className={ `column four ${Purchase_Style.purchase_filds}` }>
                        <label>Add Difference</label>
                        <input
                            value={ props.difference.add_difference }
                            disabled={ props.disable_diff.add_diff ? "disabled" : null }
                            name='add_difference'
                            onChange={ props.set_difference }
                            placeholder='Plus difference'
                            type="number" />
                    </div>
                    <div className={ `column four ${Purchase_Style.purchase_filds}` }>
                        <label>Minus Difference</label>
                        <input
                            value={ props.difference.minus_difference }
                            disabled={ props.disable_diff.min_diff ? "disabled" : null }
                            name='minus_difference'
                            onChange={ props.set_difference }
                            placeholder='Minus difference'
                            type="number" />
                    </div>
                    <div className="column two"></div>
                </article>
                <article className={ `${Purchase_Style.purchase_artical_total}` }>
                    <div className={ `column four ${Purchase_Style.purchase_filds}` }>
                        <label>Total Carat</label>
                        <input
                            value={ parseFloat(props.total_carat_now).toFixed(2) }
                            disabled
                            type="number" />
                    </div>
                    <div className={ `column four ${Purchase_Style.purchase_filds}` }>
                        <label>Total Amount</label>
                        <input
                            value={ parseFloat(props.total_amount_now).toFixed(2) }
                            disabled
                            type="number" />
                    </div>
                    <div className={ `column four ${Purchase_Style.purchase_filds}` }>
                        <label>Final Amount</label>
                        <input
                            value={ props.final_amount_now }
                            disabled
                            type="number" />
                    </div>
                </article>
                <article>
                    <div className={ `column twelve ${Purchase_Style.purchase_filds}` }>
                        <label>Remark</label>
                        <input
                            value={ props.purchase_data.remark }
                            name='remark'
                            onChange={ props.change_purchese }
                            placeholder='Enter a remark'
                            type="text" />
                    </div>
                </article>
                <article style={ { marginBottom: "0" } }>
                    <div className={ `column twelve ${Purchase_Style.purchase_button_save_close}` }>
                        <button onClick={ props.save_purchase }>{ props.save }</button>
                        <Link href="/transaction/purchase/allpurchase"><button>All List</button></Link>
                        <Link href="/">
                            <button className='warning'>Close</button>
                        </Link>
                    </div>
                </article>
            </div>
            {/* <Toaster /> */ }
        </section>
    )
}

export default Purchase
