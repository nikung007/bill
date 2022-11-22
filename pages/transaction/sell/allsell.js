import Link from 'next/link'
import React, { useState } from 'react'

const Allsell = ({ resdata, api }) => {

    // console.log(resdata);

    const [all_sell, setAll_sell] = useState(resdata)
    const click_delete = async (e) => {

        const res_del = await fetch(`${api}Sell/Delete`,
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
        console.log(resdelete);
        if (resdelete == "Record Delete Succesfully") {
            setAll_sell(all_sell.filter(item => item.s_id !== e));
        }
    }
    return (
        <div>
            <section>
                <div style={ { display: "flex", alignItems: "center" } }>
                    <div style={ { marginTop: "20px" } }>
                        <Link href="/transaction/sell">
                            <button style={ { background: "#0B3ACC" } }>New Sell Form</button>
                        </Link>
                    </div>
                    <div style={ { margin: "20px 0 0 20px" } }>
                        <input
                            placeholder='Search Sell Party Name'
                            style={ { minHeight: "3.6rem", width: "350px" } }
                            type="search" />
                    </div>
                </div>
            </section>
            <section>
                <div className='card'>
                    <hr style={ { marginTop: "10px" } } />
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Party Name</th>
                                <th>Invoice Date</th>
                                <th>Total Carat</th>
                                <th>Total Final Amount</th>
                                <th colSpan="2" style={ { textAlign: "center" } }>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                all_sell.map((ele, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ ele.s_id }</td>
                                            <td>{ ele.party_name }</td>
                                            <td>{ ele.invoice_date.split("T")[0] }</td>
                                            <td>{ ele.total_carat }</td>
                                            <td>{ ele.final_amount }</td>
                                            <Link href={ `/transaction/sell/edit?id=${ele.s_id}` }>
                                                <td><button className='secondary'>Edit</button></td>
                                            </Link>
                                            <td><button
                                                className='warning'
                                                onClick={ () => click_delete(ele.s_id) }>Delete</button></td>
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

export default Allsell

export async function getserversideprops({ query }) {

    const res = await fetch(`${process.env.API}Sell/Getlist`,
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
