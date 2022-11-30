import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Add_master from '../../components/add_master'

const Partymaster = ({ party, api, party_all }) => {

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

    const [party_list, setParty_list] = useState(party_all);
    const search_change = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = party_all.filter((item) => {
                return Object.values(item?.party_name.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            party_all.map((dataItem) => searchingData.push(dataItem));
        }
        setParty_list(searchingData);
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

    const delete_party = async (e) => {
        const res = await fetch(`${api}Party/Delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ delete_data_id: e })
            })
        const resdata = await res.json()
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
    }
    return (
        <div>
            <h1>Party master</h1>
            <Toaster position="top-center" reverseOrder={ false } />
            <Add_master
                party_master={ party_master }
                party_change={ party_change }
                all_list={ all_list }
                click_show_list={ click_show_list }
                close_list={ close_list }
                save_data={ save_data }
                party_all={ party_list }
                search_change={ search_change }
                delete_party={ delete_party }
            />
        </div>
    )
}

export async function getServerSideProps() {

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
            "party_all": party_all,
        }
    }
}

export default Partymaster