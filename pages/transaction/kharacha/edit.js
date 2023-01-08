import React, { useState } from 'react'
import KharchaPay from '../../../components/KharchaPay';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'

function Edit({ resdata, bank_name, party, api }) {
    const router = useRouter()

    const [kharcha, setKharcha] = useState({
        id: resdata.id,
        tdate: resdata.tdate.split("T")[0],
        kharchaname: resdata.kharchname,
        transactiontype: resdata.transactiontype,
        bankname: resdata.bankname,
        amount: resdata.amount,
        remark: resdata.remark,
    })

    const [error, setError] = useState({
        tdate: false,
        kharchaname: false,
        transactiontype: false,
        bankname: false,
        amount: false,
        kharcha_group: false,
        remark: false,
    })
    const [kharcha_group, setKharcha_group] = useState(resdata.kharchgroupt)

    const kharcha_change = async (e) => {
        if (e.target.name == "kharchaname") {
            setKharcha({ ...kharcha, [e.target.name]: e.target.value })
            const res = await fetch(`${api}Expense/Getgroup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ kharch_name: e.target.value })
                })
            const resdata = await res.json()
            setKharcha_group(resdata)

        } else {
            setKharcha({ ...kharcha, [e.target.name]: e.target.value })
        }
        setError({ ...error, [e.target.name]: false })
    }

    const data = {
        id: kharcha.id,
        tdate: kharcha.tdate,
        kharchname: kharcha.kharchaname,
        transactiontype: kharcha.transactiontype,
        bankname: kharcha.bankname,
        amount: Math.round((kharcha.amount) * 100) / 100,
        remark: kharcha.remark,
        kharchgroupt: kharcha_group,
        outstanding_amount: Math.round((kharcha.amount) * 100) / 100,
        receive_amount: 0
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
            const res = await fetch(`${api}Expense/Update`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const resdata = await res.json()

            if (resdata == "Record Update") {
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
                router.push("/transaction/kharacha/all-kharcha")
            }
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <KharchaPay
                bank_name={ bank_name }
                party={ party }
                kharcha={ kharcha }
                error={ error }
                kharcha_group={ kharcha_group }
                kharcha_change={ kharcha_change }
                save_data={ save_data }
                savename="Update" />
        </div>
    )
}

export default Edit

export async function getServerSideProps({ query }) {
    const res = await fetch(`${process.env.API}Expense/Edit`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: query.id
            })
        })
    const resdata = await res.json()
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
    const resp = await fetch(`${process.env.API}Expense/Getalllist`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const party = await resp.json()

    return {
        props: {
            "api": process.env.API,
            "resdata": resdata,
            "bank_name": bank_name,
            "party": party
        }
    }
}