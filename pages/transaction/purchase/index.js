import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import Purchase_ok from '../../../components/purchase_ok'

const Index = ({ resdata, api }) => {


    const router = useRouter();
    const [lot_list, setLot_list] = useState([])

    const [purchase_data, setPurchase_data] = useState({
        id: resdata.p_id,
        invoice_number: resdata.p_id,
        extra: "",
        type: "",
        artical: "",
        party_name: "",
        invoice_date: "",
        terms: "",
        remark: "",
    })

    var days = purchase_data.terms;
    var new_date = new Date(purchase_data.invoice_date);
    new_date.setDate(new_date.getDate() + parseInt(days));
    let d = new Date(new_date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    const due_date_now = `${year}-${month}-${day}`

    const [error, setError] = useState({
        error_extra: false,
        error_type: false,
        error_artical: false,
        error_party_name: false,
        error_invoice_date: false,
        error_terms: false,
        error_all: false,
    })

    const change_purchese = (e) => {
        setPurchase_data({ ...purchase_data, [e.target.name]: e.target.value })
        setError({ ...error, [`error_${e.target.name}`]: false })
    }

    const [lot_obj, setLot_obj] = useState({
        lot_carat: "",
        lot_price: "",
    })
    const [error_lot, setError_lot] = useState({ error_lot_carat: false, error_lot_price: false, })
    const set_lot = (e) => {
        setLot_obj({ ...lot_obj, [e.target.name]: e.target.value })
        setError_lot({ ...error_lot, [`error_${e.target.name}`]: false })
    }

    const add_lot = () => {
        if (lot_obj.lot_carat == "") {
            setError_lot({ ...error_lot, error_lot_carat: true })
        } else if (lot_obj.lot_price == "") {
            setError_lot({ ...error_lot, error_lot_price: true })
        } else {
            setLot_list(current =>
                [...current, {
                    lot_id: Date.now(),
                    id: "",
                    edit_disable: false,
                    party_name: purchase_data.party_name,
                    carat: Math.round(lot_obj.lot_carat * 100) / 100,
                    price: Math.round(lot_obj.lot_price * 100) / 100,
                    amount: Math.round(lot_obj.lot_carat * lot_obj.lot_price * 100) / 100
                }]);
            setLot_obj({ ...lot_obj, lot_carat: "", lot_price: "", })
        }
    }

    const [new_edit, setNew_edit] = useState({
        new_carat: "",
        new_price: "",
    })

    const edit_lot = (e) => {
        const newEditData = lot_list.map(obj => {
            if (obj.lot_id == e) {
                setNew_edit({ ...new_edit, new_carat: Math.round(obj.carat * 100) / 100, new_price: Math.round(obj.price * 100) / 100 })
                return { ...obj, edit_disable: true };
            }
            return obj;
        });
        setLot_list(newEditData);
    }

    const set_edit_lot = (e, val) => {
        setNew_edit({ ...new_edit, [val]: Math.round(e.target.value * 100) / 100 })
    }


    const delete_lot = (e) => { setLot_list(lot_list.filter((remove) => remove.lot_id != e)) };

    const save_new_lot = (e) => {
        const newEditData = lot_list.map(obj => {
            if (obj.lot_id == e) {
                return {
                    ...obj,
                    edit_disable: false,
                    carat: new_edit.new_carat,
                    price: new_edit.new_price,
                    amount: Math.round(new_edit.new_carat * new_edit.new_price * 100) / 100
                };
            }
            return obj;
        });
        setLot_list(newEditData);
    }

    const total_carat_now = lot_list.reduce((totalLot, allCarat) => totalLot + Math.round(allCarat.carat * 100) / 100, 0);
    const total_amount_now = lot_list.reduce((totalLot, allAmount) => totalLot + Math.round(allAmount.amount * 100) / 100, 0);

    const [disable_diff, setDisable_diff] = useState({ add_diff: false, min_diff: false })
    const [difference, setDifference] = useState({
        add_difference: "",
        minus_difference: "",
    })
    const [set_d, setSet_d] = useState(false)
    const set_difference = (e) => {
        setDifference({ ...difference, [e.target.name]: Math.round(e.target.value * 100) / 100 })
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

    let final_amount_now = total_amount_now + Math.round(difference.add_difference * 100) / 100 - Math.round(difference.minus_difference * 100) / 100


    const all_purchase_data = {
        p_id: purchase_data.id,
        invoice_no: parseInt(purchase_data.id),
        extra: purchase_data.extra,
        type: purchase_data.type,
        artical: purchase_data.artical,
        party_name: purchase_data.party_name,
        invoice_date: purchase_data.invoice_date,
        terms: parseInt(purchase_data.terms),
        due_date: due_date_now,
        total_carat: total_carat_now,
        total_amount: total_amount_now,
        plus: Math.round(difference.add_difference * 100) / 100,
        minus: Math.round(difference.minus_difference * 100) / 100,
        final_amount: Math.round(final_amount_now * 100) / 100,
        remark: purchase_data.remark,
        receive_amount: 0,
        outstanding_amount: Math.round(final_amount_now * 100) / 100,
        is_delete: false,
        data: lot_list.map((ele, index) => ({
            sub_p_id: index + 1,
            p_id: purchase_data.invoice_number,
            invoice_no: purchase_data.invoice_number,
            extra: purchase_data.extra,
            type: purchase_data.type,
            artical: purchase_data.artical,
            party_name: purchase_data.party_name,
            lot_id: index + 1,
            carat: Math.round(ele.carat * 100) / 100,
            price: Math.round(ele.price * 100) / 100,
            amount: Math.round(ele.amount * 100) / 100,
            is_delete: false,
            sell_lot: false,
        })),
    }

    // console.log(all_purchase_data);
    const save_purchase = async (e) => {
        // toast.success('Here is your toast.');
        if (purchase_data.party_name == "") {
            setError({ ...error, error_party_name: true })
        } else if (purchase_data.extra == "") {
            setError({ ...error, error_extra: true })
        } else if (purchase_data.type == "") {
            setError({ ...error, error_type: true })
        } else if (purchase_data.artical == "") {
            setError({ ...error, error_artical: true })
        } else if (purchase_data.invoice_date == "") {
            setError({ ...error, error_invoice_date: true })
        } else if (purchase_data.terms == "") {
            setError({ ...error, error_terms: true })
        } else if (lot_list.length == 0) {
            setError({ ...error, error_all: true })
        } else {
            const res = await fetch(`${api}Purchase/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...all_purchase_data })
                })
            const resdata = await res.json()
            if (resdata == "Record Add Successfully") {
                const res = await fetch(`${api}Purchase/GetParty`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            store_url: "ok"
                        })
                    })
                const resetData = await res.json()
                setPurchase_data({
                    ...purchase_data,
                    id: resetData.p_id,
                    invoice_number: resetData.p_id,
                    extra: "",
                    type: "",
                    artical: "",
                    party_name: "",
                    invoice_date: "",
                    terms: "",
                    remark: ""
                })
                setLot_list([])
                setDifference({
                    ...difference,
                    add_difference: "",
                    minus_difference: "",
                })
            }
        }
    }


    return (
        <div>
            <Purchase_ok
                name="New"
                party_name={ resdata.data }
                lot_list={ lot_list }
                purchase_data={ purchase_data }
                change_purchese={ change_purchese }
                error={ error }
                lot_obj={ lot_obj }
                error_lot={ error_lot }
                disable_diff={ disable_diff }
                due_date_now={ due_date_now }
                new_edit={ new_edit }
                set_lot={ set_lot }
                set_edit_lot={ set_edit_lot }
                add_lot={ add_lot }
                edit_lot={ edit_lot }
                difference={ difference }
                delete_lot={ delete_lot }
                save_new_lot={ save_new_lot }
                total_carat_now={ total_carat_now }
                total_amount_now={ total_amount_now }
                final_amount_now={ final_amount_now }
                set_difference={ set_difference }
                save_purchase={ save_purchase }
                save="Save"
            />
        </div>
    )
}

export async function getserversideprops() {

    const res = await fetch(`${process.env.API}Purchase/GetParty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const resdata = await res.json()
    // console.log(resdata);

    return {
        props: {
            "api": process.env.API,
            "resdata": resdata,
        }
    }
}

export default Index

