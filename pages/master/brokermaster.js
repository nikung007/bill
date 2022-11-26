import React, { useState } from 'react'
// import toast, { Toaster } from 'react-hot-toast';
import Add_master from '../../components/add_master'

const Brokermaster = () => {

    const [partyMaster, setPartyMaster] = useState({
        id: "",
        party_type: "",
        party_name: "",
    })
    const [allList, setAllList] = useState(false)

    const partyChange = (e) => {
        setPartyMaster({ ...partyMaster, [e.target.name]: e.target.value })
    }
    const clickshowList = () => {
        setAllList(true)
    }
    const closeList = () => {
        setAllList(false)
    }
    return (
        <div>
            <h1>Broker Master</h1>
            <Add_master
                partyMaster={ partyMaster }
                partyChange={ partyChange }
                allList={ allList }
                clickshowList={ clickshowList }
                closeList={ closeList }
                party_all={ [] }
            />
        </div>
    )
}

export default Brokermaster