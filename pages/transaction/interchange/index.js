import React, { useEffect, useState } from 'react'
import Inter_change from '../../../components/inter_change'
import toast, { Toaster } from 'react-hot-toast';


const Index = ({ api, bank, bank_name }) => {

    const [interchange, setInterchange] = useState({
        date_today: "",
        pay_bank: "",
        rec_bank: "",
        pay_amount: "",
        rec_amount: "",
        remark: "",
    });
    const [interchange_error, setInterchange_error] = useState({
        date_today: false,
        pay_bank: false,
        rec_bank: false,
        pay_amount: false,
        remark: false,
    });

    const interchange_change = (e) => {
        if (e.target.name == "rec_bank") {
            const val = e.target.value.split('-')[1];
            const rate = bank.exRate[0].diramexrate;
            const pay_b = interchange.pay_bank.split('-')[1];
            setInterchange_error({ ...interchange_error, [e.target.name]: false })
            if (val == "AED" && pay_b == "USD") {
                setInterchange({ ...interchange, rec_bank: e.target.value, rec_amount: Math.round(((Math.round((interchange.pay_amount) * 100) / 100) * rate) * 100) / 100 })
            } else if (val == "USD" && pay_b == "AED") {
                setInterchange({ ...interchange, rec_bank: e.target.value, rec_amount: Math.round(((Math.round((interchange.pay_amount) * 100) / 100) / rate) * 100) / 100 })
            } else if (val == "AED" && pay_b == "AED" || val == "USD" && pay_b == "USD" || val == "" && pay_b == "") {
                setInterchange({ ...interchange, rec_bank: e.target.value, rec_amount: Math.round((interchange.pay_amount) * 100) / 100 })
            } else {
                setInterchange({ ...interchange, rec_bank: e.target.value })
            }
        } else if (e.target.name == "pay_bank") {
            const val = e.target.value.split('-')[1];
            const rate = bank.exRate[0].diramexrate;
            const rec_b = interchange.rec_bank.split('-')[1];
            setInterchange_error({ ...interchange_error, [e.target.name]: false })
            if (val == "AED" && rec_b == "USD") {
                setInterchange({ ...interchange, pay_bank: e.target.value, rec_amount: Math.round(((Math.round((interchange.rec_bank) * 100) / 100) * rate) * 100) / 100 })
            } else if (val == "USD" && rec_b == "AED") {
                setInterchange({ ...interchange, pay_bank: e.target.value, rec_amount: Math.round(((Math.round((interchange.rec_bank) * 100) / 100) / rate) * 100) / 100 })
            } else if (val == "AED" && rec_b == "AED" || val == "USD" && rec_b == "USD" || val == "" && rec_b == "") {
                setInterchange({ ...interchange, pay_bank: e.target.value, rec_amount: Math.round((interchange.rec_bank) * 100) / 100 })
            } else {
                setInterchange({ ...interchange, pay_bank: e.target.value })
            }
        } else if (e.target.name == "pay_amount") {
            const val = interchange.rec_bank.split('-')[1];
            const rate = bank.exRate[0].diramexrate;
            const rec_b = interchange.pay_bank.split('-')[1];
            setInterchange_error({ ...interchange_error, [e.target.name]: false })
            if (val == "AED" && rec_b == "USD") {
                setInterchange({ ...interchange, pay_amount: e.target.value, rec_amount: Math.round(((Math.round((e.target.value) * 100) / 100) * rate) * 100) / 100 })
            } else if (val == "USD" && rec_b == "AED") {
                setInterchange({ ...interchange, pay_amount: e.target.value, rec_amount: Math.round(((Math.round((e.target.value) * 100) / 100) / rate) * 100) / 100 })
            } else if (val == "AED" && rec_b == "AED" || val == "USD" && rec_b == "USD" || val == "" && rec_b == "") {
                setInterchange({ ...interchange, pay_amount: e.target.value, rec_amount: Math.round((e.target.value) * 100) / 100 })
            } else {
                setInterchange({ ...interchange, pay_amount: e.target.value })
            }
        } else {
            setInterchange({ ...interchange, [e.target.name]: e.target.value })
            setInterchange_error({ ...interchange_error, [e.target.name]: false })
        }
    }

    const data = {
        tdate: interchange.date_today,
        paybankname: interchange.pay_bank,
        recbankname: interchange.rec_bank,
        payamount: Math.round((interchange.pay_amount) * 100) / 100,
        recamount: interchange.rec_amount,
        remark: interchange.remark,
    }

    const save_data = async () => {
        if (interchange.date_today == "") {
            setInterchange_error({ ...interchange_error, date_today: true })
        } else if (interchange.pay_bank == "") {
            setInterchange_error({ ...interchange_error, pay_bank: true })
        } else if (interchange.rec_bank == "") {
            setInterchange_error({ ...interchange_error, rec_bank: true })
        } else if (interchange.pay_amount == "" && interchange.pay_amount == 0) {
            setInterchange_error({ ...interchange_error, pay_amount: true })
        } else {
            const res = await fetch(`${api}Banktransfer/add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const resdata = await res.json()
            if (resdata == "Add data Succesfully") {
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
                setInterchange({
                    date_today: "",
                    pay_bank: "",
                    rec_bank: "",
                    pay_amount: "",
                    rec_amount: "",
                    remark: "",
                })
            }
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Inter_change
                interchange={ interchange }
                interchange_error={ interchange_error }
                bank={ bank }
                bank_name={ bank_name }
                interchange_change={ interchange_change }
                save_data={ save_data }
            />

        </div>
    )
}

export default Index

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Banktransfer/GetBankname`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const bank = await res.json()

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
            "bank": bank,
            "bank_name": bank_name
        }
    }
}