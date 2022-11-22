import React, { useState } from 'react'
import Uchi from '../../../components/Uchi';

const Index = ({ party, api, bank }) => {

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
            console.log(resdata);
            if (resdata == "Record save") {
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
            <Uchi
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

    const res_bank = await fetch(`${process.env.API}Banktransfer/GetBankname`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const bank = await res_bank.json()

    return {
        props: {
            "api": process.env.API,
            "party": party,
            "bank": bank
        }
    }
}