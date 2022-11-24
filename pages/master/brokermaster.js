import React, { useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
import Add_master from '../../components/add_master'

const Brokermaster = () => {
    const [party_master, setParty_master] = useState({
        id: "",
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
    return (
        <div>
            <h1>Broker Master</h1>
            <Add_master
                party_master={ party_master }
                party_change={ party_change }
                all_list={ all_list }
                click_show_list={ click_show_list }
                close_list={ close_list }
            />
        </div>
    )
}

export default Brokermaster