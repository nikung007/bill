import Link from 'next/link'
import React, { useState } from 'react'

const Allpay_rec = ({ resdata, api }) => {

    const [all_pay_rec, setAll_pay_rec] = useState(resdata)
    const click_delete = async (e) => {

        const res_del = await fetch(`${api}Banktransfer/Delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    delete_data_id: e
                })
            })
        const resdelete = await res_del.json()
        if (resdelete == "Delete Record Succesfully") {
            setAll_pay_rec(all_pay_rec.filter(item => item.id !== e));
        }
    }

    return (
        <div style={ { width: "70%", margin: "auto" } }>
            <section>
                <div style={ { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" } }>
                    <Link href="/transaction/interchange">
                        <button>New Interchange</button>
                    </Link>
                    <h1 style={ { margin: "0" } }>All Interchange Balance</h1>
                    <div></div>
                </div>
            </section>
            <section>
                <div className="card">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Select Date</th>
                                <th>Payment Bank</th>
                                <th>AmountPay</th>
                                <th>Receive Bank</th>
                                <th>AmountRes</th>
                                <th style={ { textAlign: "center" } }>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                all_pay_rec.map((ele, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ ele.id }</td>
                                            <td>{ ele.tdate.split("T")[0] }</td>
                                            <td>{ ele.paybankname }</td>
                                            <td>{ ele.payamount }</td>
                                            <td>{ ele.recbankname }</td>
                                            <td>{ ele.recamount }</td>
                                            <td>
                                                <button
                                                    onClick={ () => click_delete(ele.id) }
                                                    className='warning'>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Allpay_rec

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Banktransfer/Getlist`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const resdata = await res.json()

    return {
        props: {
            "api": process.env.API,
            "resdata": resdata
        }
    }
}