import React, { useEffect, useState } from 'react'
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

const SalonList = () => {

    const [search, setSearch] = useState("")
    const [salonList, setSalonList] = useState([])
    const [loading, setLoading] = useState(false)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)
    const currentAdminEmail = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].email

    console.log(salonList)

    useEffect(() => {
        //Admin emailer value loggin korar por theke asbe akhon static ache
        const fetchSalons = async () => {
            try {
                // arghyahimanstech@gmail.com 
                const { data } = await api.get(`https://iqb-backend2.onrender.com/api/salon/getAllSalonsByAdminEmail?adminEmail=${currentAdminEmail} `)
                setSalonList(data)
                setLoading(false)
            } catch (error) {
                if (error?.response?.data?.message == "Refresh Token not present.Please Login Again") {
                    localStorage.setItem("userLoggedIn", "false")
                    navigate("/admin-signin")
                }
            }
        }

        fetchSalons()

    }, [currentAdminEmail])

    // console.log(salonList)

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
    return (
        <>

            <AdminLayout />
            <div className="wrapper">
                <div className="header">
                    <p>Salons List</p>

                    <div>
                        <div onClick={addSalonNavigate}>
                            <GrAdd />
                        </div>
                    </div>
                </div>

                {/* Table  */}
                <div className='table'>
                    {
                        loading ? <div className='salon-puff-loader-box'><PuffLoader /></div> : salonList && salonList.response ? salonList.response.map((salon, index) => (
                            <div key={index} className='salon-item'>
                                <div>
                                    <p>Salon ID</p>
                                    <p>{salon.salonId}</p>
                                </div>

                                <div>
                                    <p>Salon Code</p>
                                    <p>{salon.salonCode}</p>
                                </div>

                                <div>
                                    <p>Salon Name</p>
                                    <p>{salon.salonName}</p>
                                </div>

                                <div>
                                    <p>Admin Email</p>
                                    <p>{salon.adminEmail}</p>
                                </div>

                                <div>
                                    <p>Address</p>
                                    <p>{salon.address}</p>
                                </div>

                                <div>
                                    <p>City</p>
                                    <p>{salon.city}</p>
                                </div>

                                <button onClick={() => changeRoute(salon.salonId)}>
                                    <AiFillEdit />
                                </button>

                                <button className='del-bbr' onClick={() => deleteSalonHandler(salon.salonId)}><MdDelete /></button>

                                <Link to="#">
                                    <Link to="/salon/salonsettings"
                                    style={{
                                        display:"flex",justifyContent:"center",alignItems:"center"
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