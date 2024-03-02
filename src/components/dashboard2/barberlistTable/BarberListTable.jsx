import React, { useEffect, useRef, useState } from 'react'

import PuffLoader from "react-spinners/PuffLoader"

import "./BarberListTable.css"
import { useDispatch, useSelector } from 'react-redux'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch, AiOutlineArrowUp, AiOutlineArrowDown, AiFillEdit } from 'react-icons/ai'
import { AiOutlineReload } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

import { MdDelete } from "react-icons/md";
import { adminOnlineStatusAction, approveBarberAction, barberOnlineStatusAction, deleteBarberAction } from '../../../redux/actions/barberAction'

import api from "../../../redux/api/Api"

import { IoIosNotifications, IoMdCheckmark, IoMdNotifications } from "react-icons/io";
import { FaXmark } from 'react-icons/fa6'
import { salonStatusOnlineAction } from '../../../redux/actions/salonAction'

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


    const BarberListcontrollerRef = useRef(null);

    useEffect(() => {
        const getAllBarbersfunc = async () => {
            try {
                if (BarberListcontrollerRef.current) {
                    BarberListcontrollerRef.current.abort(); // Abort previous request if it exists
                }

                const newController = new AbortController();
                BarberListcontrollerRef.current = newController;

                const signal = newController.signal;

                setLoading(true);

                const response = await api.post(`/api/barber/getAllBarberBySalonId?salonId=${Number(salonId)}`, {}, { signal });

                // Check if the request was not aborted

                setBarbersList(response.data);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
                setLoading(false);

            } catch (error) {

                console.log(error);

            }
        };

        getAllBarbersfunc();

        return () => {
            BarberListcontrollerRef.current.abort();
        };

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

    const notifyemailHandler = (barberemail) => {
        navigate("/barber/dashboard2/singlenotification", { state: { barberemail } })
    }

    const multipleemailHandler = () => {
        navigate("/barber/dashboard2/multiplenotification", { state: checkboxArray })
    }


    // const [check, setCheck] = useState(false)


    // const setOnlineHandler = (currentbarberId, currentSalonId, currentisOnline) => {
    //     const newCheckValue = !check;
    //     setCheck(newCheckValue);

    //     const barberOnlineData = {
    //         barberId: currentbarberId,
    //         salonId: currentSalonId,
    //         isOnline: currentisOnline,
    //     };

    //     console.log(barberOnlineData)

    //     dispatch(barberOnlineStatusAction(barberOnlineData));
    // };


    const [checkMap, setCheckMap] = useState(new Map());

    useEffect(() => {
        if (barbersList?.getAllBarbers) {
            const initialCheckMap = new Map();
            barbersList.getAllBarbers.forEach(barber => {
                const key = `${barber.salonId}-${barber.barberId}`;
                initialCheckMap.set(key, barber.isOnline || false);
            });
            setCheckMap(initialCheckMap);
        }
    }, [barbersList]);

    const setOnlineHandler = (currentbarberId, currentSalonId) => {
        setCheckMap((prevCheckMap) => {
            const newCheckMap = new Map(prevCheckMap);
            const key = `${currentSalonId}-${currentbarberId}`;
            const newIsOnline = !newCheckMap.get(key) || false; // Toggle the value
            newCheckMap.set(key, newIsOnline);
            return newCheckMap;
        });

        const barberOnlineData = {
            barberId: currentbarberId,
            salonId: currentSalonId,
            isOnline: !checkMap.get(`${currentSalonId}-${currentbarberId}`) || false,
        };

        console.log(barberOnlineData);

        // Dispatch the action or handle the state as needed
        dispatch(adminOnlineStatusAction(barberOnlineData));
    };


    console.log("Current Barber List ", barbersList)

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentMode = darkMode === "On"

    return (
        <div className={`barberlist-wrapper ${currentMode ? "barberlist-wrapper_dark" : ""}`}>
            <div className="barberlist-header">
                <div>
                    <h3 style={{ color: currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Barbers List</h3>

                    <div className='notify-buttons'>
                        <button
                            disabled={checkboxArray.length == 0 ? true : false}
                            onClick={() => multipleemailHandler()}
                            style={{
                                background: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                height: "3rem",
                                marginLeft: "1rem",
                                fontSize: "1.8rem",
                                boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                display: "flex",
                                justifyContent: "cenetr",
                                alignItems: "center",
                                color: `${checkboxArray.length === 0 ? "gray" : "red"}`


                            }}
                        ><IoMdNotifications /></button>

                    </div>

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
                    <button style={{ background: "#f16fc", width: "1px", height: "1px" }}></button>
                    <div></div>

                    <div onClick={createBarberNavigate} style={{ cursor: "point"}}>
                        <GrAdd/>
                    </div>
                </div>
            </div>

            {/* Table  */}
            <div className={`table ${currentMode ? "table_dark" : ""}`}>
                {
                    <main className={`barberitem-head ${currentMode && "barberitem-head_dark"}`}>
                        <div><p></p></div>
                        <div>
                            <div>
                                <h4 style={{color: currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Salon ID</h4>
                                {/* <div>
                                    <div onClick={() => sortHandler("salonId", "asc")}><AiOutlineArrowUp /></div>
                                    <div onClick={() => sortHandler("salonId", "des")}><AiOutlineArrowDown /></div>
                                </div> */}
                            </div></div>

                        <div><div>
                            <h4 style={{color: currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Barber Name</h4>
                            {/* <div>
                                <div onClick={() => sortHandler("name", "asc")}><AiOutlineArrowUp /></div>
                                <div onClick={() => sortHandler("name", "des")}><AiOutlineArrowDown /></div>
                            </div> */}
                        </div></div>

                        <div><div>
                            <h4 style={{color: currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Email</h4>
                            {/* <div>
                                <div onClick={() => sortHandler("email", "asc")}><AiOutlineArrowUp /></div>
                                <div onClick={() => sortHandler("email", "des")}><AiOutlineArrowDown /></div>
                            </div> */}
                        </div></div>

                        <h4 className='barber-isActive' style={{color: currentMode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>isOnline</h4>
                    </main>
                }

                {
                    loading ? (
                        <div className='puff-loader-box'>
                            <PuffLoader />
                        </div>
                    ) : barbersList && barbersList.getAllBarbers ? (
                        barbersList?.getAllBarbers.map((barber, index) => (
                            <main className={`barberlist-barberitem ${currentMode ? "barberlist-barberitem_dark" : ""}`} key={index}>
                                <div>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => setCheckboxHandler(e, barber)}
                                    />
                                </div>

                                <div>
                                    <p className={`barberlist-barberitem_text ${currentMode ? "barberlist-barberitem_text_dark" : ""}`}>{barber.salonId}</p>
                                </div>

                                <div>
                                    <p className={`barberlist-barberitem_text ${currentMode ? "barberlist-barberitem_text_dark" : ""}`}>{barber.name}</p>
                                </div>

                                <div>
                                    <p className={`barberlist-barberitem_text ${currentMode ? "barberlist-barberitem_text_dark" : ""}`}>{barber.email}</p>
                                </div>

                                {/* <div>
                                    <p>{barber.dateOfBirth}</p>
                                </div> */}

                                <div style={{
                                    background: "none",
                                    boxShadow: "none",
                                    fontSize: "1.2rem",
                                    width: "100%"
                                }}>
                                    {/* <p>{barber.isOnline ? <IoMdCheckmark style={{color:"green",fontSize:"2rem",fontWeight:"bold"}} /> : <FaXmark style={{color:"red",fontSize:"2rem",fontWeight:"bold"}} />}</p> */}

                                    {/* <label className="nav2toggle_switch" >
                                        <input type="checkbox"
                                            value={barber.isOnline === true ? barber.isOnline : check}
                                            onClick={() => setOnlineHandler(barber.barberId, barber.salonId,barber.isOnline)}

                                        />
                                        <span className="nav2slider"></span>
                                        <span className={`nav2slider ${barber.isOnline ? 'checked' : ''}`}
                                            style={{
                                                background: barber.isOnline ? "#4CBB17" : ""
                                            }}
                                        ></span>
                                    </label> */}

                                    <label className="nav2toggle_switch">
                                        <input
                                            type="checkbox"
                                            checked={checkMap.get(`${barber.salonId}-${barber.barberId}`) || false}
                                            onClick={() => setOnlineHandler(barber.barberId, barber.salonId, barber.isOnline)}
                                        />
                                        <span className="nav2slider"></span>
                                        <span
                                            className={`nav2slider ${checkMap.get(`${barber.salonId}-${barber.barberId}`) ? 'checked' : ''}`}
                                            style={{
                                                background: checkMap.get(`${barber.salonId}-${barber.barberId}`) ? "#4CBB17" : ""
                                            }}
                                        ></span>
                                    </label>


                                </div>

                                {approveBarberMap.get(`${barber.salonId}-${barber.email}`) || barber.isApproved ? (
                                    <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, false)} style={{ background: "gray" }}>Approved</button>
                                ) : (
                                    <button className='approve-bbr' onClick={() => approveHandler(barber.salonId, barber.email, true)} style={{ background: "white" }}>Approve</button>
                                )}

                                {/* <div>
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
                                </div> */}

                                <button className='edit-bbr' onClick={() => editHandler(barber.email)}><AiFillEdit /></button>

                                <button className='del-bbr' onClick={() => deletebarberHandler(barber.salonId, barber.email)} style={{ color: "red" }}><MdDelete /></button>
                            </main>
                        ))
                    ) : (
                        <div className='no-barber-box'>
                            <p className={`barberlist-barberitem_text ${currentMode ? "barberlist-barberitem_text_dark" : ""}`}>No Barbers Present</p>
                        </div>
                    )
                }

            </div>

            {/* <div className={`barberlist-barber-pagination ${currentMode ? "barberlist-barber-pagination_dark" : ""}`}>
                <div>
                    <div onClick={PrevHandler}><AiOutlineArrowLeft /></div>
                    <div onClick={NextHandler}><AiOutlineArrowRight /></div>
                </div>
            </div> */}

        </div>
    )
}

export default BarberListTable