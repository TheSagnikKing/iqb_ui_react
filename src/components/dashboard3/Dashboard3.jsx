import React, { useEffect, useState } from 'react'
import PuffLoader from "react-spinners/PuffLoader"

import "./Dashboard3.css"

import { useSelector } from 'react-redux'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'
import { AiOutlineReload } from 'react-icons/ai'
import axios from 'axios'

const Dashboard3 = () => {

    const [customersList, setCustomersList] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState("")

    const [sortOrdeData, setSortOrderData] = useState("")
    const [sortFieldData, setFieldData] = useState("")

    useEffect(() => {
        const abortController = new AbortController();

        const getAllBarbersfunc = async () => {
            setLoading(true)
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers`)
            setCustomersList(data)
            setCurrentPage(data.currentPage)
            setTotalPages(data.totalPages)
            setLoading(false)
        }
        getAllBarbersfunc()


        return () => {
            abortController.abort();
        };
    }, [])

    const searchHandler = async () => {
        if(search === ""){
           
        }else{
            setLoading(true)
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers?name=${search}&email=${search}`)
            setCustomersList(data)
            setLoading(false)
        }
       
    }


    const sortHandler = async (sortField, sortOrder) => {
        setLoading(true)
        setSortOrderData(sortOrder)
        setFieldData(sortField)
        const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers?sortField=${sortField}&sortOrder=${sortOrder}`)
        setCustomersList(data)
        setLoading(false)
    }


    const NextHandler = async () => {
        let incpage = currentPage + 1
        if (incpage <= totalPages) {
            setLoading(true)
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers?page=${incpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}`)
            setCurrentPage(data.currentPage)
            setCustomersList(data)
            setLoading(false)

        }
    }

    const PrevHandler = async () => {
        let decpage = currentPage - 1

        if (decpage > 0) {
            setLoading(true)
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers?page=${decpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}`)
            setCurrentPage(data.currentPage)
            setCustomersList(data)
            setLoading(false)
        }
    }

    const reloadHandler = async () => {
        setLoading(true)
        const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/customer/getAllCustomers`)
        setCustomersList(data)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
        setLoading(false)
    }

    return (
        <>

                    <div className="cst-wrapper">
                        <div className="cst-header">
                            <p>Customer List</p>

                            <div>
                                <button onClick={reloadHandler} className='cst-reload'><AiOutlineReload /></button>
                                <div>
                                    <input
                                        className='cst-search'
                                        type="text"
                                        placeholder='Search'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />

                                    <button onClick={searchHandler} className='cst-search-btn'><AiOutlineSearch /></button>
                                </div>

                                {/* <div >
                                    <GrAdd />
                                </div> */}
                                {/* 
                                <div>
                                    <BsThreeDotsVertical />
                                </div> */}
                            </div>
                        </div>

                        {/* Table  */}
                        <div className='cst-table'>
                            {
                                loading ? <div className='cst-puff-loader-box'><PuffLoader/></div> : customersList && customersList.getAllCustomers ? customersList?.getAllCustomers.map((customer, index) => <main className="cst-barberitem" key={index}>
                                    <div>
                                        <div>
                                            <p>Salon ID</p>
                                            <div>
                                                <div onClick={() => sortHandler("salonId", "asc")}><AiOutlineArrowUp /></div>
                                                <div onClick={() => sortHandler("salonId", "des")}><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.salonId}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>Name</p>
                                            <div>
                                                <div onClick={() => sortHandler("name", "asc")}><AiOutlineArrowUp /></div>
                                                <div onClick={() => sortHandler("name", "des")}><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.name}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>Email</p>
                                            <div>
                                                <div><AiOutlineArrowUp /></div>
                                                <div><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.email}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>Date of Birth</p>
                                            <div>
                                                <div><AiOutlineArrowUp /></div>
                                                <div><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.dateOfBirth}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>Gender</p>
                                            <div>
                                                <div><AiOutlineArrowUp /></div>
                                                <div><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.gender}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>Mobile Number</p>
                                            <div>
                                                <div><AiOutlineArrowUp /></div>
                                                <div><AiOutlineArrowDown /></div>
                                            </div>
                                        </div>
                                        <p>{customer.mobileNumber}</p>
                                    </div>

                                </main>) : <div className='cst-no-barber-box'><p>No Customers Present</p></div>
                            }
                        </div>

                        <div className='cst-barber-pagination'>
                            <div>
                                <div onClick={PrevHandler}><AiOutlineArrowLeft /></div>
                                <div onClick={NextHandler}><AiOutlineArrowRight /></div>
                            </div>
                        </div>

                    </div>
                
        </>
    )
}

export default Dashboard3