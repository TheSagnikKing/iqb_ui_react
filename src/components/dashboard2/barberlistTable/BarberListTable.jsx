import React, { useEffect, useState } from 'react'

import PuffLoader from "react-spinners/PuffLoader"

import "./BarberListTable.css"
import { useDispatch, useSelector } from 'react-redux'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit } from 'react-icons/ai'
import { AiOutlineReload } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import { MdDelete } from "react-icons/md";
import { approveBarberAction, deleteBarberAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"

const BarberListTable = () => {

    const [barbersList, setBarbersList] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState("")

    const [sortOrdeData, setSortOrderData] = useState("")
    const [sortFieldData, setFieldData] = useState("")

    console.log(barbersList)
    
    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    //Salon Id dynamic thakbe
    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    useEffect(() => {
        const abortController = new AbortController();


        const getAllBarbersfunc = async () => {
            //Salon Id dynamic thakbe
        
            setLoading(true)
            const { data } = await api.post(`/api/barber/getAllBarberBySalonId?salonId=${Number(salonId)}`)
            setBarbersList(data)
            setCurrentPage(data.currentPage)
            setTotalPages(data.totalPages)
            setLoading(false)
        }
        getAllBarbersfunc()


        return () => {
            abortController.abort();
        };
    }, [salonId])

    const searchHandler = async () => {
        if (search === "") {

        } else {
            setLoading(true)
            const { data } = await api.post(`/api/barber/getAllBarberBySalonId?name=${search}&email=${search}`)
            setBarbersList(data)
            setLoading(false)
        }

    }


    const sortHandler = async (sortField, sortOrder) => {
        setLoading(true)
        setSortOrderData(sortOrder)
        setFieldData(sortField)
        const { data } = await api.post(`/api/barber/getAllBarberBySalonId?sortField=${sortField}&sortOrder=${sortOrder}`)
        setBarbersList(data)
        setLoading(false)
    }


    const NextHandler = async () => {
        let incpage = currentPage + 1
        if (incpage <= totalPages) {
            setLoading(true)
            //Salon Id dynamic thakbe
            const { data } = await api.post(`/api/barber/getAllBarberBySalonId?page=${incpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}&salonId=${salonId}`)
            setCurrentPage(data.currentPage)
            setBarbersList(data)
            setLoading(false)

        }
    }

    const PrevHandler = async () => {
        let decpage = currentPage - 1

        if (decpage > 0) {
            setLoading(true)
            //Salon Id dynamic thakbe
            const { data } = await api.post(`/api/barber/getAllBarberBySalonId?page=${decpage}&sortField=${sortFieldData}&sortOrder=${sortOrdeData}&salonId=${salonId}`)
            setCurrentPage(data.currentPage)
            setBarbersList(data)
            setLoading(false)
        }
    }

    const reloadHandler = async () => {
        setLoading(true)
        const { data } = await api.post(`/api/barber/getAllBarberBySalonId`)
        setBarbersList(data)
        setCurrentPage(data.currentPage)
        setTotalPages(data.totalPages)
        setLoading(false)
    }

    const navigate = useNavigate()

    const createBarberNavigate = () => {
        navigate("/barber/createbarber")
    }

    const dispatch = useDispatch()

    const deletebarberHandler = (salonId, email) => {
        dispatch(deleteBarberAction(salonId, email))
    }


    const [approveBarberMap, setApproveBarberMap] = useState(new Map());

    const approveHandler = (salonId, email) => {
        const approvedata = {
            salonId,
            email,
            isApproved: true
        }
        setApproveBarberMap((prevMap) => new Map([...prevMap, [`${salonId}-${email}`, true]]));

        dispatch(approveBarberAction(approvedata))
    }

    const editHandler = (barberemail) => {
        navigate("/barber/updatebarber",{state:{barberemail}})
    }

    return (
        <>
            <div className="wrapper">
                <div className="header">
                    <p>Barbers List</p>

                    <div>
                        <button onClick={reloadHandler} className='reload'><AiOutlineReload /></button>
                        <div>
                            <input
                                className='search'
                                type="text"
                                placeholder='Search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button onClick={searchHandler} className='search-btn'><AiOutlineSearch /></button>
                        </div>

                        <div onClick={createBarberNavigate}>
                            <GrAdd />
                        </div>
                        {/* 
                                <div>
                                    <BsThreeDotsVertical />
                                </div> */}
                    </div>
                </div>

                {/* Table  */}
                <div className='table'>
                    {
                        loading ? <div className='puff-loader-box'><PuffLoader /></div> : barbersList && barbersList.getAllBarbers ? barbersList?.getAllBarbers.map((barber, index) => <main className="barberitem" key={index}>
                            <div>
                                <div>
                                    <p>Salon ID</p>
                                    <div>
                                        <div onClick={() => sortHandler("salonId", "asc")}><AiOutlineArrowUp /></div>
                                        <div onClick={() => sortHandler("salonId", "des")}><AiOutlineArrowDown /></div>
                                    </div>
                                </div>
                                <p>{barber.salonId}</p>
                            </div>

                            <div>
                                <div>
                                    <p>Name</p>
                                    <div>
                                        <div onClick={() => sortHandler("name", "asc")}><AiOutlineArrowUp /></div>
                                        <div onClick={() => sortHandler("name", "des")}><AiOutlineArrowDown /></div>
                                    </div>
                                </div>
                                <p>{barber.name}</p>
                            </div>

                            <div>
                                <div>
                                    <p>Email</p>
                                    <div>
                                        <div><AiOutlineArrowUp /></div>
                                        <div><AiOutlineArrowDown /></div>
                                    </div>
                                </div>
                                <p>{barber.email}</p>
                            </div>

                            <div>
                                <div>
                                    <p>Date of Birth</p>
                                    <div>
                                        <div><AiOutlineArrowUp /></div>
                                        <div><AiOutlineArrowDown /></div>
                                    </div>
                                </div>
                                <p>{barber.dateOfBirth}</p>
                            </div>

                            <div>
                                <div>
                                    <p>is Active</p>
                                    <div>
                                        <div><AiOutlineArrowUp /></div>
                                        <div><AiOutlineArrowDown /></div>
                                    </div>
                                </div>
                                <p>{barber.isActive ? "True" : "false"}</p>
                            </div>

                            {/* <div>
                                <Link to="/barber/updatebarber"><AiFillEdit /></Link>
                            </div> */}

                            {/* className='approve-bbr' */}


                            {/* Updated approval button logic */}
                            {approveBarberMap.get(`${barber.salonId}-${barber.email}`) || barber.isApproved ? (
                                <button className='approve-bbr' style={{background:"gray"}}>Approved</button>
                            ) : (
                                <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email)}>Approve</button>
                            )}

                            <button className='edit-bbr' onClick={() => editHandler(barber.email)}><AiFillEdit /></button>


                            <button className='del-bbr' onClick={() => deletebarberHandler(barber.salonId, barber.email)}><MdDelete /></button>

                        </main>) : <div className='no-barber-box'><p>No Barbers Present</p></div>
                    }
                </div>

                <div className='barber-pagination'>
                    <div>
                        <div onClick={PrevHandler}><AiOutlineArrowLeft /></div>
                        <div onClick={NextHandler}><AiOutlineArrowRight /></div>
                    </div>
                </div>

            </div>


        </>
    )
}

export default BarberListTable