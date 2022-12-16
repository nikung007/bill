import React, { useEffect, useState } from 'react'
import All_Uchina from '../../styles/all_uchina.module.css'
const All_uchina = ({ api }) => {

    const [allUchina, setAllUchina] = useState({
        alluchinapayrec: "",
        party_name: "",
    })

    const [part_list, setPart_list] = useState([])
    const [error_allUchina, setError_allUchina] = useState({
        alluchinapayrec: false,
        party_name: false,
    })

    const allUchinaChange = (e) => {
        setAllUchina({ ...allUchina, [e.target.name]: e.target.value })
        setError_allUchina({ ...error_allUchina, [e.target.name]: false })
    }
    const all_party = (e) => {
        if (e.target.checked == true) {
            setAllUchina({ ...allUchina, party_name: "all" })
        } else {
            setAllUchina({ ...allUchina, party_name: "" })
        }
    }
    const [all_data, setAll_data] = useState([])
    useEffect(() => {
        if (allUchina.alluchinapayrec != "") {
            async function fetchMyAPI() {
                const res = await fetch(`${api}Report/Selectuchinadetail`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uchina_Type: allUchina.alluchinapayrec
                        })
                    })
                const res_lot = await res.json()
                setPart_list(res_lot)
                setAll_data([])
            }
            fetchMyAPI()
        }
    }, [allUchina])

    const click_show = async () => {
        if (allUchina.alluchinapayrec == "") {
            setError_allUchina({ ...error_allUchina, alluchinapayrec: true })
        } else if (allUchina.party_name == null || allUchina.party_name == "") {
            setError_allUchina({ ...error_allUchina, party_name: true })
        } else {

        }
        const res = await fetch(`${api}Report/Getselecteddetail`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uchina_Type: allUchina.alluchinapayrec,
                    party_name: allUchina.party_name,
                })
            })

        const res_lot = await res.json()
        setAll_data(res_lot)

    }

    return (
        <section>
            <div className={ `card ${All_Uchina.pay_rec_heading}` }>
                <h4>All Uchian Pay Rec Report</h4>
                <article>
                    <label style={ { width: "10%" } }>Uchina Type</label>
                    <div className={ `column two` }>
                        <select
                            value={ allUchina.alluchinapayrec }
                            name='alluchinapayrec'
                            onChange={ allUchinaChange }>
                            <option value="">Select</option>
                            <option value="guchina">GamUchina</option>
                            <option value="tuchina">TradingUchina</option>
                            <option value="vuchina">ViaUchina</option>
                        </select>
                    </div>
                    { error_allUchina.alluchinapayrec ? <label style={ { color: "red", marginLeft: "45px", position: "absolute" } }>Plasese select</label> : null }
                    <div className={ `column four` }>
                        <div className={ `${All_Uchina.pay_rec_filds}` }>
                            <label style={ { width: "80%" } }>Party Name</label>
                            <select
                                value={ allUchina.party_name }
                                style={ { width: "160%" } }
                                name='party_name'
                                onChange={ allUchinaChange }
                            >
                                <option value="">Select Party Name</option>
                                {
                                    part_list.map((ele, index) => {
                                        return (
                                            <option key={ index } value={ ele }>{ ele }</option>
                                        )
                                    })
                                }
                                <option value="all">All</option>
                            </select>
                        </div>
                        { error_allUchina.party_name ? <label style={ { color: "red", marginLeft: "110px", position: "absolute" } }>Plasese select</label> : null }
                    </div>
                    <div className={ `${All_Uchina.show_button_pyrec}` }>
                        <label><input type="checkbox" onChange={ all_party } /> All party</label>
                    </div>
                    <div className={ `${All_Uchina.show_button_pyrec}` }>
                        <button
                            onClick={ click_show }
                            className='warning'>Show Uchina List</button>
                    </div>
                </article>
                {
                    allUchina.alluchinapayrec == "guchina" ?
                        <article>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Partyname</th>
                                        <th>T-Date</th>
                                        <th>T-type</th>
                                        <th>R-Amount</th>
                                        <th>Bankname</th>
                                        <th>Amount</th>
                                        <th>O-amount</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        all_data.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.u_id }</td>
                                                    <td>{ ele.partyname }</td>
                                                    <td>{ ele.tdate.split("T")[0].split("-").reverse().join("-") }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.receive_amount }</td>
                                                    <td>{ ele.bankname }</td>
                                                    <td>{ ele.amount }</td>
                                                    <td>{ ele.outstanding_amount }</td>
                                                    <td>{ ele.remark }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </article> : null
                }
                {
                    allUchina.alluchinapayrec == "tuchina" ?
                        <article>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Partyname</th>
                                        <th>T-type</th>
                                        <th>R-Amount</th>
                                        <th>O-amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        all_data.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.t_id }</td>
                                                    <td>{ ele.buypartyname }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.recamount }</td>
                                                    <td>{ ele.outstandingamount }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </article>
                        : null
                }
                {
                    allUchina.alluchinapayrec == "vuchina" ?
                        <article>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>VayaPartyname</th>
                                        <th>T-type</th>
                                        <th>Partyname</th>
                                        <th>R-Amount</th>
                                        <th>PayAmount</th>
                                        <th>O-amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        all_data.map((ele, index) => {
                                            return (
                                                <tr key={ index }>
                                                    <td>{ ele.v_id }</td>
                                                    <td>{ ele.vaipartyname == "0" ? "-" : ele.vaipartyname }</td>
                                                    <td>{ ele.transactiontype }</td>
                                                    <td>{ ele.partyname }</td>
                                                    <td>{ ele.recamount }</td>
                                                    <td>{ ele.payamount }</td>
                                                    <td>{ ele.outstandingamount }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </article> : null
                }
            </div>
        </section>
    )
}

export default All_uchina

export async function getServerSideProps() {

    return {
        props: {
            "api": process.env.API,
        }
    }
}