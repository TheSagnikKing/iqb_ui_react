import React, { useContext, useState } from 'react'
import './AdminMenu.css'
import { GoTriangleDown } from 'react-icons/go'
import { GoTriangleUp } from 'react-icons/go'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminMenu = ({ menu_logo, menu_title, category, menu_link, menucolor }) => {

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <Link to={`${menu_link}`} style={{ color: "#000", textDecoration: "none" }}>
            <div className={`nav1-menu ${currentmode ? "nav1-menu_dark" : ""}`}>
                <div >
                    <div style={{ color: menucolor }}>
                        {menu_logo}
                    </div>

                    <h3 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{menu_title}</h3>
                </div>

            </div>
        </Link>
    )
}

export default AdminMenu