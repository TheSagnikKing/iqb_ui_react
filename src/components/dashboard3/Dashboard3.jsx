import React, { useEffect, useRef, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader"

import "./Dashboard3.css"


import { IoIosNotifications } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { MdSms } from "react-icons/md";

import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import api from "../../redux/api/Api"
import { useSelector } from 'react-redux';

const Dashboard3 = () => {

    const [customersList, setCustomersList] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState("")

    const [sortOrdeData, setSortOrderData] = useState("")
    const [sortFieldData, setFieldData] = useState("")

    const getAllCustomersRef = useRef(null);

    useEffect(() => {

        if (getAllCustomersRef.current) {
            getAllCustomersRef.current.abort()
        }

        const newController = new AbortController();
        getAllCustomersRef.current = newController

        const signal = newController.signal;

        const getAllCustomersfnc = async () => {
            setLoading(true)
            const { data } = await api.get(`/api/customer/getAllCustomers`, { signal })
            setCustomersList(data)
            setCurrentPage(data.currentPage)
            setTotalPages(data.totalPages)
            setLoading(false)
        }
        getAllCustomersfnc()


        return () => {
            getAllCustomersRef.current.abort()
        };
    }, [])

    const searchHandler = async () => {
        if (search === "") {

        } else {
            setLoading(true)
            const { data } = await api.get(`/api/customer/getAllCustomers?name=${search}&email=${search}`)
            setCustomersList(data)
            setLoading(false)
        }

    }


    const sortHandler = async (sortField, sortOrder) => {
        setLoading(true)
        setSortOrderData(sortOrder)
        setFieldData(sortField)
        const { data } = await api.get(`/api/customer/getAllCustomers?sortField=${sortField}&sortOrder=${sortOrder}`)
        setCustomersList(data)
        setLoading(false)
    }


    const NextHandler = async () => {
        let incpage = currentPage + 1
        if (incpage <= totalPages) {
            setLoading(true)
            const { data } = await api.get(`/api/customer/getAllCustomers?page=${incpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}`)
            setCurrentPage(data.currentPage)
            setCustomersList(data)
            setLoading(false)

        }
    }

    const PrevHandler = async () => {
        let decpage = currentPage - 1

        if (decpage > 0) {
            setLoading(true)
            const { data } = await api.get(`/api/customer/getAllCustomers?page=${decpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}`)
            setCurrentPage(data.currentPage)
            setCustomersList(data)
            setLoading(false)
        }
    }

    const reloadHandler = async () => {
        setLoading(true)
        const { data } = await api.get(`/api/customer/getAllCustomers`)
        setCustomersList(data)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
        setLoading(false)
    }
    const navigate = useNavigate()

    const mailHandler = (customeremail) => {
        navigate("/customer/customeremail", { state: customeremail })
    }

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard",darkMode)

    const currentmode = darkMode === "On"

    return (
        <div className="cst-wrapper">
            <div className="cst-header">
                <p style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Customer List</p>

                <div>
                    {/* <button onClick={reloadHandler} className='cst-reload'><AiOutlineReload /></button> */}
                    <div style={{ background: "#f1f6fc",display:"none" }}></div>
                    <div>

                        <button onClick={searchHandler} className='cst-search-btn' style={{ border: "none", background:currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)" , color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}><AiOutlineSearch /></button>
                    </div>

                </div>
            </div>

            {/* Table  */}
            <div className={`cst-table ${currentmode ? "cst-table_dark" : ""}`}>
                {
                    <main className={`cst-barberitem ${currentmode ? "cst-barberitem_dark" : ""}`}>
                        <div><div>
                            <h4 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Salon ID</h4>
                            {/* <div>
                                        <div onClick={() => sortHandler("salonId", "asc")}><AiOutlineArrowUp /></div>
                                        <div onClick={() => sortHandler("salonId", "des")}><AiOutlineArrowDown /></div>
                                    </div> */}
                        </div></div>
                        <div><div>
                            <h4 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Name</h4>
                            {/* <div>
                                        <div onClick={() => sortHandler("name", "asc")}><AiOutlineArrowUp /></div>
                                        <div onClick={() => sortHandler("name", "des")}><AiOutlineArrowDown /></div>
                                    </div> */}
                        </div></div>
                        <div><div>
                            <h4 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Email</h4>
                            {/* <div>
                                        <div><AiOutlineArrowUp /></div>
                                        <div><AiOutlineArrowDown /></div>
                                    </div> */}
                        </div></div>

                        <div><div>
                            <h4 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Gender</h4>
                            {/* <div>
                                        <div><AiOutlineArrowUp /></div>
                                        <div><AiOutlineArrowDown /></div>
                                    </div> */}
                        </div></div>
                        <div><h4 style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Mobile Number</h4></div>


                        <div className='icons-bbr'
                        style={{background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"}}
                        ><IoIosNotifications style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}/></div>

                        <div className='icons-bbr'
                        style={{background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"}}
                        ><IoMail style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}/></div>

                        <div className='icons-bbr'
                        style={{background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"}}
                        ><MdSms style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}/></div>


                    </main>
                }
                {
                    loading ? <div className='cst-puff-loader-box'><PuffLoader /></div> : customersList && customersList.getAllCustomers ? customersList?.getAllCustomers.map((customer, index) => <main className={`cst-barberitem ${currentmode ? "cst-barberitem_dark" : ""}`} key={index}>
                        <div>
                            <p>{customer.salonId}</p>
                        </div>

                        <div>
                            <p>{customer.name}</p>
                        </div>

                        <div>
                            <p>{customer.email}</p>
                        </div>

                        {/* <div>
                                <p>{customer.dateOfBirth}</p>
                            </div> */}

                        <div>
                            <p>{customer.gender}</p>
                        </div>

                        <div>
                            <p>{customer.mobileNumber}</p>
                        </div>

                        {/* <div className='icons-bbr'><IoIosNotifications /></div>

                        <div className='icons-bbr' onClick={() => mailHandler(customer.email)}><IoMail /></div>

                        <div className='icons-bbr'><MdSms /></div> */}

                    </main>) : <div className='cst-no-barber-box'><p>No Customers Present</p></div>
                }
            </div>

            <div className={`cst-barber-pagination ${currentmode ? "cst-barber-pagination_dark" : ""}`}>
                <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div onClick={PrevHandler}><AiOutlineArrowLeft style={{color:"var(--dark-secondary-color)"}}/></div>
                    <div onClick={NextHandler}><AiOutlineArrowRight style={{color:"var(--dark-secondary-color)"}}/></div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard3