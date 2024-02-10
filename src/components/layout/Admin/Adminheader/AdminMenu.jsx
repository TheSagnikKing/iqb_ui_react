import React, { useContext, useState } from 'react'
import './AdminMenu.css'
import { GoTriangleDown } from 'react-icons/go'
import { GoTriangleUp } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'

const AdminMenu = ({ menu_logo, menu_title, category, menu_link }) => {

    return (
        <Link to={`${menu_link}`} style={{color:"#000", textDecoration:"none"}}>
            <div className="nav1-menu"
                
            >
                <div >
                    <div>
                        {menu_logo}
                    </div>

                    <h3 >{menu_title}</h3>
                </div>

            </div>
        </Link>
    )
}

export default AdminMenu