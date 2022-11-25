import Link from 'next/link'
import React from 'react'
import Add_Master_Style from '../styles/add_master.module.css'

function Kharcha(props) {
    return (
        <section>
            {
                props.all_list ?
                    <div style={ { width: "65%", margin: "auto" } } className='card'>
                        <input
                            placeholder='Search Purchase Party Name'
                            style={ { minHeight: "3.6rem" } }
                            type="search" />
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Kharcha type</th>
                                    <th>Group name</th>
                                    <th style={ { textAlign: "center" } } colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.party_list.map((ele, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td>{ ele.id }</td>
                                                <td>{ ele.kharcha_name }</td>
                                                <td>{ ele.kharcha_group }</td>
                                                <td style={ { padding: "0" } }>
                                                    <button onClick={ () => props.delete_data(ele.id) } className='warning'>Delete</button>
                                                </td>
                                                <td style={ { padding: "10px" } }>
                                                    <button onClick={ () => props.edit_data(ele.id) }>Edit</button>
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
                            <label>Khata name</label>
                            <input
                                value={ props.party_master.party_name }
                                placeholder='Enter a party name'
                                name='party_name'
                                onChange={ props.party_change }
                                type="text" />
                        </div>

                        <div className={ `${Add_Master_Style.add_all_fild}` }>
                            <label>Group</label>
                            <input
                                value={ props.party_master.group_name }
                                placeholder='Enter a group name'
                                name='group_name'
                                onChange={ props.party_change }
                                type="text" />
                        </div>

                        <div
                            style={ { margin: "0" } }
                            className={ `${Add_Master_Style.add_all_fild}` }>
                            <button onClick={ props.save_data }>{ props.edit ? "Update" : "Save" }</button>
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

export default Kharcha