import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast';
import Add_Master_Style from '../../../styles/add_master.module.css'


const Allsell = ({ resdata, api }) => {
    console.log("resdata", resdata);
    const router = useRouter()

    const [all_sell, setAll_sell] = useState(resdata);
    const [pop_delete, setpop_delete] = useState(false);
    const [del_id, setDel_id] = useState("");

    const search_change = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = all_sell.filter((item) => {
                return Object.values(item?.party_name.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            resdata.map((dataItem) => searchingData.push(dataItem));
        }
        setAll_sell(searchingData);
    }

    const click_delete = async (e) => {
        setpop_delete(false)
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

        if (resdelete == "Record Delete Succesfully") {
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
            setAll_sell(all_sell.filter(item => item.s_id !== e));
        }
    }

    const click_edit = async (e) => {
        const res = await fetch(`${api}Sell/Edit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: e
                })
            })
        const resdata = await res.json()

        if (resdata == "invoice use transaction") {
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
        } else {
            var link_red = router.asPath.replace("allsell", `edit?id=${e}`)
            router.push(link_red)
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
        <div className={ `${Add_Master_Style.delete_main}` }>
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
                <div style={ { display: "flex", alignItems: "center", width: "100%" } }>
                    <div style={ { marginTop: "20px" } }>
                        <Link href="/transaction/sell">
                            <button style={ { background: "#0B3ACC" } }>New Sell Form</button>
                        </Link>
                    </div>
                    <div style={ { margin: "20px 0 0 20px", width: "100%" } }>
                        <input
                            onChange={ search_change }
                            placeholder='Search Sell Party Name'
                            style={ { minHeight: "3.6rem" } }
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
                                <th>AddCarat</th>
                                <th>LessCarat</th>
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
                                            <td>{ ele.invoice_date.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ ele.total_carat }</td>
                                            <td>{ ele.add_carat }</td>
                                            <td>{ ele.less_carat }</td>
                                            <td>{ ele.final_amount }</td>

                                            <td><button onClick={ () => click_edit(ele.s_id) } className='secondary'>Edit</button></td>

                                            <td><button
                                                className='warning'
                                                onClick={ () => delete_data(ele.s_id) }>Delete</button></td>
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

export async function getServerSideProps({ query }) {

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
