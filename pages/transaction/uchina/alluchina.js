import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from 'react'

const Alluchina = ({ u_list, api }) => {

    const [list, setList] = useState(u_list)

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
    return (
        <div style={ { width: "70%", margin: "auto" } }>
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
                                list.map((ele) => {
                                    return (
                                        <tr>
                                            <td>{ ele.u_id }</td>
                                            <td>{ ele.partyname }</td>
                                            <td>{ ele.amount }</td>
                                            <td>{ ele.transactiontype }</td>
                                            <td>
                                                <button
                                                    onClick={ () => click_delete(ele.u_id) }
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