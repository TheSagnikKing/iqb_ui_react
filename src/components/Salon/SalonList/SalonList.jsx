import React, { useEffect, useRef, useState } from 'react'
import "./SalonList.css"
import { useDispatch, useSelector } from 'react-redux'
import { GrAdd } from 'react-icons/gr'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { RiSettings3Fill } from 'react-icons/ri'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { MdDelete } from 'react-icons/md'
import { deleteSalonAction } from '../../../redux/actions/salonAction'
import { setSharedSalonData } from '../updateSalon/salonId'

import api from '../../../redux/api/Api'

import { toast } from 'react-toastify';

const SalonList = () => {

    const [search, setSearch] = useState("")
    const [salonList, setSalonList] = useState([])
    const [loading, setLoading] = useState(false)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const currentAdminEmail = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].email

    console.log("Sagnik",salonList)

    const controllerRef = useRef(new AbortController());

    useEffect(() => {
        //Admin emailer value loggin korar por theke asbe akhon static ache
        if(currentAdminEmail){
            const fetchSalons = async () => {
                try {
    
                    const controller = new AbortController();
                    controllerRef.current = controller;
    
    
                    // arghyahimanstech@gmail.com 
                    const { data } = await api.get(`https://iqb-backend2.onrender.com/api/salon/getAllSalonsByAdminEmail?adminEmail=${currentAdminEmail} `,{ signal: controller.signal })
                    setSalonList(data)
                    setLoading(false)
                } catch (error) {
                    if (error?.response?.data?.message == "Refresh Token not present.Please Login Again") {
                        localStorage.setItem("userLoggedIn", "false")
                        navigate("/admin-signin")
                    }else{
                        toast.error(error?.response?.data?.message, {
                            position: "top-right"
                          });
                    }
                }
            }
    
            fetchSalons()
        }
        

        return () => {
            controllerRef.current.abort();
        };

    }, [currentAdminEmail])


    const navigate = useNavigate()

    const addSalonNavigate = () => {
        navigate("/salon/createsalon")
    }

    const dispatch = useDispatch()

    const deleteSalonHandler = (salonId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this salon?");

        if (isConfirmed) {
            dispatch(deleteSalonAction(salonId));
        }

    }

    const changeRoute = (salonID) => {
        navigate(`/salon/updatesalon`, { state: { salonId: salonID } })
    }

    const darkMode = useSelector(state => state.color.darkmode)

    return (
        <>
            <AdminLayout />
            <div className={`wrapper`}>
                <div className="header">
                    <p style={{color:darkMode === "On" ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Salons List</p>

                    <div>
                        <div onClick={addSalonNavigate} style={{ fontSize: "1.4rem", background: "#fff", height: "3.5rem", width: "3.5rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <GrAdd />
                        </div>
                    </div>
                </div>

                {/* Table  */}
                <div className={`table ${darkMode === "On" ? "table_dark" : ""}`}>
                    {
                        <div className={`salon-item ${darkMode === "On" ? "salon-item_dark" : ""}`}>
                            <div><h4>Salon ID</h4></div>
                            <div><h4>Salon Code</h4></div>
                            <div><h4>Salon Name</h4></div>
                            <div><h4>Admin Email</h4></div>
                            <div><h4>Address</h4></div>
                            <div><h4>City</h4></div>
                        </div>
                    }
                    {
                        loading ? <div className='salon-puff-loader-box'><PuffLoader /></div> : salonList && salonList.response ? salonList.response.map((salon, index) => (
                            <div key={index} className={`salon-item ${darkMode === "On" ? "salon-item_dark" : ""}`}>
                                <div>
                                    <p>{salon.salonId}</p>
                                </div>

                                <div>
                                    <p>{salon.salonCode}</p>
                                </div>

                                <div>
                                    <p>{salon.salonName}</p>
                                </div>

                                <div>
                                    <p>{salon.adminEmail}</p>
                                </div>

                                <div>
                                    <p>{salon.address}</p>
                                </div>

                                <div>
                                    <p>{salon.city}</p>
                                </div>

                                <button onClick={() => changeRoute(salon.salonId)} style={{
                                    color: "blue",
                                    background: "transparent",
                                    width: "5rem",
                                    border: "1px solid blue",
                                    cursor: "pointer",
                                    boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                    borderRadius: "5px",
                                    fontSize: "1.4rem"
                                }}>
                                    <AiFillEdit />
                                </button>

                                <button className='del-bbr' onClick={() => deleteSalonHandler(salon.salonId)} style={{
                                    color: "red",
                                    background: "transparent",
                                    width: "5rem",
                                    border: "1px solid red",
                                    cursor: "pointer",
                                    boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                    borderRadius: "5px",
                                    fontSize: "1.4rem"
                                }}><MdDelete /></button>

                                <Link to="#">
                                    <Link to="/salon/salonsettings"
                                        style={{
                                            display: "flex", justifyContent: "center", alignItems: "center",
                                            color: "purple",
                                            background: "transparent",
                                            width: "5rem",
                                            border: "1px solid purple",
                                            cursor: "pointer",
                                            boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
                                            borderRadius: "5px",
                                            fontSize: "1.4rem",
                                            padding:"0.8rem"
                                        }}
                                    > <RiSettings3Fill /></Link>
                                </Link>

                            </div>
                        )) : <p className='salon-search'>Search Your Salons</p>
                    }
                </div>

            </div>

        </>
    )
}

export default SalonList