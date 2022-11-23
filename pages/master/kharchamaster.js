import React, { useState } from 'react'
import Kharcha from '../../components/kharcha'

const Kharchamaster = ({ api, party_all }) => {

    const [party_list, setParty_list] = useState(party_all || [])

    const [party_master, setParty_master] = useState({
        id: party_list.length + 1,
        group_name: "",
        party_name: "",
    })
    const party_change = (e) => {
        setParty_master({ ...party_master, [e.target.name]: e.target.value })
    }
    const [all_list, setAll_list] = useState(false)
    const click_show_list = () => {
        setAll_list(true)
    }
    const close_list = () => {
        setAll_list(false)
    }

    const data = {
        id: party_master.id,
        kharcha_group: party_master.group_name,
        kharcha_name: party_master.party_name,
        is_delete: false,
    }

    const [edit, setEdit] = useState(false)

    const save_data = async () => {
        if (edit == false) {

            if (party_master.group_name != "" && party_master.party_name != "") {
                const res = await fetch(`${api}Kharch/Add`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data })
                    })
                const resdata = await res.json()
                console.log(resdata);
                if (resdata == "Add Succesfully") {
                    const res = await fetch(`${api}Kharch/Getkharch`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: "ok" })
                        })
                    const party_all = await res.json()

                    setParty_list(party_all)
                    setParty_master({
                        ...party_master,
                        id: party_all.length + 1,
                        group_name: "",
                        party_name: "",
                    })
                }
            }
        } else {
            if (party_master.group_name != "" && party_master.party_name != "") {
                const res = await fetch(`${api}Kharch/Update`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data })
                    })
                const resdata = await res.json()
                console.log(resdata);
                if (resdata == "Khanrchname Update") {

                    const res_n = await fetch(`${api}Kharch/Getkharch`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: "ok" })
                        })
                    const party_all = await res_n.json()
                    setEdit(false)
                    setParty_list(party_all)
                    setParty_master({
                        ...party_master,
                        id: party_all.length + 1,
                        group_name: "",
                        party_name: "",
                    })
                }
            }
        }
    }

    const delete_data = async (e) => {
        const res = await fetch(`${api}Kharch/Delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delete_data_id: e })
            })
        const resdata = await res.json()

        if (resdata == "Delete Succesfully") {
            setParty_list(party_list.filter(item => item.id !== e));
        }
    }



    const edit_data = async (e) => {
        setAll_list(false)
        setEdit(true)
        const res = await fetch(`${api}Kharch/Edit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: e })
            })
        const resdata = await res.json()
        setParty_master({
            ...party_master,
            id: resdata.id,
            group_name: resdata.kharcha_group,
            party_name: resdata.kharcha_name,
        })
    }
    return (
        <div>
            <h1>Broker Master</h1>
            <Kharcha
                party_master={ party_master }
                party_change={ party_change }
                all_list={ all_list }
                click_show_list={ click_show_list }
                close_list={ close_list }
                save_data={ save_data }
                party_list={ party_list }
                delete_data={ delete_data }
                edit_data={ edit_data }
                edit={ edit }
            />
        </div>
    )
}

export default Kharchamaster

export async function getstaticprops() {
    const res = await fetch(`${process.env.API}Kharch/Getkharch`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: "ok" })
        })
    const party_all = await res.json()


    return {
        props: {
            "api": process.env.API,
            "party_all": party_all,
        }
    }
}