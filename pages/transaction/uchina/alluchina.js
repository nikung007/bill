import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'
import Add_Master_Style from '../../../styles/add_master.module.css'
const Alluchina = ({ u_list, api }) => {

    const [list, setList] = useState(u_list);
    const [pop_delete, setpop_delete] = useState(false);
    const [del_id, setDel_id] = useState("");

    const search_change = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = list.filter((item) => {
                return Object.values(item?.partyname.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            u_list.map((dataItem) => searchingData.push(dataItem));
        }
        setList(searchingData);
    }

    const click_delete = async (e) => {
        setpop_delete(false)
        const res_del = await fetch(`${api}Uchina/Delete`,
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
            setList(list.filter(item => item.u_id !== e));
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
                    <Link href="/transaction/uchina">
                        <button>New Uchina</button>
                    </Link>
                    <h1 style={ { margin: "0" } }>All Uchina Balance</h1>
                    <div></div>
                </div>
            </section>

            <section>
                <div className="card">
                    <input
                        onChange={ search_change }
                        placeholder='Search Purchase Party Name'
                        style={ { minHeight: "3.6rem" } }
                        type="search" />
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Payment Name</th>
                                <th>Amount</th>
                                <th>Transaction Type</th>
                                <th style={ { textAlign: "center" } }>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map((ele, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ ele.u_id }</td>
                                            <td>{ ele.partyname }</td>
                                            <td>{ ele.amount }</td>
                                            <td>{ ele.transactiontype }</td>
                                            <td>
                                                <button
                                                    onClick={ () => delete_data(ele.u_id) }
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

export default Alluchina

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Uchina/Getalllist`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const u_list = await res.json()
    return {
        props: {
            "api": process.env.API,
            "u_list": u_list
        }
    }
}