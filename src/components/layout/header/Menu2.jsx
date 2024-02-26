import React, { useContext, useState } from 'react'
import './Menu2.css'
import { GoTriangleDown } from 'react-icons/go'
import { GoTriangleUp } from 'react-icons/go'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Menu2 = ({ menu_logo, menu_title, category, menu_link,menucolor }) => {

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
            <Link to={`${menu_link}`} style={{color:"#000", textDecoration:"none"}}>
            <div className={`nav1-menu ${currentmode ? "nav1-menu_dark" : ""}`}>
                <div >
                    <div style={{color:menucolor}}>
                        {menu_logo}
                    </div>

                    <h3>{menu_title}</h3>
                </div>

            </div>
        </Link>
    )
}

export default Menu2