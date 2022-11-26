import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Add_master from '../../components/add_master'

const Partymaster = ({ party, api, party_all }) => {

    const [partyMaster, setPartyMaster] = useState({
        id: party.party_id,
        party_type: "",
        party_name: "",
    });
    const [allList, setAllList] = useState(false);
    const [party_list, setParty_list] = useState(party_all);

    const click_show_list = () => {
        setAllList(true);
    };

    const partyChange = (e) => {
        setPartyMaster({ ...partyMaster, [e.target.name]: e.target.value });
    };

    const close_list = () => {
        setAllList(false);
    };

    const searchChange = (e) => {
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
        party_id: partyMaster.id,
        party_type: partyMaster.party_type,
        party_name: partyMaster.party_name,
        is_delete: false,
    };

    const save_data = async () => {
        if (partyMaster.party_type != "" && partyMaster.party_name != "") {
            const res = await fetch(`${api}Party/Add`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...data })
                });
            const resdata = await res.json();
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
                    });
                const party_new = await res.json();
                setPartyMaster({
                    id: party_new.party_id,
                    party_type: "",
                    party_name: "",
                });
            }
        }
    };

    return (
        <div>
            <h1>Party master</h1>
            <Toaster position="top-center" reverseOrder={ false } />
            <Add_master
                partyMaster={ partyMaster }
                partyChange={ partyChange }
                allList={ allList }
                click_show_list={ click_show_list }
                close_list={ close_list }
                save_data={ save_data }
                party_all={ party_list }
                searchChange={ searchChange }
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
    const party = await res.json();

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
    const party_all = await res_all_data.json();


    return {
        props: {
            "api": process.env.API,
            "party": party,
            "party_all": party_all
        }
    }
}

export default Partymaster