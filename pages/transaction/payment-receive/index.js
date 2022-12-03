import React, { useEffect, useState } from 'react'
import Pay_rec from '../../../components/pay_rec'
import Error from '../../../components/error'
import toast, { Toaster } from 'react-hot-toast';

const Index = (
    { api, sell, purchase, bank_name }
) => {

    const [party_rec, setParty_rec] = useState({
        extra: "",
        type: "",
        artical: "",
        party_name: "",
        transition: "",
    })
    const [transationtype, setTransationtype] = useState("")

    const [error_payrec, setError_payrec] = useState({
        extra: false,
        type: false,
        artical: false,
        party_name: false,
        transition: false
    })

    const party_rec_change = (e) => {
        setParty_rec({ ...party_rec, [e.target.name]: e.target.value })
        setError_payrec({ ...error_payrec, [e.target.name]: false })
    }
    const [part_list, setPart_list] = useState([])

    const [show_data, setShow_data] = useState(false)
    const [all_invoice, setAll_invoice] = useState([])

    const click_show = async () => {
        if (party_rec.extra == "") {
            setError_payrec({ ...error_payrec, extra: true })
        } else if (party_rec.type == "") {
            setError_payrec({ ...error_payrec, type: true })
        } else if (party_rec.artical == "") {
            setError_payrec({ ...error_payrec, artical: true })
        } else if (party_rec.transition == "") {
            setError_payrec({ ...error_payrec, transition: true })
        } else if (party_rec.party_name == "") {
            setError_payrec({ ...error_payrec, party_name: true })
        } else {
            setShow_data(true)
        }
    }

    useEffect(() => {
        if (party_rec.transition === "buy") {
            setTransationtype("Payment")
            setPart_list(purchase)
            if (party_rec.artical != "" && party_rec.extra != "" && party_rec.party_name != "" && party_rec.transition != "" && party_rec.type != "") {

                async function fetchMyAPI() {
                    const res = await fetch(`${api}Payrec/Getinvoiceist`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ ...party_rec })
                        })
                    const res_lot = await res.json()

                    setAll_invoice(res_lot.map((ok) => ({
                        check: false,
                        s_p_id: ok.p_id,
                        invoice_date: ok.invoice_date,
                        total_carat: ok.total_carat,
                        final_amount: ok.final_amount,
                        receive_amount: ok.receive_amount,
                        outstanding_amount: ok.outstanding_amount,
                        extra: ok.extra,
                        type: ok.type,
                        artical: ok.artical,
                    })))
                }

                fetchMyAPI()
            }
        } else if (party_rec.transition === "sell") {
            setTransationtype("Receive")
            setPart_list(sell)
            if (party_rec.artical != "" && party_rec.extra != "" && party_rec.party_name != "" && party_rec.transition != "" && party_rec.type != "") {

                async function fetchMyAPI() {
                    const res = await fetch(`${api}Payrec/Getinvoiceist`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ ...party_rec })
                        })
                    const res_lot = await res.json()

                    setAll_invoice(res_lot.map((ok) => ({
                        check: false,
                        s_p_id: ok.s_id,
                        invoice_date: ok.invoice_date,
                        total_carat: ok.total_carat,
                        final_amount: ok.sell_invoice,
                        receive_amount: ok.receive_amount,
                        outstanding_amount: ok.outstanding_amount,
                        sell_differnt_amount: ok.sell_differnt_amount,
                        extra: ok.extra,
                        type: ok.type,
                        artical: ok.artical,
                        vai_1: ok.vai_1,
                        vai_1_amount: ok.vai_1_amount,
                        vai_2: ok.vai_2,
                        vai_2_amount: ok.vai_2_amount,
                        vai_3: ok.vai_3,
                        vai_3_amount: ok.vai_3_amount,
                        vai_4: ok.vai_4,
                        vai_4_amount: ok.vai_4_amount,
                    })))
                }

                fetchMyAPI()
            }
        }
    }, [party_rec])

    const [show_invoice, setShow_invoice] = useState(false)
    const [invoice_selected, setInvoice_selected] = useState({
        check: false,
        s_p_id: "",
        invoice_date: "",
        total_carat: "",
        final_amount: "",
        receive_amount: "",
        outstanding_amount: "",
        extra: "",
        type: "",
        artical: "",
        vai_1: "",
        vai_1_amount: "",
        vai_2: "",
        vai_2_amount: "",
        vai_3: "",
        vai_3_amount: "",
        vai_4: "",
        vai_4_amount: "",
    })

    const [payrec_data, setPayrec_data] = useState([])

    const radio_value = async (e, sub_p) => {
        const invoice = all_invoice.find(id => id.s_p_id == sub_p);

        if (e.target.checked == true) {
            const res = await fetch(`${api}Payrec/Getselectedinvoice`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "p_s_id": invoice.s_p_id })
                })
            const res_lot = await res.json()

            setPayrec_data(res_lot)
            setShow_data(false)
            setShow_invoice(true)
            setInvoice_selected(invoice);
        }
    }

    const [trans_data, setTrans_data] = useState({
        tdate: "",
        bankName: "",
        tamount: "",
    })
    const [bank, setBank] = useState(0)
    const [error_tdata, setError_tdata] = useState({
        tdate: false,
        bank: false,
        tamount: false,
    })

    const [error_bank, setError_bank] = useState({
        o_error: false,
        b_error: false,
    })

    const [o_amount, setO_amount] = useState(0)

    const trans_change = (e) => {
        if (e.target.name == "tdate") {
            setTrans_data({ ...trans_data, [e.target.name]: e.target.value })
            setError_tdata({ ...error_tdata, tdate: false })
        } else if (e.target.name == "bankName") {
            setTrans_data({ ...trans_data, [e.target.name]: e.target.value })
            setError_tdata({ ...error_tdata, bank: false })
        } else if (e.target.name == "tamount") {
            setTrans_data({ ...trans_data, [e.target.name]: e.target.value })
            setError_tdata({ ...error_tdata, tamount: false })
        }
    }

    useEffect(() => {
        if (trans_data.bankName != "") {
            async function fetchMyAPI() {
                const res = await fetch(`${api}Bank/Bankbalance`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ bankname: trans_data.bankName })
                    })
                const res_lot = await res.json()
                setBank(res_lot);

            }
            fetchMyAPI()
        }
        if (party_rec.transition == "buy") {
            if (trans_data.tamount != 0) {
                setO_amount(Math.round((invoice_selected.outstanding_amount - trans_data.tamount) * 100) / 100)
                if (invoice_selected.outstanding_amount >= trans_data.tamount) {
                    if (bank >= trans_data.tamount) {
                        setError_bank({ ...error_bank, b_error: false, o_error: false })
                    } else {
                        setError_bank({ ...error_bank, b_error: true, o_error: false })
                    }
                } else {
                    if (bank >= trans_data.tamount) {
                        setError_bank({ ...error_bank, b_error: false, o_error: true })
                    } else {
                        setError_bank({ ...error_bank, b_error: true, o_error: true })
                    }
                }
            } else {
                setO_amount(0)
            }
        } else {
            if (trans_data.tamount != 0) {
                setO_amount(Math.round((invoice_selected.outstanding_amount - trans_data.tamount) * 100) / 100)
                if (invoice_selected.outstanding_amount >= trans_data.tamount) {
                    setError_bank({ ...error_bank, o_error: false })
                } else {
                    setError_bank({ ...error_bank, o_error: true })
                }
            } else {
                setO_amount(0)
            }
        }
    }, [trans_data])

    const click_cansal = () => {
        setShow_data(false)

    }

    const click_delte = async () => {
        if (payrec_data.length != 0) {
            const del = payrec_data[0].p_s_id;
            const res = await fetch(`${api}Payrec/Delete`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "delete_data_id": del })
                })
            const res_lot = await res.json()

            if (res_lot == "Record Delete") {
                setPayrec_data([])
                setParty_rec({
                    extra: "",
                    type: "",
                    artical: "",
                    party_name: "",
                    transition: "",
                })
                setTransationtype("")
                setPart_list([])
                setAll_invoice([])
                setShow_invoice(false)
                setInvoice_selected({
                    check: false,
                    s_p_id: "",
                    invoice_date: "",
                    total_carat: "",
                    final_amount: "",
                    receive_amount: "",
                    outstanding_amount: "",
                    extra: "",
                    type: "",
                    artical: "",
                })
                setTrans_data({
                    tdate: "",
                    bank: "",
                    tamount: "",
                })
                setO_amount(0)
            }
        }
    }

    const data =
    {
        extra: party_rec.extra,
        type: party_rec.type,
        artical: party_rec.artical,
        transctiontype: transationtype,
        partyname: party_rec.party_name,
        p_s_id: invoice_selected.s_p_id,
        tdate: trans_data.tdate,
        bankname: trans_data.bankName,
        amount: trans_data.tamount,
        carat: invoice_selected.total_carat,
        invoice_amount: invoice_selected.final_amount,
        tmode: party_rec.transition,
        outstandingamount: o_amount,
        vai_1: invoice_selected.vai_1,
        vai_1_amount: invoice_selected.vai_1_amount,
        vai_2: invoice_selected.vai_2,
        vai_2_amount: invoice_selected.vai_2_amount,
        vai_3: invoice_selected.vai_3,
        vai_3_amount: invoice_selected.vai_3_amount,
        vai_4: invoice_selected.vai_4,
        vai_4_amount: invoice_selected.vai_4_amount,
    }

    const save_data = async () => {
        if (trans_data.tdate == "") {
            setError_tdata({ ...error_tdata, tdate: true });
        } else if (bank == "") {
            setError_tdata({ ...error_tdata, bank: true });
        } else if (trans_data.tamount == "") {
            setError_tdata({ ...error_tdata, tamount: true });
        } else if (error_bank.b_error == false &&
            error_bank.o_error == false &&
            bank != "" &&
            trans_data.tamount != "" &&
            trans_data.tdate != "" &&
            invoice_selected != {}) {
            const save = await fetch(`${api}Payrec/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const sell = await save.json()

            if (sell == "Record save") {
                toast.success(sell, {
                    style: {
                        padding: '16px',
                        color: 'black',
                        fontWeight: "700",
                        fontSize: "22px"
                    },
                    iconTheme: {
                        primary: 'green',
                        secondary: '#ffffff',
                    },
                });
                setParty_rec({
                    extra: "",
                    type: "",
                    artical: "",
                    party_name: "",
                    transition: "",
                })
                setPayrec_data([])
                setTransationtype("")
                setPart_list([])
                setAll_invoice([])
                setShow_invoice(false)
                setInvoice_selected({
                    check: false,
                    s_p_id: "",
                    invoice_date: "",
                    total_carat: "",
                    final_amount: "",
                    receive_amount: "",
                    outstanding_amount: "",
                    extra: "",
                    type: "",
                    artical: "",
                    sell_differnt_amount: "",
                    vai_1: "",
                    vai_1_amount: "",
                    vai_2: "",
                    vai_2_amount: "",
                    vai_3: "",
                    vai_3_amount: "",
                    vai_4: "",
                    vai_4_amount: "",
                })
                setTrans_data({
                    tdate: "",
                    bankName: "",
                    tamount: "",
                })
                setO_amount(0)
            }
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Pay_rec
                party_rec={ party_rec }
                error_payrec={ error_payrec }
                party_rec_change={ party_rec_change }
                show_data={ show_data }
                bank_name={ bank_name }
                bank={ bank }
                click_show={ click_show }
                show_invoice={ show_invoice }
                transationtype={ transationtype }
                part_list={ part_list }
                all_invoice={ all_invoice }
                trans_data={ trans_data }
                click_cansal={ click_cansal }
                invoice_selected={ invoice_selected }
                trans_change={ trans_change }
                radio_value={ radio_value }
                error_tdata={ error_tdata }
                error_bank={ error_bank }
                o_amount={ o_amount }
                click_delte={ click_delte }
                payrec_data={ payrec_data }
                save_data={ save_data }
            />
        </div>
    )
}

export default Index

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

    const res_bank = await fetch(`${process.env.API}Bank/Getbankname`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ok: "ok"
            })
        })
    const bank_name = await res_bank.json()
    return {
        props: {
            "api": process.env.API,
            "sell": sell.party,
            "purchase": resdata.data,
            "bank_name": bank_name
        }
    }
}