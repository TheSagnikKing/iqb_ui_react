import React, { useContext, useState } from 'react'
import './AdminMenu.css'
import { GoTriangleDown } from 'react-icons/go'
import { GoTriangleUp } from 'react-icons/go'
import { Link } from 'react-router-dom'

const AdminMenu = ({ menu_logo, menu_title, category, menu_link }) => {

    const [dropdown, setDropdown] = useState(false)

    return (
        <>
            <div className="nav1-menu"
                onClick={(e) => setDropdown(!dropdown)}
            >
                <div>
                    <div>
                        {menu_logo}
                    </div>

                    <Link to={`${menu_link}`}><p>{menu_title}</p></Link>
                </div>

            </div>
        </>
    )
}

export default AdminMenu