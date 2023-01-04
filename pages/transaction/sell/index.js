import React, { useEffect, useState } from 'react'
import Sell from '../../../components/sell'
import toast, { Toaster } from 'react-hot-toast';

const Index = ({ sell, api, allParty }) => {

    const [sell_data, setSell_data] = useState({
        id: sell.s_id,
        invoice_number: "",
        party_name: "",
        invoice_date: new Date().toISOString().split('T')[0],
        terms: 0,
        remark: "",
    })
    const [error_sell_data, setError_sell_data] = useState({
        party_name: false,
        invoice_date: false,
        terms: false
    })
    const [get_lot, setGet_lot] = useState({
        extra: "",
        type: "",
        artical: ""
    })
    const [error_get_lot, setError_get_lot] = useState({
        extra: false,
        type: false,
        artical: false,
        show_sell: false
    })
    const [show_button, setShow_button] = useState(true)
    const [all_lot_data, setAll_lot_data] = useState([])
    const [all_lot_serch, setall_lot_serch] = useState([])
    const [new_sell_lot, setNew_sell_lot] = useState([])
    const [show_lot, setShow_lot] = useState(false)
    const [lot_show, setLot_show] = useState(false)
    const [new_Amount, setNew_Amount] = useState("")
    const [persent, setPersent] = useState(0)
    const [disable_diff, setDisable_diff] = useState({
        add_diff: false,
        min_diff: false
    })
    const [difference, setDifference] = useState({
        add_difference: "",
        minus_difference: "",
    })
    const [set_d, setSet_d] = useState(false)
    const [vaya, setVaya] = useState({
        vaya1_name: "",
        vaya1_value: 0,
        vaya2_name: "",
        vaya2_value: 0,
        vaya3_name: "",
        vaya3_value: 0,
        vaya4_name: "",
        vaya4_value: 0,
    })
    const vaya_change = (e) => {
        setVaya({ ...vaya, [e.target.name]: e.target.value });
    }

    const edit_disable = false;

    const sell_change = (e) => {
        setSell_data({ ...sell_data, [e.target.name]: e.target.value })
        setError_sell_data({ ...error_sell_data, [e.target.name]: false })
    }

    const get_change = (e) => {
        setGet_lot({ ...get_lot, [e.target.name]: e.target.value })
        setError_get_lot({ ...error_get_lot, [e.target.name]: false })
    }
    const edit_ooo = false;
    var days = sell_data.terms;
    var new_date = new Date(sell_data.invoice_date);
    new_date.setDate(new_date.getDate() + parseInt(days));
    let d = new Date(new_date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    const due_date_now = `${year}-${month}-${day}`

    useEffect(() => {

        if (get_lot.artical != "" && get_lot.extra != "" && get_lot.type != "") {
            setShow_button(false)
            async function fetchMyAPI() {
                const res = await fetch(`${api}Sell/Selectlot`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            extra: get_lot.extra,
                            type: get_lot.type,
                            artical: get_lot.artical,
                            sell_lot: 0
                        })
                    })
                const res_lot = await res.json()

                setAll_lot_data(res_lot.map((ok) => ({
                    check: false,
                    amount: ok.amount,
                    artical: ok.artical,
                    carat: ok.carat,
                    extra: ok.extra,
                    invoice_no: ok.invoice_no,
                    is_delete: ok.is_delete,
                    lot_id: ok.lot_id,
                    p_id: ok.p_id,
                    party_name: ok.party_name,
                    price: ok.price,
                    sell_lot: ok.sell_lot,
                    sub_p_id: ok.sub_p_id,
                    type: ok.type
                })))
                setall_lot_serch(res_lot.map((ok) => ({
                    check: false,
                    amount: ok.amount,
                    artical: ok.artical,
                    carat: ok.carat,
                    extra: ok.extra,
                    invoice_no: ok.invoice_no,
                    is_delete: ok.is_delete,
                    lot_id: ok.lot_id,
                    p_id: ok.p_id,
                    party_name: ok.party_name,
                    price: ok.price,
                    sell_lot: ok.sell_lot,
                    sub_p_id: ok.sub_p_id,
                    type: ok.type
                })))
            }
            fetchMyAPI()
            setNew_sell_lot([])
        } else {
            setShow_button(true)
        }
    }, [get_lot])

    const click_show_lot = () => {
        if (get_lot.artical == "") {
            setError_get_lot({ ...error_get_lot, artical: true })
        } else if (get_lot.extra == "") {
            setError_get_lot({ ...error_get_lot, extra: true })
        } else if (get_lot.type == "") {
            setError_get_lot({ ...error_get_lot, type: true })
        } else {
            setShow_lot(true)
        }
    }

    const [fix, setFix] = useState(0)
    const fix_set = (e) => {
        setFix(e.target.value)
    }

    const checkbox_value = (e, sub_p) => {
        const ok = all_lot_data.find(id => id.sub_p_id == sub_p)

        if (e.target.checked == true) {
            if (persent == "") {
                setNew_sell_lot(current =>
                    [...current,
                    {
                        amount: ok.amount,
                        artical: ok.artical,
                        carat: ok.carat,
                        extra: ok.extra,
                        invoice_no: ok.invoice_no,
                        is_delete: ok.is_delete,
                        lot_id: ok.lot_id,
                        p_id: ok.p_id,
                        party_name: ok.party_name,
                        price: ok.price,
                        sell_lot: ok.sell_lot,
                        sub_p_id: ok.sub_p_id,
                        type: ok.type,
                        new_amount: ok.amount,
                        new_price: ok.price
                    }]);
                setAll_lot_data(current =>
                    current.map(obj => {
                        if (obj.sub_p_id === sub_p) {
                            return { ...obj, check: true };
                        }
                        return obj;
                    }),
                );
            }
            else if (persent != "") {
                setNew_sell_lot(current =>
                    [...current,
                    {
                        amount: ok.amount,
                        artical: ok.artical,
                        carat: ok.carat,
                        extra: ok.extra,
                        invoice_no: ok.invoice_no,
                        is_delete: ok.is_delete,
                        lot_id: ok.lot_id,
                        p_id: ok.p_id,
                        party_name: ok.party_name,
                        price: ok.price,
                        sell_lot: ok.sell_lot,
                        sub_p_id: ok.sub_p_id,
                        type: ok.type,
                        new_amount: ((Math.round((persent) * 100) / 100) * ok.amount) / 100 + ok.amount,
                        new_price: ((Math.round((persent) * 100) / 100) * ok.price) / 100 + ok.price,
                    }]);
                setAll_lot_data(current =>
                    current.map(obj => {
                        if (obj.sub_p_id === sub_p) {
                            return { ...obj, check: true };
                        }
                        return obj;
                    }),
                );
            }
        } else {
            setNew_sell_lot(new_sell_lot.filter((ele) => ele.sub_p_id !== sub_p))
            setAll_lot_data(current =>
                current.map(obj => {
                    if (obj.sub_p_id === sub_p) {
                        return { ...obj, check: false };
                    }
                    return obj;
                }),
            );
        }
    }

    const remove_lot = (sub_p) => {
        setNew_sell_lot(new_sell_lot.filter((ele) => ele.sub_p_id !== sub_p))
        setAll_lot_data(current =>
            current.map(obj => {
                if (obj.sub_p_id === sub_p) {
                    return { ...obj, check: false };
                }
                return obj;
            }),
        );
    }

    const [total_carat_now, setTotal_carat_now] = useState()
    const [new_carat_total, setNew_carat_total] = useState()
    const [total_amount_now, setTotal_amount_now] = useState()
    const [total_final_now, setTotal_final_now] = useState()
    const [differnce_amount, setDiffernce_amount] = useState()
    const [new_sell_price, setNew_sell_price] = useState()

    useEffect(() => {
        setNew_carat_total(new_sell_lot.reduce((totalLot, allCarat) => Math.round((totalLot + allCarat.carat) * 100) / 100, 0))
        setTotal_amount_now(new_sell_lot.reduce((totalLot, allAmount) => Math.round((totalLot + allAmount.amount) * 100) / 100, 0))
        setTotal_final_now(new_sell_lot.reduce((totalLot, allAmount) => Math.round((totalLot + allAmount.new_amount) * 100) / 100, 0))
    }, [new_sell_lot])

    const [diff, setDiff] = useState({
        add_carat: 0,
        min_carat: 0
    })
    const newCarat = (e) => {
        setDiff({ ...diff, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setTotal_carat_now(Math.round((new_carat_total + Math.round(diff.add_carat * 100) / 100 - Math.round(diff.min_carat * 100) / 100) * 100) / 100);
    }, [all_lot_data][diff])


    useEffect(() => {
        // setNew_Amount((Math.round((total_final_now + difference.add_difference - difference.minus_difference) * 100) / 100) + Math.round(fix * 100) / 100)
        setDiffernce_amount(Math.round(((new_Amount - total_final_now) * 100) / 100) + (Math.round((difference.add_difference - difference.minus_difference) * 100) / 100))
        setNew_sell_price(Math.round((new_Amount / total_carat_now) * 100) / 100)
    }, [new_Amount][difference])
    // useEffect(() => {
    //     setNew_Amount((Math.round((total_final_now + difference.add_difference - difference.minus_difference) * 100) / 100) + Math.round(fix * 100) / 100)
    //     setDiffernce_amount(Math.round(((total_final_now - total_amount_now) * 100) / 100) + (Math.round(fix * 100) / 100) + (Math.round((difference.add_difference - difference.minus_difference) * 100) / 100))
    //     setNew_sell_price(Math.round((new_Amount / total_carat_now) * 100) / 100)
    // }, [total_final_now][difference])

    const persent_change = (e) => {
        setPersent(e.target.value)
        if (e.target.value == "") {
            setNew_sell_lot(current =>
                current.map(obj => {
                    return {
                        ...obj,
                        new_amount: Math.floor(obj.price * obj.carat * 100) / 100,
                        new_price: Math.floor(obj.price * obj.carat * 100) / 100
                    };
                }),
            );
        } else {
            setNew_sell_lot(current =>
                current.map(obj => {
                    return {
                        ...obj,
                        new_amount: Math.round((((Math.round(e.target.value * 100) / 100) * obj.price / 100 + obj.price) * obj.carat) * 100) / 100,
                        new_price: Math.round(((Math.round(e.target.value * 100) / 100) * obj.price / 100 + obj.price) * 100) / 100
                    };
                }),
            );
        }
    }

    const set_new_amount = (e) => {
        setNew_Amount(e.target.value);
    }

    const set_difference = (e) => {
        if (e.target.name == "add_difference") {
            setDifference({ ...difference, [e.target.name]: Math.round(e.target.value * 100) / 100 })
        } else if (e.target.name == "minus_difference") {
            setDifference({ ...difference, [e.target.name]: e.target.value })
        }
        setSet_d(true)
    }
    useEffect(() => {

        if (set_d == true) {
            if ((difference.add_difference == "" || difference.add_difference == "NaN") && (difference.minus_difference == "" || difference.minus_difference == "NaN")) {
                setDisable_diff({ ...disable_diff, min_diff: false, add_diff: false })
            }
            else if (difference.add_difference == "" || difference.add_difference == "NaN") {
                setDisable_diff({ ...disable_diff, min_diff: false, add_diff: true })
            } else if (difference.minus_difference == "" || difference.minus_difference == "NaN") {
                setDisable_diff({ ...disable_diff, min_diff: true, add_diff: false })
            }
        }
    }, [difference])

    const click_save_lot = () => {
        setLot_show(true)
        setShow_lot(false)
        setNew_Amount(Math.round(total_final_now * 100) / 100)
        setTotal_carat_now(new_sell_lot.reduce((totalLot, allCarat) => Math.round((totalLot + allCarat.carat) * 100) / 100, 0))
        setNew_carat_total(new_sell_lot.reduce((totalLot, allCarat) => Math.round((totalLot + allCarat.carat) * 100) / 100, 0))
    }

    const click_cansal = () => {
        setShow_lot(false)
    }

    const search_change = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = all_lot_data.filter((item) => {
                return Object.values(item?.party_name.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            all_lot_serch.map((dataItem) => searchingData.push(dataItem));
        }
        setAll_lot_data(searchingData);
    }

    //======================================Data-Stutur=====================================Start
    const datas = {
        s_id: parseInt(sell.s_id),
        invoice_no: sell_data.invoice_number,
        extra: get_lot.extra,
        type: get_lot.type,
        artical: get_lot.artical,
        party_name: sell_data.party_name,
        invoice_date: sell_data.invoice_date,
        terms: parseInt(sell_data.terms),
        due_date: due_date_now,
        total_carat: new_carat_total,
        total_amount: total_amount_now,
        final_amount: new_Amount,
        receive_amount: 0,
        add_carat: diff.add_carat == "" ? 0 : parseFloat(diff.add_carat),
        less_carat: diff.min_carat == "" ? 0 : parseFloat(diff.min_carat),
        outstanding_amount: new_Amount,
        sell_carat: total_carat_now,
        sell_price: new_sell_price,
        sell_invoice: new_Amount,
        sell_differnt_amount: Math.round(differnce_amount * 100) / 100,
        plus: Math.round(difference.add_difference * 100) / 100,
        minus: Math.round(difference.minus_difference * 100) / 100,
        is_delete: false,
        add_fixamount: Math.round(fix * 100) / 100,
        remark: sell_data.remark,
        vai_1: vaya.vaya1_name,
        vai_1_amount: Math.round(vaya.vaya1_value * 100) / 100,
        vai_2: vaya.vaya2_name,
        vai_2_amount: Math.round(vaya.vaya2_value * 100) / 100,
        vai_3: vaya.vaya3_name,
        vai_3_amount: Math.round(vaya.vaya3_value * 100) / 100,
        vai_4: vaya.vaya4_name,
        vai_4_amount: Math.round(vaya.vaya4_value * 100) / 100,
        data: new_sell_lot.map((ele, index) => ({
            sub_s_id: index + 1,
            s_id: sell.s_id,
            sub_p_id: ele.sub_p_id,
            invoice_no: ele.invoice_no,
            extra: get_lot.extra,
            type: get_lot.type,
            artical: get_lot.artical,
            party_name: sell_data.party_name,
            add_fixamount: Math.round(fix * 100) / 100,
            lot_id: ele.lot_id,
            carat: ele.carat,
            price: ele.price,
            amount: ele.amount,
            is_delete_lot: false,
            new_amount: ele.new_amount,
            p_id: ele.p_id,
            add_percent: Math.round(persent * 100) / 100,
            new_price: ele.new_price,
        }))
    }
    //======================================Data-Stutur=======================================End
    const save_sell_data = async () => {
        if (sell_data.party_name == "") {
            setError_sell_data({ ...error_sell_data, party_name: true })
        } else if (get_lot.extra == "") {
            setError_get_lot({ ...error_get_lot, extra: true })
        } else if (get_lot.type == "") {
            setError_get_lot({ ...error_get_lot, type: true })
        } else if (get_lot.artical == "") {
            setError_get_lot({ ...error_get_lot, artical: true })
        } else if (sell_data.invoice_date == "") {
            setError_sell_data({ ...error_sell_data, invoice_date: true })
        } else if (sell_data.terms == "" || sell_data.terms == 0) {
            setError_sell_data({ ...error_sell_data, terms: true })
        } else {
            const res = await fetch(`${api}Sell/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...datas })
                })
            const resdata = await res.json()

            if (resdata == "Record Add Successfully") {
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
                const res_reset = await fetch(`${api}Sell/Getsell`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            store_url: "ok"
                        })
                    })
                const sell_reset = await res_reset.json()
                setSell_data({
                    id: sell_reset.s_id,
                    invoice_number: sell_reset.s_id,
                    party_name: "",
                    invoice_date: new Date().toISOString().split('T')[0],
                    terms: "",
                    remark: "",
                })
                setGet_lot({
                    extra: "",
                    type: "",
                    artical: "",
                })
                setShow_button(true)
                setAll_lot_data([])
                setNew_sell_lot([])
                setShow_lot(false)
                setLot_show(false)
                setNew_Amount("")
                setPersent("")
                setDifference({
                    add_difference: "",
                    minus_difference: "",
                })
                setDiff({
                    add_carat: 0,
                    min_carat: 0
                })
            }
        }
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Sell
                name="New"
                sell_data={ sell_data }
                sell_party_list={ sell.party }
                all_lot_data={ all_lot_data }
                error_sell_data={ error_sell_data }
                error_get_lot={ error_get_lot }
                sell_change={ sell_change }
                allParty={ allParty }
                show_button={ show_button }
                due_date_now={ due_date_now }
                get_lot={ get_lot }
                get_change={ get_change }
                click_show_lot={ click_show_lot }
                show_lot={ show_lot }
                click_save_lot={ click_save_lot }
                click_cansal={ click_cansal }
                save_sell_data={ save_sell_data }
                checkbox_value={ checkbox_value }
                new_sell_lot={ new_sell_lot }
                lot_show={ lot_show }
                fix={ fix }
                remove_lot={ remove_lot }
                total_carat_now={ total_carat_now }
                total_final_now={ total_final_now }
                total_amount_now={ total_amount_now }
                persent={ persent }
                persent_change={ persent_change }
                new_sell_price={ new_sell_price }
                new_Amount={ new_Amount }
                set_new_amount={ set_new_amount }
                difference={ difference }
                disable_diff={ disable_diff }
                set_difference={ set_difference }
                vaya={ vaya }
                vaya_change={ vaya_change }
                differnce_amount={ differnce_amount }
                edit_disable={ edit_disable }
                diff={ diff }
                newCarat={ newCarat }
                new_carat_total={ new_carat_total }
                fix_set={ fix_set }
                save="Save"
                edit_ooo={ edit_ooo }
                search_change={ search_change }
            />
        </div>
    )
}

export async function getServerSideProps() {

    const res = await fetch(`${process.env.API}Sell/Getsell`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const sell = await res.json()

    const res_allparty = await fetch(`${process.env.API}Party/allparty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "ok"
            })
        })
    const allParty = await res_allparty.json()


    return {
        props: {
            "api": process.env.API,
            "sell": sell,
            "allParty": allParty
        }
    }
}

export default Index