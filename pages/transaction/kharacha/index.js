import React, { useState } from 'react'
import KharchaPay from '../../../components/KharchaPay';
import toast, { Toaster } from 'react-hot-toast';

const Index = ({ party, api, bank, bank_name }) => {

    const [kharcha, setKharcha] = useState({
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
    const kharcha_change = (e) => {
        setKharcha({ ...kharcha, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: false })
    }

    const data = {
        tdate: kharcha.tdate,
        partyname: kharcha.partyname,
        transactiontype: kharcha.transactiontype,
        bankname: kharcha.bankname,
        amount: Math.round((kharcha.amount) * 100) / 100,
        remark: kharcha.remark,
        receive_amount: 0,
        outstanding_amount: Math.round((kharcha.amount) * 100) / 100,
    }
    const save_data = async () => {
        if (kharcha.tdate == "") {
            setError({ ...error, tdate: true })
        } else if (kharcha.partyname == "") {
            setError({ ...error, partyname: true })
        } else if (kharcha.bankname == "") {
            setError({ ...error, bankname: true })
        } else if (kharcha.transactiontype == "") {
            setError({ ...error, transactiontype: true })
        } else if (kharcha.amount == "") {
            setError({ ...error, amount: true })
        } else {
            // const res = await fetch(`${api}kharcha/add`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ ...data })
            //     })
            // const resdata = await res.json()

            // if (resdata == "Record save") {
            //     toast.success(resdata, {
            //         style: {
            //             padding: '16px',
            //             color: 'black',
            //             fontWeight: "700",
            //             fontSize: "22px"
            //         },
            //         iconTheme: {
            //             primary: 'green',
            //             secondary: '#ffffff',
            //         },
            //     });
            //     setKharcha({
            //         tdate: "",
            //         partyname: "",
            //         transactiontype: "",
            //         bankname: "",
            //         amount: "",
            //         remark: "",
            //     })
            // }
        }
    }



    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <KharchaPay
                bank_name={ bank_name }
                party={ party }
                bank={ bank.bankname }
                kharcha={ kharcha }
                error={ error }
                kharcha_change={ kharcha_change }
                save_data={ save_data } />
        </div>
    )
}

export default Index

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}kharcha/Getallparty`,
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