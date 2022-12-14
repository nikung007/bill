import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
import Add_Master_Style from '../../../styles/add_master.module.css'
const Allpay_rec = ({ resdata, api }) => {

    const [all_pay_rec, setAll_pay_rec] = useState(resdata);
    const [pop_delete, setpop_delete] = useState(false);
    const [del_id, setDel_id] = useState("");

    const click_delete = async (e) => {
        setpop_delete(false)
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
            toast.success(resdelete, {
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
            setAll_pay_rec(all_pay_rec.filter(item => item.id !== e));
        }
    }

    const delete_data = (e) => {
        setpop_delete(true);
        setDel_id(e);
    }

    const close_del = () => {
        setpop_delete(false);
        setDel_id("");
    }

    return (
        <div style={ { width: "70%", margin: "auto" } } className={ `${Add_Master_Style.delete_main}` }>
            {
                pop_delete ?
                    <div className={ `${Add_Master_Style.delete}` }>
                        <h1>Are you sure delete ?</h1>
                        <div className={ `${Add_Master_Style.delete_button}` }>
                            <button className='secondary' onClick={ close_del }>
                                Cancel
                            </button>
                            <button className='warning' onClick={ () => click_delete(del_id) }>
                                Conform
                            </button>
                        </div>
                    </div>
                    : null
            }
            <Toaster position="top-center" reverseOrder={ false } />
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
                                            <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ ele.paybankname }</td>
                                            <td>{ ele.payamount }</td>
                                            <td>{ ele.recbankname }</td>
                                            <td>{ ele.recamount }</td>
                                            <td>
                                                <button
                                                    onClick={ () => delete_data(ele.id) }
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