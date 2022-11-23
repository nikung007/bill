import React, { useState } from 'react'
import Add_master from '../../components/add_master'

const Partymaster = ({ party, api, party_all }) => {

    console.log(party_all);

    const [party_master, setParty_master] = useState({
        id: party.party_id,
        party_type: "",
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
        party_id: party_master.id,
        party_type: party_master.party_type,
        party_name: party_master.party_name,
        is_delete: false,
    }
    const save_data = async () => {
        if (party_master.party_type != "" && party_master.party_name != "") {
            const res = await fetch(`${api}Party/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                })
            const resdata = await res.json()
            if (resdata == "Party Add Successfully") {
                const res = await fetch(`${api}Party/Getpartyid`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            store_url: "ok"
                        })
                    })
                const party_new = await res.json()
                setParty_master({
                    id: party_new.party_id,
                    party_type: "",
                    party_name: "",
                })
            }
        }
    }
    return (
        <div>
            <h1>Party master</h1>
            <Add_master
                party_master={ party_master }
                party_change={ party_change }
                all_list={ all_list }
                click_show_list={ click_show_list }
                close_list={ close_list }
                save_data={ save_data }
                party_all={ party_all }
            />
        </div>
    )
}

export async function getstaticprops() {

    const res = await fetch(`${process.env.API}Party/Getpartyid`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const party = await res.json()

    const res_all_data = await fetch(`${process.env.API}Party/Getallparty`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                store_url: "ok"
            })
        })
    const party_all = await res_all_data.json()


    return {
        props: {
            "api": process.env.API,
            "party": party,
            "party_all": party_all
        }
    }
}

export default Partymaster