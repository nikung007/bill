import Link from 'next/link'
import React from 'react'
import Add_Master_Style from '../styles/add_master.module.css'

const Add_master = (props) => {
    return (
        <section>
            {
                props.all_list ?
                    <div style={ { width: "auto", margin: "auto" } } className='card'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Party type</th>
                                    <th>Party name</th>
                                    <th style={ { textAlign: "center" } } colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.party_all.map((ele) => {
                                        return (
                                            <tr>
                                                <td>{ ele.party_id }</td>
                                                <td>{ ele.party_name }</td>
                                                <td>{ ele.party_type }</td>
                                                <td style={ { padding: "0" } }>
                                                    <button className='warning'>Delete</button>
                                                </td>
                                                <td style={ { padding: "10px" } }>
                                                    <button>Edit</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button
                            onClick={ props.close_list }
                            style={ {
                                margin: "auto",
                                display: "flex",
                                alignItems: "center"
                            } } className='secondary'>Close</button>
                    </div>
                    :
                    <div className={ `card ${Add_Master_Style.add_fild}` }>
                        <div className={ `${Add_Master_Style.add_all_fild}` }>
                            <label>Id</label>
                            <input
                                value={ props.party_master.id }
                                disabled
                                type="text" />
                        </div>
                        <div className={ `${Add_Master_Style.add_all_fild}` }>
                            <label>Party type</label>
                            <select
                                value={ props.party_master.party_type }
                                onChange={ props.party_change }
                                name='party_type'>
                                <option value="">SELECT PARTY TYPE</option>
                                <option value="BUYER">BUYER</option>
                                <option value="SELLER">SELLER</option>
                                <option value="EXTRA">EXTRA</option>
                            </select>
                        </div>
                        <div className={ `${Add_Master_Style.add_all_fild}` }>
                            <label>Party name</label>
                            <input
                                value={ props.party_master.party_name }
                                placeholder='Enter a party name'
                                name='party_name'
                                onChange={ props.party_change }
                                type="text" />
                        </div>
                        <div
                            style={ { margin: "0" } }
                            className={ `${Add_Master_Style.add_all_fild}` }>
                            <button onClick={ props.save_data }>Save</button>
                            <button
                                onClick={ props.click_show_list }
                                className='secondary'>All List</button>
                            <Link href="/">
                                <button className='warning'>Close</button>
                            </Link>
                        </div>
                    </div>
            }
        </section>
    )
}

export default Add_master