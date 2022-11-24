import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Uchina_pay_rec from '../../../components/uchina_pay_rec'

const Index = ({ api, pay, recive }) => {

    const [party_rec, setParty_rec] = useState({
        party_name: "",
        transition: "",
    })
    const [transationtype, setTransationtype] = useState("")

    const [error_payrec, setError_payrec] = useState({
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
        if (party_rec.transition == "") {
            setError_payrec({ ...error_payrec, transition: true })
        } else if (party_rec.party_name == "") {
            setError_payrec({ ...error_payrec, party_name: true })
        } else {
            setShow_data(true)
            const res = await fetch(`${api}Uchinapayrec/GetuchinaList`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        transactiontype: party_rec.transition,
                        partyname: party_rec.party_name
                    })
                })
            const resdata = await res.json()
            console.log("+++>", resdata);
            setAll_invoice(resdata)
        }
    }

    useEffect(() => {
        if (party_rec.transition == "Receive") {
            setTransationtype("Payment")
            setPart_list(recive)
        } else if (party_rec.transition == "Payment") {
            setTransationtype("Receive")
            setPart_list(pay)
        }
    }, [party_rec])

    const [show_invoice, setShow_invoice] = useState(false)
    const [invoice_selected, setInvoice_selected] = useState({
        check: false,
        u_id: "",
        invoice_date: "",
        total_carat: "",
        final_amount: "",
        receive_amount: "",
        outstanding_amount: "",
    })

    const [payrec_data, setPayrec_data] = useState([])

    const radio_value = async (e, sub_p) => {
        const invoice = all_invoice.find(id => id.u_id == sub_p);

        if (e.target.checked == true) {
            setShow_data(false)
            setShow_invoice(true)
            setInvoice_selected(invoice);
            const res = await fetch(`${api}Uchinapayrec/Getselectedinvoice`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "u_id": invoice.u_id })
                })
            const res_lot = await res.json()
            setPayrec_data(res_lot)
            console.log(res_lot);
        }
    }

    const [trans_data, setTrans_data] = useState({
        tdate: new Date().toISOString().split('T')[0],
        bank: "",
        tamount: "",
    })

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
        } else if (e.target.name == "bank") {
            setTrans_data({ ...trans_data, [e.target.name]: Math.round(((e.target.value) * 100) / 100) })
            setError_tdata({ ...error_tdata, bank: false })
        } else if (e.target.name == "tamount") {
            setTrans_data({ ...trans_data, [e.target.name]: e.target.value })
            setError_tdata({ ...error_tdata, tamount: false })
        }
    }

    useEffect(() => {
        if (party_rec.transition == "buy") {
            if (trans_data.tamount != 0) {
                setO_amount(Math.round((invoice_selected.outstanding_amount - trans_data.tamount) * 100) / 100)
                if (invoice_selected.outstanding_amount >= trans_data.tamount) {
                    if (trans_data.bank >= trans_data.tamount) {
                        setError_bank({ ...error_bank, b_error: false, o_error: false })
                    } else {
                        setError_bank({ ...error_bank, b_error: true, o_error: false })
                    }
                } else {
                    if (trans_data.bank >= trans_data.tamount) {
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
            const del = payrec_data[0].u_id;
            const res = await fetch(`${api}Uchinapayrec/Delete`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "delete_data_id": del })
                })
            const res_lot = await res.json()
            console.log(res_lot);
            if (res_lot == "Record Delete") {
                setParty_rec({
                    party_name: "",
                    transition: "",
                })
                setShow_invoice(false)
                setTransationtype("")
                setShow_data(false)
                setAll_invoice([])
                setInvoice_selected({
                    check: false,
                    u_id: "",
                    invoice_date: "",
                    total_carat: "",
                    final_amount: "",
                    receive_amount: "",
                    outstanding_amount: ""
                })
                setTrans_data({
                    tdate: new Date().toISOString().split('T')[0],
                    bank: "",
                    tamount: "",
                })
                setO_amount(0)
                setPayrec_data([])
            }
        }
    }

    const data =
    {
        tdate: trans_data.tdate,
        partyname: party_rec.party_name,
        bankname: trans_data.bank.toString(),
        transactiontype: transationtype,
        amount: Math.round((trans_data.tamount) * 100) / 100,
        u_id: invoice_selected.u_id,
        outstandingamount: o_amount,
    }

    const save_data = async () => {
        if (trans_data.tdate == "") {
            setError_tdata({ ...error_tdata, tdate: true });
        } else if (trans_data.bank == "") {
            setError_tdata({ ...error_tdata, bank: true });
        } else if (trans_data.tamount == "") {
            setError_tdata({ ...error_tdata, tamount: true });
        } else if (error_bank.b_error == false &&
            error_bank.o_error == false &&
            trans_data.bank != "" &&
            trans_data.tamount != "" &&
            trans_data.tdate != "" &&
            invoice_selected != {}) {
            const save = await fetch(`${api}Uchinapayrec/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const sell = await save.json()

            if (sell == "Record Saved") {
                toast.success(a, {
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
                    party_name: "",
                    transition: "",
                })
                setShow_invoice(false)
                setTransationtype("")
                setShow_data(false)
                setAll_invoice([])
                setInvoice_selected({
                    check: false,
                    u_id: "",
                    invoice_date: "",
                    total_carat: "",
                    final_amount: "",
                    receive_amount: "",
                    outstanding_amount: ""
                })
                setTrans_data({
                    tdate: new Date().toISOString().split('T')[0],
                    bank: "",
                    tamount: "",
                })
                setO_amount(0)
                setPayrec_data([])
            }
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Uchina_pay_rec
                party_rec={ party_rec }
                error_payrec={ error_payrec }
                party_rec_change={ party_rec_change }
                show_data={ show_data }
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

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Uchinapayrec/Paymentparty`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const pay = await res.json()

    const res_bank = await fetch(`${process.env.API}Uchinapayrec/Receiveparty`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const recive = await res_bank.json()

    return {
        props: {
            "api": process.env.API,
            "pay": pay,
            "recive": recive
        }
    }
}