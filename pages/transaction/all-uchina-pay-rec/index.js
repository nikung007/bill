import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Uchina_pay_rec from '../../../components/uchina_pay_rec'

const Index = ({ api, res_lot, bank_name }) => {

    const [party_rec, setParty_rec] = useState({
        party_name: "",
        transition: "",
        alluchinapayrec: "",
    });
    const [transationtype, setTransationtype] = useState("");

    const [error_payrec, setError_payrec] = useState({
        party_name: false,
        transition: false
    });
    const [part_list, setPart_list] = useState(res_lot);
    const party_rec_change = (e) => {
        setParty_rec({ ...party_rec, [e.target.name]: e.target.value })
        setError_payrec({ ...error_payrec, [e.target.name]: false })

    };
    const [show_data, setShow_data] = useState(false);
    const [all_invoice, setAll_invoice] = useState([]);
    const [payrec_data, setPayrec_data] = useState([]);
    const [show_invoice, setShow_invoice] = useState(false);
    const [invoice_selected, setInvoice_selected] = useState({});
    const [trans_data, setTrans_data] = useState({
        tdate: new Date().toISOString().split('T')[0],
        bankName: "",
        tamount: "",
    });
    const [bank, setBank] = useState(0)
    const [error_tdata, setError_tdata] = useState({
        tdate: false,
        bank: false,
        tamount: false,
    });
    const [error_bank, setError_bank] = useState({
        o_error: false,
        b_error: false,
    });
    const [o_amount, setO_amount] = useState(0);
    const [pop_delete, setpop_delete] = useState(false);

    const click_show = async () => {
        if (party_rec.transition == "") {
            setError_payrec({ ...error_payrec, transition: true })
        } else if (party_rec.party_name == "") {
            setError_payrec({ ...error_payrec, party_name: true })
        } else {
            const res = await fetch(`${api}Alluchinapayrec/Getalluchinalist`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        transactiontype: party_rec.transition,
                        partyname: party_rec.party_name,
                        alluchinapayrec: party_rec.alluchinapayrec
                    })
                })
            const resdata = await res.json()
            setShow_data(true)

            setAll_invoice(resdata)
        }
    }

    useEffect(() => {
        setShow_invoice(false)
        setPayrec_data([])
        if (party_rec.transition == "Receive") {
            setTransationtype("Payment")
        } else if (party_rec.transition == "Payment") {
            setTransationtype("Receive")
        }
    }, [party_rec])

    const radio_value = async (e, sub_p) => {
        const invoice = all_invoice.find(id => id.u_id == sub_p);

        if (e.target.checked == true) {
            setShow_data(false)
            setShow_invoice(true)
            setInvoice_selected(invoice);
            const res = await fetch(`${api}Alluchinapayrec/Getuchinaalltransaction`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "all_id": party_rec.alluchinapayrec == "guchina" ?
                            parseInt(invoice.u_id)
                            : party_rec.alluchinapayrec == "tuchina" ?
                                parseInt(invoice.t_id)
                                : party_rec.alluchinapayrec == "vuchina" ?
                                    parseInt(invoice.v_id) : null,
                        "alluchinapayrec": party_rec.alluchinapayrec,
                    })
                })
            const res_lot = await res.json()
            // console.log(res_lot)
            setPayrec_data(res_lot)

        }
    }

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
        if (party_rec.alluchinapayrec == "guchina") {
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
        }
        else if (party_rec.alluchinapayrec == "tuchina") {
            if (trans_data.tamount != 0) {
                setO_amount(Math.round((invoice_selected.outstandingamount - trans_data.tamount) * 100) / 100)
                if (invoice_selected.outstandingamount >= trans_data.tamount) {
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
        } else if (party_rec.alluchinapayrec == "vuchina") {
            if (trans_data.tamount != 0) {
                setO_amount(Math.round((invoice_selected.outstandingamount - trans_data.tamount) * 100) / 100)
                if (invoice_selected.outstandingamount >= trans_data.tamount) {
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
        }
    }, [trans_data])

    const click_cansal = () => {
        setShow_data(false)

    }

    const click_delte = async () => {
        setpop_delete(false)
        if (payrec_data.length != 0) {
            const del = payrec_data[0].u_id;
            const res = await fetch(`${api}Alluchinapayrec/Delete`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "delete_data_id": del })
                })
            const res_lot = await res.json()

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

    const data = {
        tdate: trans_data.tdate,
        partyname: party_rec.party_name,
        transactiontype: transationtype,
        bankname: trans_data.bankName,
        amount: Math.round((trans_data.tamount) * 100) / 100,
        all_id: show_invoice ?
            party_rec.alluchinapayrec == "guchina" ? invoice_selected.u_id :
                party_rec.alluchinapayrec == "tuchina" ? invoice_selected.t_id :
                    party_rec.alluchinapayrec == "vuchina" ? invoice_selected.v_id : null : null,
        outstandingamount: o_amount,
        alluchinapayrec: trans_data.alluchinapayrec,
        uchina_type: party_rec.alluchinapayrec,
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
            const save = await fetch(`${api}Alluchinapayrec/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const sell = await save.json()

            if (sell == "Saved") {
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

    const delete_data = (e) => {
        setpop_delete(true);
    }

    const close_del = () => {
        setpop_delete(false);
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Uchina_pay_rec
                bank_name={ bank_name }
                party_rec={ party_rec }
                bank={ bank }
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
                pop_delete={ pop_delete }
                delete_data={ delete_data }
                close_del={ close_del }
            />
        </div>
    )
}

export default Index

export async function getServerSideProps({ query }) {
    const res = await fetch(`${process.env.API}Alluchinapayrec/Getparty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ok: "ok"
            })
        })
    const res_lot = await res.json()

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
            "res_lot": res_lot,
            "bank_name": bank_name,
        }
    }
}