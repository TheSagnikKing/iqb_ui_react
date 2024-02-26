import React from 'react'
import './CustomerDetail.css'
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useSelector } from 'react-redux'

const CustomerDetail = ({ item }) => {

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <div className={`container ${currentmode && 'barber_container_dark'}`}>
            <div className="details">
                <p>Customer ID</p>
                <p>{item.customerID}</p>
            </div>

            <div className="details">
                <p>First Name</p>
                <p>{item.firstName}</p>
            </div>

            <div className="details">
                <p>Last Name</p>
                <p>{item.LastName}</p>
            </div>

            <button
            style={{
                background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)",
                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
            }}
            >
                Follow Up
            </button>

            <div className="btn_box">
                <div>
                    <IoMdNotificationsOutline
                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                    />
                </div>
                <div>
                    <BsThreeDotsVertical
                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomerDetail