
import Link from 'next/link';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router'

const Allpurchase = ({ resdata, api }) => {
    const router = useRouter()

    const [all_purchase, setAll_purchase] = useState(resdata);

    const search_change = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = all_purchase.filter((item) => {
                return Object.values(item?.party_name.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            resdata.map((dataItem) => searchingData.push(dataItem));
        }
        setAll_purchase(searchingData);
    }

    const click_delete = async (e) => {

        const res_del = await fetch(`${api}Purchase/Delete`,
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
        if (resdelete == "Record Delete SuccesfullY") {
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
            setAll_purchase(all_purchase.filter(item => item.p_id !== e));
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



    const click_edit = async (e) => {
        const res = await fetch(`${api}Purchase/Edit`,
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
            var link_red = router.asPath.replace("allpurchase", `edit?id=${e}`)
            router.push(link_red)
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <section>
                <div style={ { display: "flex", alignItems: "center", width: "100%" } }>
                    <div style={ { marginTop: "20px" } }>
                        <Link href="/transaction/purchase">
                            <button style={ { background: "#0B3ACC" } }>New Purchase Form</button>
                        </Link>
                    </div>
                    <div style={ { margin: "20px 0 0 20px", width: "100%" } }>
                        <input
                            onChange={ search_change }
                            placeholder='Search Purchase Party Name'
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
                                <th>Total Final Amount</th>
                                <th colSpan="2" style={ { textAlign: "center" } }>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                all_purchase.map((ele, index) => {
                                    return (
                                        <tr key={ index }>
                                            <td>{ ele.p_id }</td>
                                            <td>{ ele.party_name }</td>
                                            <td>{ ele.invoice_date.split("T")[0].split("-").reverse().join("-") }</td>
                                            <td>{ ele.total_carat }</td>
                                            <td>{ ele.final_amount }</td>

                                            <td><button onClick={ () => click_edit(ele.p_id) } className='secondary'>Edit</button></td>

                                            <td><button
                                                className='warning'
                                                onClick={ () => click_delete(ele.p_id) }>Delete</button></td>
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

export default Allpurchase

export async function getServerSideProps({ query }) {

    const res = await fetch(`${process.env.API}Purchase/Getlist`,
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
