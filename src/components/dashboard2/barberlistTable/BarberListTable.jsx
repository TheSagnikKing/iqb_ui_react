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

import { IoIosNotifications } from "react-icons/io";

const BarberListTable = () => {

    const [barbersList, setBarbersList] = useState([])
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState("")

    const [sortOrdeData, setSortOrderData] = useState("")
    const [sortFieldData, setFieldData] = useState("")

    // console.log(barbersList)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    //Salon Id dynamic thakbe
    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    useEffect(() => {
        // const abortController = new AbortController();


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


        // return () => {
        //     abortController.abort();
        // };
    }, [Number(salonId)])

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
        const { data } = await api.post(`/api/barber/getAllBarberBySalonId?sortField=${sortField}&sortOrder=${sortOrder}&salonId=${salonId}`)
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
        const { data } = await api.post(`/api/barber/getAllBarberBySalonId?salonId=${Number(salonId)}`)
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
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            dispatch(deleteBarberAction(salonId, email))
        }
    }


    const [approveBarberMap, setApproveBarberMap] = useState(new Map());

    const approveHandler = (salonId, email, boolean) => {
        const approvedata = {
            salonId,
            email,
            isApproved: boolean
        }
        setApproveBarberMap((prevMap) => new Map([...prevMap, [`${salonId}-${email}`, boolean]]));

        dispatch(approveBarberAction(approvedata))
        console.log(approvedata)
    }

    const editHandler = (barberemail) => {
        navigate("/barber/updatebarber", { state: { barberemail } })
    }


    const [checkboxArray, setCheckboxArray] = useState([])

    const setCheckboxHandler = (e, barber) => {
        // console.log("The barber check", e.target.checked)
        // console.log("The barber value", barber.email)

        const checked = e.target.checked;
        const newCheckboxArray = checked
            ? [...checkboxArray, barber.email] // Add email if checked
            : checkboxArray.filter((email) => email !== barber.email); // Remove if unchecked

        setCheckboxArray(newCheckboxArray);
    }

    console.log(checkboxArray)

    const notifyemailHandler = (barberemail) => {
        navigate("/barber/dashboard2/singlenotification", { state: { barberemail } })
    }

    const multipleemailHandler = () => {
        navigate("/barber/dashboard2/multiplenotification", { state: checkboxArray })
    }


    return (
        <div className="barberlist-wrapper">
            <div className="barberlist-header">
                <div>
                    <h2>Barbers List</h2>

                    {/* <div className='notify-buttons'>
                            <button
                                disabled={checkboxArray.length == 0 ? true : false}
                                onClick={() => multipleemailHandler()}
                                style={{
                                    background:"#fff",
                                    boxShadow:"0px 0px 4px rgba(0,0,0,0.6)",
                                    border:"none",
                                    borderRadius:"5px",
                                    height:"3rem",
                                    marginLeft:"1rem"

                                }}
                            >Send multiple</button>
                            
                        </div> */}

                </div>

                <div>
                    {/* <button onClick={reloadHandler} className='reload' style={{marginRight:"1rem"}}><AiOutlineReload /></button>
                        <div>
                            <input
                                className='search'
                                type="text"
                                placeholder='Search'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button onClick={searchHandler} className='search-btn'><AiOutlineSearch /></button>
                        </div> */}
                    <button></button>
                    <div></div>

                    <div onClick={createBarberNavigate}>
                        <GrAdd />
                    </div>
                </div>
            </div>

            {/* Table  */}
            <div className='table'>
                {
                    <main className="barberitem-head">
                        <div><p>#</p></div>
                        <div>
                            <div>
                                <h4>Salon ID</h4>
                                <div>
                                    <div onClick={() => sortHandler("salonId", "asc")}><AiOutlineArrowUp /></div>
                                    <div onClick={() => sortHandler("salonId", "des")}><AiOutlineArrowDown /></div>
                                </div>
                            </div></div>

                        <div><div>
                            <h4>Barber Name</h4>
                            <div>
                                <div onClick={() => sortHandler("name", "asc")}><AiOutlineArrowUp /></div>
                                <div onClick={() => sortHandler("name", "des")}><AiOutlineArrowDown /></div>
                            </div>
                        </div></div>

                        <div><div>
                            <h4>Email</h4>
                            <div>
                                <div onClick={() => sortHandler("email", "asc")}><AiOutlineArrowUp /></div>
                                <div onClick={() => sortHandler("email", "des")}><AiOutlineArrowDown /></div>
                            </div>
                        </div></div>

                        <div><div>
                            <h4>Date of Birth</h4>
                            <div>
                                <div><AiOutlineArrowUp /></div>
                                <div><AiOutlineArrowDown /></div>
                            </div>
                        </div></div>
                        <h4 className='barber-isActive'>isActive</h4>
                    </main>
                }
                {/* {
                        loading ? <div className='puff-loader-box'><PuffLoader /></div> :
                            barbersList && barbersList.getAllBarbers ? barbersList?.getAllBarbers.map((barber, index) =>
                                <mai className="barberlist-barberitem" key={index}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => setCheckboxHandler(e, barber)}

                                        />

                                    </div>

                                    <div>
                                        
                                        <p>{barber.salonId}</p>
                                    </div>

                                    <div>
                                        
                                        <p>{barber.name}</p>
                                    </div>

                                    <div>
                                        
                                        <p>{barber.email}</p>
                                    </div>

                                    <div>
                                        
                                        <p>{barber.dateOfBirth}</p>
                                    </div>


                                    <div style={{
                                        background: "none",
                                        boxShadow: "none",
                                        fontSize: "1.2rem",
                                        width: "100%"
                                    }}>

                                        <p>is Active</p>

                                        <p>{barber.isActive ? "True" : "false"}</p>
                                    </div>


                                    {approveBarberMap.get(`${barber.salonId}-${barber.email}`) || barber.isApproved ? (
                                        <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, false)} style={{ background: "gray" }}>Approved</button>
                                    ) : (
                                        <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, true)} style={{ background: "white" }}>Approve</button>
                                    )}

                                    <div>
                                        <div style={{
                                            fontSize: "1.4rem",
                                            color: "limegreen",
                                            marginTop: "0.2rem",
                                            cursor: "pointer",
                                            height: "3.5rem",
                                            width: "4.5rem",
                                            background: "#fff",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            boxShadow: "0px 0px 4px rgba(0,0,0,0.5)",
                                            borderRadius: "0.6rem"
                                        }}
                                            onClick={() => notifyemailHandler(barber.email)}
                                        ><IoIosNotifications /></div>
                                    </div>

                                    <button className='edit-bbr' onClick={() => editHandler(barber.email)}><AiFillEdit /></button>


                                    <button className='del-bbr' onClick={() => deletebarberHandler(barber.salonId, barber.email)} style={{color:"red"}}><MdDelete /></button>

                                </mai
                                n>) : <div className='no-barber-box'><p>No Barbers Present</p></div>
                    }  */}

                {/* <main className="barberlist-barberitem">
                    <div> <input
                        type="checkbox"
                        onChange={(e) => setCheckboxHandler(e, barber)}

                    /></div>
                    <div>
                        <div>
                            <h4>1</h4>

                        </div></div>

                    <div><div>
                        <h4>Barber Name</h4>

                    </div></div>

                    <div><div>
                        <h4>sagniknandy27@gmail.com</h4>

                    </div></div>

                    <div><div>
                        <h4>2024-02-09T00:00:00.000Z</h4>

                    </div></div>
                    <h4 className='barber-isActive'>true</h4>

                    <div><button style={{ background: "gray",fontSize:"1.2rem" }}>Approved</button></div>
                    <div><div style={{
                                        fontSize: "1.4rem",
                                        color: "limegreen",
                                        marginTop: "0.2rem",
                                        cursor: "pointer",
                                        height: "3.5rem",
                                        width: "4.5rem",
                                        background: "#fff",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 0px 4px rgba(0,0,0,0.5)",
                                        borderRadius: "0.6rem"
                                    }}
                                        
                                    ><IoIosNotifications /></div></div>
                    <div> <button className='edit-bbr'><AiFillEdit /></button></div>
                    <div> <button className='del-bbr'  style={{ color: "red" }}><MdDelete /></button></div>
                </main> */}


                {
                    loading ? (
                        <div className='puff-loader-box'>
                            <PuffLoader />
                        </div>
                    ) : barbersList && barbersList.getAllBarbers ? (
                        barbersList?.getAllBarbers.map((barber, index) => (
                            <main className="barberlist-barberitem" key={index}>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setCheckboxHandler(e, barber)}
                                    />
                                </div>

                                <div>
                                    <p>{barber.salonId}</p>
                                </div>

                                <div>
                                    <p>{barber.name}</p>
                                </div>

                                <div>
                                    <p>{barber.email}</p>
                                </div>

                                <div>
                                    <p>{barber.dateOfBirth}</p>
                                </div>

                                <div style={{
                                    background: "none",
                                    boxShadow: "none",
                                    fontSize: "1.2rem",
                                    width: "100%"
                                }}>
                                    <p>{barber.isActive ? "True" : "false"}</p>
                                </div>

                                {approveBarberMap.get(`${barber.salonId}-${barber.email}`) || barber.isApproved ? (
                                    <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, false)} style={{ background: "gray" }}>Approved</button>
                                ) : (
                                    <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, true)} style={{ background: "white" }}>Approve</button>
                                )}

                                <div>
                                    <div style={{
                                        fontSize: "1.4rem",
                                        color: "limegreen",
                                        marginTop: "0.2rem",
                                        cursor: "pointer",
                                        height: "3.5rem",
                                        width: "4.5rem",
                                        background: "#fff",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        boxShadow: "0px 0px 4px rgba(0,0,0,0.5)",
                                        borderRadius: "0.6rem"
                                    }}
                                        onClick={() => notifyemailHandler(barber.email)}
                                    ><IoIosNotifications /></div>
                                </div>

                                <button className='edit-bbr' onClick={() => editHandler(barber.email)}><AiFillEdit /></button>

                                <button className='del-bbr' onClick={() => deletebarberHandler(barber.salonId, barber.email)} style={{ color: "red" }}><MdDelete /></button>
                            </main>
                        ))
                    ) : (
                        <div className='no-barber-box'>
                            <p>No Barbers Present</p>
                        </div>
                    )
                }

            </div>

            <div className='barberlist-barber-pagination'>
                <div>
                    <div onClick={PrevHandler}><AiOutlineArrowLeft /></div>
                    <div onClick={NextHandler}><AiOutlineArrowRight /></div>
                </div>
            </div>

        </div>
    )
}

export default BarberListTable