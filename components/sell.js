import Link from 'next/link'
import React from 'react'
import Sell_Style from '../styles/sell.module.css'

const Sell = (props) => {

   return (
      <div>
         {
            props.show_lot ?
               <div className={ `${Sell_Style.sell_list}` }>
                  <article>
                     <h2 style={ { color: "white" } }>Lot List</h2>
                     <table style={ { width: "80%", margin: "auto" } }>
                        <thead>
                           <tr>
                              <th>No</th>
                              <th>Party name</th>
                              <th>Carat</th>
                              <th>Price</th>
                              <th>Total Amount</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              props.all_lot_data.map((ele, index) => {
                                 return (
                                    <tr key={ index }>
                                       <td>{ ele.sub_p_id }</td>
                                       <td>{ ele.party_name }</td>
                                       <td>{ ele.carat }</td>
                                       <td>{ ele.price }</td>
                                       <td>{ ele.amount }</td>
                                       <td><input
                                          onChange={ (e) => props.checkbox_value(e, ele.sub_p_id) }
                                          defaultChecked={ ele.check }
                                          type="checkbox" /></td>
                                    </tr>
                                 )
                              })
                           }
                        </tbody>
                     </table>
                  </article>
                  <div className={ `${Sell_Style.lot_save_cansal}` }>
                     <button
                        onClick={ props.click_save_lot }
                        className={ `${Sell_Style.sell_save}` }>Add Lot</button>
                     <button onClick={ props.click_cansal } className='warning'>Close</button>
                  </div>
               </div> : null
         }
         <section>
            <div className={ `card ${Sell_Style.purchase_heading}` }>
               <div className={ `${Sell_Style.purchase_heading_id}` }>
                  <label>RecId - { props.sell_data.id }</label>
                  <h4>{ props.name } Form Sell</h4>
                  <div></div>
               </div>

               <article>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label>Invoice</label>
                     <input
                        value={ props.sell_data.invoice_number }
                        onChange={ props.sell_change }
                        name='invoice_number'
                        type="text" />
                  </div>
                  <div className={ `column four` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label style={ { width: "70%" } }>Party Name</label>
                        <select
                           value={ props.sell_data.party_name }
                           onChange={ props.sell_change }
                           style={ { width: "160%" } }
                           name='party_name'>
                           <option value="">Select Party Name</option>
                           {
                              props.sell_party_list.map((ele, index) => {
                                 return (
                                    <option key={ index } value={ ele }>{ ele }</option>
                                 )
                              })
                           }

                        </select>
                     </div>
                     { props.error_sell_data.party_name ? <label style={ { color: "red", marginLeft: "110px", position: "absolute" } }>Plasese select</label> : null }
                  </div>
                  <div className={ `column two` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label>Extra</label>
                        <select
                           disabled={ props.edit_disable ? "disabled" : null }
                           value={ props.get_lot.extra }
                           onChange={ props.get_change }
                           name='extra'>
                           <option value="">Select</option>
                           <option value="yes">Yes</option>
                           <option value="no">No</option>
                        </select>
                     </div>
                     { props.error_get_lot.extra ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                  </div>
                  <div className={ `column two` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label>Type</label>
                        <select
                           disabled={ props.edit_disable ? "disabled" : null }
                           value={ props.get_lot.type }
                           onChange={ props.get_change }
                           name='type'>
                           <option value="">Select</option>
                           <option value="r">Real</option>
                           <option value="t">Trading</option>
                        </select>
                     </div>
                     { props.error_get_lot.type ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }                   </div>
                  <div className={ `column two` }>
                     <div style={ { width: '106%' } } className={ `${Sell_Style.purchase_filds}` }>
                        <label>Artical</label>
                        <select
                           disabled={ props.edit_disable ? "disabled" : null }
                           value={ props.get_lot.artical }
                           onChange={ props.get_change }
                           name='artical'>
                           <option value="">Select</option>
                           <option value="rough">Rough</option>
                           <option value="polish">Polish</option>
                           <option value="jewellery">Jewellery</option>
                        </select>
                     </div>
                     { props.error_get_lot.artical ? <label style={ { color: "red", marginLeft: "55px", position: "absolute" } }>Plasese select</label> : null }
                  </div>
               </article>
               <article>
                  <div className={ `cloumn five` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label style={ { marginRight: "20px" } }>Show Sell Lot</label>
                        <button
                           style={ { padding: "2px 5px" } }
                           disabled={ props.show_button ? "disabled" : null }
                           onClick={ props.click_show_lot }
                           className='secondary'>Click to show</button>
                     </div>
                  </div>
                  <div className={ `column four` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label style={ { width: "60%" } }>Invoice Date</label>
                        <input
                           value={ props.sell_data.invoice_date }
                           onChange={ props.sell_change }
                           name='invoice_date'
                           type="date" />
                     </div>
                     { props.error_sell_data.invoice_date ? <label style={ { color: "red", marginLeft: "100px", position: "absolute" } }>Plasese select</label> : null }
                  </div>
                  <div className={ `column two` }>
                     <div className={ `${Sell_Style.purchase_filds}` }>
                        <label>Terms</label>
                        <input
                           value={ props.sell_data.terms }
                           onChange={ props.sell_change }
                           name='terms'
                           type="number" />
                     </div>
                     { props.error_sell_data.terms ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese enter</label> : null }
                  </div>

               </article>
               <article>
                  <div className={ ` ${Sell_Style.purchase_filds}` }>
                     <label>New persentage</label>
                     <div className='input-group'>
                        <input
                           disabled={ props.lot_show ? null : "disabled" }
                           value={ props.persent }
                           onChange={ props.persent_change }
                           type="number" />
                        <span className="append">%</span>
                     </div>
                  </div>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "50%" } }>Fix Amount</label>
                     <input
                        name='fix amount'
                        value={ props.fix }
                        onChange={ props.fix_set }
                        type="number" />
                  </div>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "40%" } }>Due Date</label>
                     <input
                        value={ props.due_date_now }
                        disabled
                        type="date" />
                  </div>
               </article>
               <hr />
               {
                  props.lot_show && props.new_sell_lot.length != 0 ?
                     <>
                        {
                           <div>
                              <article style={ { margin: "0 0 0 15px" } }>
                                 <table>
                                    <thead>
                                       <tr>
                                          <th>No</th>
                                          <th>Party name</th>
                                          <th>Carat</th>
                                          <th>Price</th>
                                          <th>Total Amount</th>
                                          <th>New Price</th>
                                          <th>New Amount</th>
                                          <th>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {
                                          props.new_sell_lot.map((ele, index) => {
                                             return (
                                                <tr key={ index }>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.sub_p_id }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.party_name }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.carat }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.price }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.amount }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.new_price }</td>
                                                   <td style={ { padding: "3px 10px" } }>{ ele.new_amount }</td>
                                                   <td style={ { padding: "3px 10px" } }>
                                                      <button
                                                         onClick={ () => props.remove_lot(ele.sub_p_id) }
                                                         className='warning'>Remove</button>
                                                   </td>
                                                </tr>
                                             )
                                          })
                                       }
                                    </tbody>
                                 </table>
                              </article>
                           </div>
                        }
                     </> : null
               }

               <article style={ { display: "none" } }>
                  <table>
                     <thead>
                        <tr>
                           <th>No</th>
                           <th>Party name</th>
                           <th>Carat</th>
                           <th>Price</th>
                           <th>Total Amount</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Rameshbhai</td>
                           <td>10.25</td>
                           <td>36.51</td>
                           <td>360.51</td>
                           <td><input type="checkbox" /></td>
                        </tr>
                     </tbody>
                  </table>
               </article>
               <hr />
               <article style={ { marginTop: "20px" } } className={ `${Sell_Style.purchase_artical_total}` }>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "55%" } }>Total Carat</label>
                     <input
                        value={ props.total_carat_now }
                        disabled
                        type="number" />
                  </div>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "80%" } }>Total Amount</label>
                     <input
                        value={ props.total_amount_now }
                        disabled
                        type="number" />
                  </div>
                  <div className={ `column three ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "80%" } }>Final Amount</label>
                     <input
                        value={ props.total_final_now }
                        disabled
                        type="number" />
                  </div>
                  <div className={ `column two ${Sell_Style.purchase_filds}` }>
                     <label>Add Carat</label>
                     <input
                        name='add_carat'
                        onChange={ props.newCarat }
                        value={ props.diff.add_carat }
                        type="number" />
                  </div>
                  <div className={ `column two ${Sell_Style.purchase_filds}` }>
                     <label>Minus Carat</label>
                     <input
                        name='min_carat'
                        onChange={ props.newCarat }
                        value={ props.diff.min_carat }
                        type="number" />
                  </div>
               </article>
               <hr />
               <article style={ { marginTop: "10px" } }>
                  <div className={ `column four` }>
                     <label style={ { width: "40%", textAlign: "center" } }>Vaya 1</label>
                     <div>
                        <select
                           value={ props.vaya.vaya1_name }
                           onChange={ props.vaya_change }
                           style={ { width: "80%", margin: "10px 0" } }
                           name='vaya1_name'>
                           <option value="">Select Party Name</option>
                           {
                              props.allParty.map((ele, index) => {
                                 return (
                                    <option key={ index } value={ ele }>{ ele }</option>
                                 )
                              })
                           }

                        </select>
                        <input
                           value={ props.vaya.vaya1_value }
                           name='vaya1_value'
                           onChange={ props.vaya_change }
                           placeholder='Value'
                           style={ { width: "80%" } }
                           type="number"
                        />
                     </div>
                  </div>
                  <div className={ `column four` }>
                     <label style={ { width: "40%", textAlign: "center" } }>Vaya 2</label>
                     <div >
                        <select
                           onChange={ props.vaya_change }
                           value={ props.vaya.vaya2_name }
                           style={ { width: "80%", margin: "10px 0" } }
                           name='vaya2_name'>
                           <option value="">Select Party Name</option>
                           {
                              props.allParty.map((ele, index) => {
                                 return (
                                    <option key={ index } value={ ele }>{ ele }</option>
                                 )
                              })
                           }

                        </select>
                        <input
                           value={ props.vaya.vaya2_value }
                           name='vaya2_value'
                           onChange={ props.vaya_change }
                           placeholder='Value'
                           style={ { width: "80%" } }
                           type="number"
                        />
                     </div>
                  </div>
                  <div className={ `column four` }>
                     <label style={ { width: "40%", textAlign: "center" } }>Vaya 3</label>
                     <div >
                        <select
                           value={ props.vaya.vaya3_name }
                           onChange={ props.vaya_change }
                           style={ { width: "80%", margin: "10px 0" } }
                           name='vaya3_name'>
                           <option value="">Select Party Name</option>
                           {
                              props.allParty.map((ele, index) => {
                                 return (
                                    <option key={ index } value={ ele }>{ ele }</option>
                                 )
                              })
                           }

                        </select>
                        <input
                           value={ props.vaya.vaya3_value }
                           name='vaya3_value'
                           onChange={ props.vaya_change }
                           placeholder='Value'
                           style={ { width: "80%" } }
                           type="number"
                        />
                     </div>
                  </div>
                  <div className={ `column four` }>
                     <label style={ { width: "40%", textAlign: "center" } }>Vaya 4</label>
                     <div>
                        <select
                           value={ props.vaya.vaya4_name }
                           onChange={ props.vaya_change }
                           style={ { width: "80%", margin: "10px 0" } }
                           name='vaya4_name'>
                           <option value="">Select Party Name</option>
                           {
                              props.allParty.map((ele, index) => {
                                 return (
                                    <option key={ index } value={ ele }>{ ele }</option>
                                 )
                              })
                           }

                        </select>
                        <input
                           value={ props.vaya.vaya4_value }
                           name='vaya4_value'
                           onChange={ props.vaya_change }
                           placeholder='Value'
                           style={ { width: "80%" } }
                           type="number"
                        />
                     </div>
                  </div>
               </article>
               <article style={ { marginTop: "20px" } } className={ `${Sell_Style.purchase_artical_total}` }>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label>Carat</label>
                     <input
                        disabled
                        value={ props.new_carat_total }
                        // value={ props.total_carat_now }
                        type="text" />
                  </div>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label>Price</label>
                     <input
                        disabled
                        defaultValue={ props.new_sell_price }
                        type="number" />
                  </div>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label>Sell Amount</label>
                     <input
                        disabled
                        value={ props.new_Amount }
                        onChange={ props.set_new_amount }
                        type="number" />
                  </div>
               </article>
               <article className={ `${Sell_Style.purchase_artical_total}` }>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label>Add Diffrence</label>
                     <input
                        value={ props.difference.add_difference }
                        disabled={ props.disable_diff.add_diff ? "disabled" : null }
                        name='add_difference'
                        onChange={ props.set_difference }
                        placeholder='Plus difference'
                        type="number" />
                  </div>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "60%" } }>Minus Diffrence</label>
                     <input
                        value={ props.difference.minus_difference }
                        disabled={ props.disable_diff.min_diff ? "disabled" : null }
                        name='minus_difference'
                        onChange={ props.set_difference }
                        placeholder='Minus difference'
                        type="number" />
                  </div>
                  <div className={ `column four ${Sell_Style.purchase_filds}` }>
                     <label style={ { width: "65%" } }>Deffrence Amount</label>
                     <input
                        disabled
                        defaultValue={ props.differnce_amount }
                        type="number" />
                  </div>
               </article>
               <article>
                  <div className={ `column twelve ${Sell_Style.purchase_filds}` }>
                     <label>Remark</label>
                     <input
                        value={ props.sell_data.remark }
                        onChange={ props.sell_change }
                        name='remark'
                        placeholder='Enter a remark'
                        type="text" />
                  </div>
               </article>
               <article style={ { marginBottom: "0" } }>
                  <div className={ `column twelve ${Sell_Style.purchase_button_save_close}` }>
                     <button onClick={ props.save_sell_data }>{ props.save }</button>
                     <Link href="/transaction/sell/allsell">
                        <button>All Sell List</button>
                     </Link>
                     <Link href="/">
                        <button className='warning'>Close</button>
                     </Link>
                  </div>
               </article>
            </div>
         </section>
      </div >
   )
}

export default Sell