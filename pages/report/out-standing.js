import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Out_Style from '../../styles/outStanding.module.css'

const Out_standing = ({ api, sell, purchase }) => {

    const [show, setShow] = useState(false)

    const [outStand, setOutStand] = useState({
        extra: "",
        type: "",
        artical: "",
        transtiontype: "",
        party_name: "",
        fromdate: "2022-01-01",
        todate: "2024-01-01",
        remark: "",
    })
    const [error_payrec, setError_payrec] = useState({
        extra: false,
        type: false,
        artical: false,
        transtiontype: false,
        party_name: false,
        fromdate: false,
        todate: false,
    });
    const [party_list, setParty_list] = useState([]);
    const [all_data, setAll_data] = useState([]);
    const [sing_invoice, setsing_invoice] = useState(false);

    const outStandChange = (e) => {
        setOutStand({ ...outStand, [e.target.name]: e.target.value })
        setError_payrec({ ...error_payrec, [e.target.name]: false })
    }
    const [chbox_val, setChbox_val] = useState("F")

    const data = {
        extra: outStand.extra,
        type: outStand.type,
        artical: outStand.artical,
        transaction: outStand.transtiontype,
        partyname: outStand.party_name,
        fromdate: outStand.fromdate,
        todate: outStand.todate,
        chbox: chbox_val,
    }

    const show_data = async () => {
        if (error_payrec.artical == false &&
            error_payrec.extra == false &&
            error_payrec.fromdate == false &&
            error_payrec.party_name == false &&
            error_payrec.todate == false &&
            error_payrec.transtiontype == false &&
            error_payrec.type == false) {

            const res = await fetch(`${api}Report/Getdueinvoicedetail`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const res_lot = await res.json()
            setShow(true)
            setAll_data(res_lot);

        }
    }

    const show_all_invoice = async (e) => {
        if (e.target.checked == true) {
            setChbox_val("T");
        } else {
            setChbox_val("F");
        }
    }

    const checkbox_change = (e) => {
        if (e.target.checked == true) {
            setOutStand({ ...outStand, party_name: "all" })
        }
    }

    useEffect(() => {
        if (outStand.transtiontype == "buy") {
            setParty_list(purchase)
        } else if (outStand.transtiontype == "sell") {
            setParty_list(sell)
        }
    }, [outStand])

    const [show_one_invoice, setShow_one_invoice] = useState([]);
    const [sub_show_one, setSub_show_one] = useState([])

    const show_invoice = async (e) => {
        setsing_invoice(true)
        const res = await fetch(`${api}Report/SelectinvoicefullDetail`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ttype: outStand.transtiontype, id: e })
            })
        const res_data = await res.json()
        setShow_one_invoice(res_data.invoicedata)
        setSub_show_one(res_data.transactiondata)
    }

    const close_show = () => {
        setsing_invoice(false)
    }

    return (
        <section style={ { maxWidth: "1280px", position: "relative" } }>
            { sing_invoice ?
                <div className={ `${Out_Style.sell_list}` }>
                    <div className='card'>
                        <h3>Invoice Details</h3>
                        <table className='results'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Invoice Date</th>
                                    <th>Party Name</th>
                                    <th>Carat</th>
                                    <th>FinalAmount</th>
                                    <th>PayRecAmount</th>
                                    <th>Outstading</th>
                                    <th>Teams</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    show_one_invoice.map((ele, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>{ index + 1 }</td>
                                                <td>{ ele.invoice_date.split("T")[0].split("-").reverse().join("-") }</td>
                                                <td>{ ele.party_name }</td>
                                                <td>{ ele.total_carat }</td>
                                                <td>{ ele.total_amount }</td>
                                                <td>{ ele.receive_amount }</td>
                                                <td>{ ele.outstanding_amount }</td>
                                                <td>{ ele.terms }</td>
                                                <td>{ ele.due_date.split("T")[0].split("-").reverse().join("-") }</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <hr style={ { margin: "15px 0 5px 0", border: "1px solid black", margin: "0 10px" } } />
                        <div>
                            <h3>Transtion Details</h3>
                            <table className='results'>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sub_show_one.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.id }</td>
                                                    <td>{ ele.amount }</td>
                                                    <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div style={ { display: "flex", justifyContent: "center" } }>
                            <button onClick={ close_show } className='warning'>Close</button>
                        </div>
                    </div>
                </div>
                : null }
            <div className={ `card ${Out_Style.pay_rec_heading}` }>
                <h4>  Out Standing Form</h4>
                <article>
                    <div className={ `column two` }>
                        <div className={ `${Out_Style.pay_rec_filds}` }>
                            <label>Extra</label>
                            <select
                                value={ outStand.extra }
                                name='extra'
                                onChange={ outStandChange }
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        { error_payrec.extra ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div className={ `${Out_Style.pay_rec_filds}` }>
                            <label>Type</label>
                            <select
                                value={ outStand.type }
                                name='type'
                                onChange={ outStandChange }
                            >
                                <option value="">Select</option>
                                <option value="r">Real</option>
                                <option value="t">Trading</option>
                            </select>
                        </div>
                        { error_payrec.type ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div style={ { width: '106%' } } className={ `${Out_Style.pay_rec_filds}` }>
                            <label>Artical</label>
                            <select
                                value={ outStand.artical }
                                name='artical'
                                onChange={ outStandChange }
                            >
                                <option value="">Select</option>
                                <option value="rough">Rough</option>
                                <option value="polish">Polish</option>
                                <option value="jewellery">Jewellery</option>
                            </select>
                        </div>
                        { error_payrec.artical ? <label style={ { color: "red", marginLeft: "55px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <div className={ `${Out_Style.pay_rec_filds}` }>
                            <label>Transation</label>
                            <select
                                style={ { width: "100px" } }
                                value={ outStand.transtiontype }
                                name='transtiontype'
                                onChange={ outStandChange }
                            >
                                <option value="">Select</option>
                                <option value="buy">BUY</option>
                                <option value="sell">SELL</option>
                            </select>
                        </div>
                        { error_payrec.transtiontype ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column five` }>
                        <div className={ `${Out_Style.pay_rec_filds}` }>
                            <label style={ { width: "50%" } }>Party Name</label>
                            <select
                                value={ outStand.party_name }
                                style={ { width: "160%" } }
                                name='party_name'
                                onChange={ outStandChange }
                            >
                                <option value="">Select Party Name</option>
                                <option value="all">All Party</option>
                                {
                                    party_list.map((ele, index) => {
                                        return (
                                            <option key={ index } value={ ele }>{ ele }</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        { error_payrec.party_name ? <label style={ { color: "red", marginLeft: "110px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                </article>
                <article>
                    <div className={ `column three` }>
                        <div className={ `${Out_Style.purchase_filds}` }>
                            <label style={ { width: "60%" } }>From Date</label>
                            <input
                                value={ outStand.fromdate }
                                name='fromdate'
                                onChange={ outStandChange }
                                type="date" />
                        </div>
                        { error_payrec.fromdate ? <label style={ { color: "red", marginLeft: "100px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column three` }>
                        <div className={ `${Out_Style.purchase_filds}` }>
                            <label style={ { width: "60%" } }>To Date</label>
                            <input
                                value={ outStand.todate }
                                name='todate'
                                onChange={ outStandChange }
                                type="date" />
                        </div>
                        { error_payrec.todate ? <label style={ { color: "red", marginLeft: "100px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `column two` }>
                        <button onClick={ show_data }>Show Data</button>
                    </div>
                    <div className={ `column two` }>
                        <Link href="/">
                            <button className='warning'>Close</button>
                        </Link>
                    </div>
                    <div className={ `column two` }>
                        <label>
                            All Party
                            <input
                                checked={ outStand.party_name == "all" ? "checked" : null }
                                onChange={ checkbox_change }
                                style={ { marginLeft: "15px" } }
                                type="checkbox" />
                        </label>
                    </div>
                    <div className={ `column two` }>
                        <label>
                            All Invoices
                            <input
                                onChange={ show_all_invoice }
                                style={ { marginLeft: "15px" } }
                                type="checkbox" />
                        </label>
                    </div>
                </article>
                { show ?
                    <article>
                        <table className='results'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Invoice Date</th>
                                    <th>Party Name</th>
                                    <th>Carat</th>
                                    <th>FinalAmount</th>
                                    <th>PayRecAmount</th>
                                    <th>Outstading</th>
                                    <th>Teams</th>
                                    <th>Due Date</th>
                                    <th>Due Days</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    all_data.map((ele, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>{ ele.id }</td>
                                                <td>{ ele.invoicedate.split("T")[0].split("-").reverse().join("-") }</td>
                                                <td>{ ele.partyname }</td>
                                                <td>{ ele.carat }</td>
                                                <td>{ ele.finalamount }</td>
                                                <td>{ ele.recpayamount }</td>
                                                <td>{ ele.outstandingamount }</td>
                                                <td>{ ele.terms }</td>
                                                <td>{ ele.duedate.split("T")[0].split("-").reverse().join("-") }</td>
                                                <td>{ ele.dueday }</td>
                                                <td><button className='warning' onClick={ () => show_invoice(ele.id) }>Show</button></td>
                                            </tr>
                                        )
                                    })
                                }
                                <hr />
                                <tr>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }>
                                        { (all_data.reduce((totalLot, allCarat) => totalLot + allCarat.carat, 0)).toFixed(2) }
                                    </td>
                                    <td style={ { borderTop: "1px solid black" } }>
                                        { (all_data.reduce((totalLot, allCarat) => totalLot + allCarat.finalamount, 0)).toFixed(2) }
                                    </td>
                                    <td style={ { borderTop: "1px solid black" } }>
                                        { (all_data.reduce((totalLot, allCarat) => totalLot + allCarat.recpayamount, 0)).toFixed(2) }
                                    </td>
                                    <td style={ { borderTop: "1px solid black" } }>
                                        { (all_data.reduce((totalLot, allCarat) => totalLot + allCarat.outstandingamount, 0)).toFixed(2) }
                                    </td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                    <td style={ { borderTop: "1px solid black" } }></td>
                                </tr>
                            </tbody>
                        </table>
                    </article>
                    : null }

            </div>
        </section>
    )
}

export default Out_standing

export async function getServerSideProps() {

    const res = await fetch(`${process.env.API}Sell/Getsell`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const sell = await res.json()

    const res_party = await fetch(`${process.env.API}Purchase/GetParty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const resdata = await res_party.json()


    return {
        props: {
            "api": process.env.API,
            "sell": sell.party,
            "purchase": resdata.data
        }
    }
}