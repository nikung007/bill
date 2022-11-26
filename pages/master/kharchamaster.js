import React, { useState } from 'react'
import Kharcha from '../../components/kharcha'
import toast, { Toaster } from 'react-hot-toast';


const Kharchamaster = ({ api, party_all }) => {

    const [partyList, setPartyList] = useState(party_all || []);
    const [partyMaster, setPartyMaster] = useState({
        id: partyList.length + 1,
        group_name: "",
        party_name: "",
    });
    const [allList, setAllList] = useState(false);
    const [kharchaList, setKharchaList] = useState(party_all);

    const partyChange = (e) => {
        setPartyMaster({ ...partyMaster, [e.target.name]: e.target.value });
    };
    const click_show_list = () => {
        setAllList(true);
    };
    const close_list = () => {
        setAllList(false);
    };
    const [edit, setEdit] = useState(false);

    const data = {
        id: partyMaster.id,
        kharcha_group: partyMaster.group_name,
        kharcha_name: partyMaster.party_name,
        is_delete: false,
    }

    const searchChange = (e) => {
        const searchingData = [];
        if (e.target.value) {
            const data = kharchaList.filter((item) => {
                return Object.values(item?.kharcha_name.toLowerCase()).join("").includes(e.target.value.toLowerCase());
            });
            data.map((dataItem) => searchingData.push(dataItem));
        } else {
            party_all.map((dataItem) => searchingData.push(dataItem));
        }
        setKharchaList(searchingData);
    };

    const saveData = async () => {
        if (edit == false) {
            if (partyMaster.group_name != "" && partyMaster.party_name != "") {
                const res = await fetch(`${api}Kharch/Add`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data })
                    });
                const resdata = await res.json();

                if (resdata == "Add Succesfully") {
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
                    const res = await fetch(`${api}Kharch/Getkharch`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: "ok" })
                        });
                    const party_all = await res.json();

                    setPartyList(party_all);
                    setPartyMaster({
                        ...partyMaster,
                        id: party_all.length + 1,
                        group_name: "",
                        party_name: "",
                    });
                }
            }
        } else {
            if (partyMaster.group_name != "" && partyMaster.party_name != "") {
                const res = await fetch(`${api}Kharch/Update`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ ...data })
                    });
                const resdata = await res.json();

                if (resdata == "Khanrchname Update") {
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
                    const res_n = await fetch(`${api}Kharch/Getkharch`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ data: "ok" })
                        });
                    const party_all = await res_n.json();
                    setEdit(false);
                    setPartyList(party_all);
                    setPartyMaster({
                        ...partyMaster,
                        id: party_all.length + 1,
                        group_name: "",
                        party_name: "",
                    });
                }
            }
        }
    };

    const deleteData = async (e) => {
        const res = await fetch(`${api}Kharch/Delete`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ deleteData_id: e })
            });
        const resdata = await res.json();

        if (resdata == "Delete Succesfully") {
            toast.success(toast, {
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
            setPartyList(partyList.filter(item => item.id !== e));
        }
    };

    const editData = async (e) => {
        setAllList(false);
        setEdit(true);
        const res = await fetch(`${api}Kharch/Edit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: e })
            });
        const resdata = await res.json();
        setPartyMaster({
            ...partyMaster,
            id: resdata.id,
            group_name: resdata.kharcha_group,
            party_name: resdata.kharcha_name,
        });
    };

    return (
        <div>
            <h1>Kharcha Master</h1>
            <Toaster position="top-center" reverseOrder={ false } />
            <Kharcha
                partyMaster={ partyMaster }
                partyChange={ partyChange }
                allList={ allList }
                click_show_list={ click_show_list }
                close_list={ close_list }
                saveData={ saveData }
                partyList={ kharchaList }
                deleteData={ deleteData }
                editData={ editData }
                edit={ edit }
                searchChange={ searchChange }
            />
        </div>
    )
}

export default Kharchamaster

export async function getServerSideProps() {
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