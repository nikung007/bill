import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
import Uchi from '../../../components/Uchi';

const Index = ({ party, api, bank, bank_name }) => {

    const [uchina, setUchina] = useState({
        tdate: "",
        partyname: "",
        transactiontype: "",
        bankname: "",
        amount: "",
        remark: "",
    })

    const [error, setError] = useState({
        tdate: false,
        partyname: false,
        transactiontype: false,
        bankname: false,
        amount: false,
        remark: false,
    })
    const uchina_change = (e) => {
        setUchina({ ...uchina, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: false })
    }

    const data = {
        tdate: uchina.tdate,
        partyname: uchina.partyname,
        transactiontype: uchina.transactiontype,
        bankname: uchina.bankname,
        amount: Math.round((uchina.amount) * 100) / 100,
        remark: uchina.remark,
        receive_amount: 0,
        outstanding_amount: Math.round((uchina.amount) * 100) / 100,
    }
    const save_data = async () => {
        if (uchina.tdate == "") {
            setError({ ...error, tdate: true })
        } else if (uchina.partyname == "") {
            setError({ ...error, partyname: true })
        } else if (uchina.bankname == "") {
            setError({ ...error, bankname: true })
        } else if (uchina.transactiontype == "") {
            setError({ ...error, transactiontype: true })
        } else if (uchina.amount == "") {
            setError({ ...error, amount: true })
        } else {
            const res = await fetch(`${api}Uchina/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const resdata = await res.json()

            if (resdata == "Record save") {
                toast.success(resdata, {
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
                setUchina({
                    tdate: "",
                    partyname: "",
                    transactiontype: "",
                    bankname: "",
                    amount: "",
                    remark: "",
                })
            }
        }

    }
    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Uchi
                bank_name={ bank_name }
                party={ party }
                bank={ bank.bankname }
                uchina={ uchina }
                error={ error }
                uchina_change={ uchina_change }
                save_data={ save_data } />
        </div>
    )
}

export default Index

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Uchina/Getallparty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const party = await res.json()

    const res_bank_old = await fetch(`${process.env.API}Banktransfer/GetBankname`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const bank = await res_bank_old.json()
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
            "party": party,
            "bank": bank,
            "bank_name": bank_name
        }
    }
}