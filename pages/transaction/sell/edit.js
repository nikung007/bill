import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Sell from '../../../components/sell';

const Edit = ({ resdata, sell, api, id, allParty }) => {

    const router = useRouter()

    const edit_disable = true;

    const [new_sell_lot, setNew_sell_lot] = useState([]);
    useEffect(() => {
        setNew_sell_lot(resdata.sellsubdata.map((ok) => ({
            amount: ok.amount,
            carat: ok.carat,
            invoice_no: ok.invoice_no,
            party_name: ok.party_name,
            price: ok.price,
            sub_p_id: ok.sub_p_id,
            new_amount: ok.new_amount,
            new_price: ok.new_price,
            lot_id: ok.lot_id,
            p_id: ok.p_id,
            artical: ok.artical,
            extra: ok.extra,
            is_delete: ok.is_delete,
            sell_lot: ok.sell_lot,
            type: ok.type,
        })))
    }, []);

    const [total_carat_now, setTotal_carat_now] = useState()
    const [new_carat_total, setNew_carat_total] = useState()
    const [total_amount_now, setTotal_amount_now] = useState()
    const [total_final_now, setTotal_final_now] = useState()
    const [new_Amount, setNew_Amount] = useState(resdata.selldata.sell_invoice)
    const [differnce_amount, setDiffernce_amount] = useState()
    const [new_sell_price, setNew_sell_price] = useState(resdata.selldata.sell_price)
    const [difference, setDifference] = useState({
        add_difference: resdata.selldata.plus,
        minus_difference: resdata.selldata.minus,
    })
    const [all_lot_data, setAll_lot_data] = useState([])
    const [all_lot_serch, setall_lot_serch] = useState([])
    useEffect(() => {
        setNew_carat_total(new_sell_lot.reduce((totalLot, allCarat) => Math.round((totalLot + allCarat.carat) * 100) / 100, 0))
        setTotal_amount_now(new_sell_lot.reduce((totalLot, allAmount) => Math.round((totalLot + allAmount.amount) * 100) / 100, 0))
        setTotal_final_now(new_sell_lot.reduce((totalLot, allAmount) => Math.round((totalLot + allAmount.new_amount) * 100) / 100, 0))
    }, [new_sell_lot])

    const [diff, setDiff] = useState({
        add_carat: resdata.selldata.add_carat,
        min_carat: resdata.selldata.less_carat
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

    const in_date = resdata.selldata.invoice_date.split("T")[0];
    const [sell_data, setSell_data] = useState({
        invoice_number: resdata.selldata.invoice_no,
        party_name: resdata.selldata.party_name,
        invoice_date: in_date,
        terms: resdata.selldata.terms,
        remark: resdata.selldata.remark,
    })
    const [error_sell_data, setError_sell_data] = useState({
        party_name: false,
        invoice_date: false,
        terms: false
    })
    const [get_lot, setGet_lot] = useState({
        extra: resdata.selldata.extra,
        type: resdata.selldata.type,
        artical: resdata.selldata.artical
    })
    const [error_get_lot, setError_get_lot] = useState({
        extra: false,
        type: false,
        artical: false,
        show_sell: false
    })
    const [show_button, setShow_button] = useState(true)

    const [show_lot, setShow_lot] = useState(false)
    const [lot_show, setLot_show] = useState(true)
    const [persent, setPersent] = useState(resdata.sellsubdata[0].add_percent)
    const [disable_diff, setDisable_diff] = useState({
        add_diff: false,
        min_diff: false
    })
    const [set_d, setSet_d] = useState(false)
    const [vaya, setVaya] = useState({
        vaya1_name: resdata.selldata.vai_1,
        vaya1_value: resdata.selldata.vai_1_amount,
        vaya2_name: resdata.selldata.vai_2,
        vaya2_value: resdata.selldata.vai_2_amount,
        vaya3_name: resdata.selldata.vai_3,
        vaya3_value: resdata.selldata.vai_3_amount,
        vaya4_name: resdata.selldata.vai_4,
        vaya4_value: resdata.selldata.vai_4_amount,
    })

    const sell_change = (e) => {
        setSell_data({ ...sell_data, [e.target.name]: e.target.value })
        setError_sell_data({ ...error_sell_data, [e.target.name]: false })
    }

    const get_change = (e) => {
        setGet_lot({ ...get_lot, [e.target.name]: e.target.value })
        setError_get_lot({ ...error_get_lot, [e.target.name]: false })
    }

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
        } else {
            setShow_button(true)
        }
    }, [get_lot])

    const click_show_lot = async () => {
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

    const [fix, setFix] = useState(resdata.sellsubdata[0].addfixamount)
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
                        new_price: ok.price,
                        new_amount: ok.amount,
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

    const remove_lot = async (sub_p) => {
        const res_remove_lot = await fetch(`${api}Sell/Removeselllot`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: parseInt(sub_p),
                })
            })
        const resdata_remove = await res_remove_lot.json()
        if (resdata_remove == "Remove") {
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

    const persent_change = (e) => {
        setPersent(e.target.value)
        if (e.target.value == "") {
            setNew_sell_lot(current =>
                current.map(obj => {
                    return {
                        ...obj,
                        new_amount: Math.floor(obj.price * obj.carat * 100) / 100,
                        new_price: Math.floor(obj.price * 100) / 100
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
        setNew_Amount(Math.round(e.target.value * 100) / 100)
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

    const vaya_change = (e) => {
        setVaya({ ...vaya, [e.target.name]: e.target.value })
    }

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
        s_id: parseInt(resdata.selldata.s_id),
        invoice_no: sell_data.invoice_number,
        extra: get_lot.extra,
        type: get_lot.type,
        artical: get_lot.artical,
        party_name: sell_data.party_name,
        invoice_date: sell_data.invoice_date,
        terms: parseInt(sell_data.terms),
        due_date: due_date_now,
        total_carat: total_carat_now,
        total_amount: total_amount_now,
        final_amount: new_Amount,
        receive_amount: 0,
        outstanding_amount: new_Amount,
        sell_carat: total_carat_now,
        sell_price: new_sell_price,
        sell_invoice: new_Amount,
        add_carat: diff.add_carat == "" ? 0 : parseFloat(diff.add_carat),
        less_carat: diff.min_carat == "" ? 0 : parseFloat(diff.min_carat),
        add_fixamount: Math.round(fix * 100) / 100,
        sell_differnt_amount: Math.round(differnce_amount * 100) / 100,
        plus: Math.round(difference.add_difference * 100) / 100,
        minus: Math.round(difference.minus_difference * 100) / 100,
        is_delete: false,
        remark: sell_data.remark,
        vai_1: vaya.vaya1_name,
        vai_1_amount: Math.round(vaya.vaya1_value * 100) / 100,
        vai_2: vaya.vaya2_name,
        vai_2_amount: Math.round(vaya.vaya2_value * 100) / 100,
        vai_3: vaya.vaya3_name,
        vai_3_amount: Math.round(vaya.vaya3_value * 100) / 100,
        vai_4: vaya.vaya4_name,
        vai_4_amount: Math.round(vaya.vaya4_value * 100) / 100,
    }
    const data = new_sell_lot.map((ele, index) => ({
        sub_s_id: index + 1,
        s_id: resdata.selldata.s_id,
        sub_p_id: ele.sub_p_id,
        invoice_no: ele.invoice_no,
        extra: get_lot.extra,
        type: get_lot.type,
        artical: get_lot.artical,
        add_fixamount: Math.round(fix * 100) / 100,
        party_name: sell_data.party_name,
        lot_id: ele.lot_id,
        carat: ele.carat,
        price: ele.price,
        amount: ele.amount,
        is_delete_lot: false,
        p_id: ele.p_id,
        add_percent: Math.round(persent * 100) / 100,
        new_price: ele.new_price,
        new_amount: ele.new_amount
    }))

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
        } else if (sell_data.terms == "") {
            setError_sell_data({ ...error_sell_data, terms: true })
        } else {
            const res = await fetch(`${api}Sell/update`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: parseInt(id),
                        lot_data: data,
                        sell_data: datas
                    })
                })
            const resdata = await res.json()
            if (resdata == "Record Update Succesfully") {
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
                router.push("/transaction/sell/allsell")
            }
        }
    }
    return (
        <div>
            <Toaster position="top-center" reverseOrder={ false } />
            <Sell
                name="Edit"
                sell_data={ sell_data }
                sell_party_list={ sell.party }
                all_lot_data={ all_lot_data }
                error_sell_data={ error_sell_data }
                error_get_lot={ error_get_lot }
                sell_change={ sell_change }
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
                fix_set={ fix_set }
                vaya_change={ vaya_change }
                allParty={ allParty }
                differnce_amount={ differnce_amount }
                edit_disable={ edit_disable }
                diff={ diff }
                newCarat={ newCarat }
                new_carat_total={ new_carat_total }
                save="Update"
                search_change={ search_change }
            />
        </div>
    )
}

export default Edit

export async function getServerSideProps({ query }) {

    const res_sell = await fetch(`${process.env.API}Sell/Getsell`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const sell = await res_sell.json()
    const res = await fetch(`${process.env.API}Sell/Edit`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: query.id
            })
        })
    const resdata = await res.json()

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
            "resdata": resdata,
            "id": query.id,
            "api": process.env.API,
            "allParty": allParty,
            "sell": sell
        }
    }
}