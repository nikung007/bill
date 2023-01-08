import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'
import Add_Master_Style from '../../../styles/add_master.module.css'
import Link from 'next/link';
const All_kharcha = ({ all, api }) => {

    const router = useRouter()
    const [allData, setAllData] = useState(all);
    const [del_id, setDel_id] = useState("");
    const [pop_delete, setpop_delete] = useState(false);

    const click_edit = (e) => {
        var link_red = router.asPath.replace("all-kharcha", `edit?id=${e}`)
        router.push(link_red)
    }

    const delete_data = (e) => {
        setpop_delete(true);
        setDel_id(e);
    }

    const close_del = () => {
        setpop_delete(false);
        setDel_id("");
    }

    const click_delete = async (e) => {
        setpop_delete(false)
        const res_del = await fetch(`${api}Expense/Delete`,
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
        if (resdelete == "Record Delete") {
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
            setAllData(allData.filter(item => item.id != e));
        } else {
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
        }
    }

    return (
        <div style={ { position: "relative" } }>
            <Toaster position="top-center" reverseOrder={ false } />
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
            <section>
                <div className='card'>
                    <Link href="/transaction/kharacha">
                        <button>New</button>
                    </Link>
                    <table className='result'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>T date</th>
                                <th>T type</th>
                                <th>Bank</th>
                                <th>Kharcha</th>
                                <th>Group</th>
                                <th>Amount</th>
                                <th>RecAmount</th>
                                <th>OutStanding</th>
                                <th>remark</th>
                                <th className='align-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allData.map((ele, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ ele.id }</td>
                                            <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ ele.transactiontype }</td>
                                            <td>{ ele.bankname }</td>
                                            <td>{ ele.kharchname }</td>
                                            <td>{ ele.kharchgroupt }</td>
                                            <td>{ ele.amount }</td>
                                            <td>{ ele.receive_amount }</td>
                                            <td>{ ele.outstanding_amount }</td>
                                            <td>{ ele.remark }</td>
                                            <td>
                                                <div style={ { display: "flex" } }>
                                                    <button
                                                        onClick={ () => click_edit(ele.id) }
                                                        style={ { marginRight: "10px" } }
                                                        className='secondary'>Edit</button>
                                                    <button
                                                        onClick={ () => delete_data(ele.id) }
                                                        className='warning'>Delete</button>
                                                </div>
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

export default All_kharcha

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Expense/Getalldata`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const all = await res.json()
    return {
        props: {
            "api": process.env.API,
            "all": all
        }
    }
}