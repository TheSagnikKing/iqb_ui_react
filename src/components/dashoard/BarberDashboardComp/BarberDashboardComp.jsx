import React, { useEffect, useState, Suspense, useMemo } from 'react'
import "./BarberDashboardComp.css"
import { IoMdAdd } from 'react-icons/io'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { BsCheckLg, BsThreeDotsVertical } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiChevronRight } from 'react-icons/bi'
import CustomerDetail from '../../customerDetail/CustomerDetail'
const Chart = React.lazy(() => import("../../chart/Chart"))
import { customerDetail } from '../../data'
import { reports } from '../../data'

import Calender from '../../calender/Calender'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { connectSalonBarberAction, getAllSalonServicesAction } from '../../../redux/actions/salonAction'

import api from "../../../redux/api/Api"
import { barberOnlineStatusAction } from '../../../redux/actions/barberAction'

const BarberDashboardComp = () => {

    const [checkbox, setCheckbox] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)

    const [currentDate, setCurrentDate] = useState(new Date())

    const [loader, setLoader] = useState(true)

    const checkboxhandler = () => {
        setCheckbox(!checkbox)
    }

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonid = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId;



    //List of Salons when barber is not connected

    const [connectedSalonData, setConnectedSalonData] = useState([])

    useEffect(() => {
        if (salonid == 0) {
            const connectsalonfnc = async () => {
                const { data } = await api.get("/api/salon/getAllSalons")
                setConnectedSalonData(data)
            }

            connectsalonfnc()
        }
    }, [salonid])

    console.log(connectedSalonData)

    const dispatch = useDispatch()

    const [currentSelectSalonId, setcurrentSelectSalonId] = useState(null)

    const selectSalonServices = (salonid) => {
        const confirm = window.confirm("Are you sure ?")
        setcurrentSelectSalonId(salonid)
        if (confirm) {
            dispatch(getAllSalonServicesAction(salonid))
        }
    }


    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    console.log(getAllSalonServices)


    const [selectedService, setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    console.log(selectedService)

    const connectSalonHandler = () => {
        // connectSalonBarberAction

        const barberSalonData = {
            email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
            salonId: currentSelectSalonId,
            barberServices: selectedService
        }

        console.log(barberSalonData)

        dispatch(connectSalonBarberAction(barberSalonData))
    }


    const MemoizedChart = useMemo(() => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Chart />
            </Suspense>
        );
    }, []);

    const [check, setCheck] = useState(false)


    const barberOnlinedataTrue = {
        barberId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].barberId,
        salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
        isOnline: true
    }

    const barberOnlinedataFalse = {
        barberId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].barberId,
        salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
        isOnline: false
    }

    // useEffect(() => {
    //     if (check) {
    //         dispatch(barberOnlineStatusAction(barberOnlinedataTrue))
    //     } else {
    //         dispatch(barberOnlineStatusAction(barberOnlinedataFalse))
    //     }
    // }, [check])

    const setOnlineHandler = () => {
        const newCheckValue = !check;
        setCheck(newCheckValue);
        // localStorage.setItem('barberOnline',newCheckValue)
    
        const barberOnlineData = {
            barberId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].barberId,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            isOnline: newCheckValue,
        };
    
        dispatch(barberOnlineStatusAction(barberOnlineData));
    };
    

    return (
        <>
            <div className="right_main_div">
                {salonid == 0 ? <div className='connectSalon'>
                    <h2>Connect Salon Barber Please</h2>
                    <div>
                        <div>
                            <label htmlFor="">List of Salons</label>
                            <div>
                                {
                                    connectedSalonData && connectedSalonData?.response && connectedSalonData?.response.length > 0 ? (connectedSalonData?.response?.map((s) => (
                                        <div className='barber-salonlist-cnt'>
                                            <p>SalonId {s.salonId}</p>
                                            <p>{s.salonName}</p>
                                            <button onClick={() => selectSalonServices(s.salonId)}>Select Salon</button>
                                        </div>
                                    ))) : (<p>No Salon Data</p>)
                                }

                            </div>
                        </div>

                        <div>
                            <label htmlFor="">List of Services</label>
                            <div>
                                {
                                    getAllSalonServices ? getAllSalonServices?.response?.map((b, index) => (
                                        <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                            <p>{b.serviceId}</p>
                                            <p>{b.serviceName}</p>
                                            <p>{b.serviceCode}</p>
                                            <p>{b.serviceEWT}</p>
                                            <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                                        </div>
                                    )) : <p>No Services Present</p>
                                }
                            </div>
                        </div>

                        <div>
                            <label htmlFor="">Barber Selected Services</label>
                            <div>
                                {
                                    selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                        <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                            <p>{b.serviceId}</p>
                                            <p>{b.serviceName}</p>
                                            <p>{b.serviceCode}</p>
                                            <p>{b.serviceEWT}</p>
                                            <button onClick={() => selectedServiceDelete(b)}>Del</button>
                                        </div>
                                    )) : <p>No Services Available</p>
                                }
                            </div>
                        </div>

                        <button onClick={connectSalonHandler}>Connect Salon</button>
                    </div>

                    {/* <Link to="/salon/createsalon">Create Salon</Link> */}
                </div > : <>
                    <div className="right_div_top">

                        <div className="div_left">
                            <div className="div_left_head">
                                <div style={{ display: "flex", alignItems: "center", alignItems: "center", gap: "2rem" }}>
                                    <p>Advertisement</p>
                                    {/* TOGGLE SWITCH */}
                                    <label className="nav1toggle_switch" >
                                        <input type="checkbox"
                                            value={check}
                                            onClick={() => setOnlineHandler()}
                                        />
                                        <span className="nav2slider"
                                    //     style={{ backgroundColor: localStorage.getItem('barberOnline') == "true" ? 'green' : 'gray',
                                    // }}
                                        ></span>
                                    </label>
                                </div>


                                <div className="btn_box">
                                    <div className="btn_one">
                                        <div>
                                            <IoMdAdd />
                                        </div>

                                        <p>Add New Post</p>
                                    </div>

                                    {/* <div className="btn_two">
                                    <div>
                                        <IoNotificationsOutline />
                                    </div>

                                    <p>Notifications</p>
                                </div> */}
                                </div>
                            </div>

                            <div className="div_left_images">
                                <div className="img_one">
                                    <img src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?cs=srgb&dl=pexels-dmitry-zvolskiy-1805600.jpg&fm=jpg" alt="" />
                                </div>

                                <div className="img_two">

                                    <div>
                                        <img src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?cs=srgb&dl=pexels-dmitry-zvolskiy-1805600.jpg&fm=jpg" alt="" />
                                    </div>

                                    <div>
                                        <img src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?cs=srgb&dl=pexels-dmitry-zvolskiy-1805600.jpg&fm=jpg" alt="" />
                                    </div>

                                </div>

                                <div className="img_three">
                                    <img src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?cs=srgb&dl=pexels-dmitry-zvolskiy-1805600.jpg&fm=jpg" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="div_right">
                            <div className="div_right_head">
                                <p>Queue List</p>

                                <div className="btn_box">

                                    <div className="btn_one">
                                        <div>
                                            <IoMdAdd />
                                        </div>

                                        <p>Add Customers</p>
                                    </div>


                                    <div className="btn_one">
                                        <div>
                                            <FaUsers />
                                        </div>

                                        <p>Join Queue</p>
                                    </div>

                                    <div className="last_item">
                                        <BsThreeDotsVertical />
                                    </div>

                                </div>
                            </div>

                            <div className="div_right_middle">

                                <div className="content">
                                    <div>
                                        <p>Kunal Jasuja</p>
                                        <p>Contact No-9876543210</p>
                                    </div>

                                    <div>
                                        <FiMoreHorizontal />
                                    </div>

                                    <div className="content_info">
                                        <p>Progress</p>
                                        <p>55%</p>
                                    </div>

                                    <div className="progress_bar">
                                        <div>

                                        </div>
                                    </div>
                                </div>

                                <div className="content">
                                    <div>
                                        <p>Roy Kapoor</p>
                                        <p>Contact No-9876543210</p>
                                    </div>

                                    <div>
                                        <FiMoreHorizontal />
                                    </div>

                                    <div className="content_info">
                                        <p>Progress</p>
                                        <p>55%</p>
                                    </div>

                                    <div className="progress_bar_two">
                                        <div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="div_right_third">
                                <div>
                                    <p>Join Queue</p>
                                    <span>{"(10)"}</span>
                                </div>

                                <div>
                                    <p>See All</p>
                                    <div>
                                        <BiChevronRight />
                                    </div>
                                </div>

                            </div>

                            <div className="div_right_fourth">

                                <div>
                                    <div className="checkbox"
                                        style={{ backgroundColor: checkbox ? "#2164f3" : "", border: checkbox ? "none" : "1px solid rgba(0,0,0,0.4)" }}
                                        onClick={checkboxhandler}
                                    >
                                        <BsCheckLg />
                                    </div>

                                    <p>Riya Roy</p>
                                </div>

                                <p>JLDF13463</p>

                                <div>
                                    <div>
                                        In Progress
                                    </div>

                                    <div>
                                        <FaUserCircle />
                                    </div>

                                    <div>
                                        <FiMoreHorizontal />
                                    </div>
                                </div>


                            </div>

                            <div className="div_right_fifth">

                                <div>
                                    <div className="checkbox"
                                        style={{ backgroundColor: checkbox2 ? "#2164f3" : "", border: checkbox2 ? "none" : "1px solid rgba(0,0,0,0.4)" }}
                                        onClick={() => setCheckbox2(!checkbox2)}
                                    >
                                        <BsCheckLg />
                                    </div>

                                    <p>Priti Roy</p>
                                </div>

                                <p>JLDF13598</p>

                                <div>
                                    <div>
                                        Pending
                                    </div>

                                    <div>
                                        <FaUserCircle />
                                    </div>

                                    <div>
                                        <FiMoreHorizontal />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="right_div_end">

                        <div className="right_div_end_left">
                            <div className="right_div_end_head">
                                <p>Calender</p>

                                <div className="btn_box">
                                    <button>Appoinments</button>
                                    <button>Reservation</button>
                                </div>
                            </div>


                            <div className="right_div_end_main">
                                <div className="main_left">
                                    <Calender value={currentDate} setCurrentDate={setCurrentDate} />
                                </div>

                                <div className="main_right">
                                    {
                                        customerDetail.map((item) => {
                                            return (
                                                <div key={item.id}>
                                                    <CustomerDetail item={item} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="right_div_end_right">
                            <div className="head">
                                <p>Reports</p>
                                <div>
                                    <FiMoreHorizontal />
                                </div>
                            </div>

                            <div className="reports">

                                {
                                    reports.map((item) => {
                                        return (
                                            <div className="report_item" key={item.id}
                                                style={{ backgroundColor: item.backgroundColor }}
                                            >

                                                <div className="content">
                                                    <div>
                                                        {item.icon}
                                                    </div>
                                                    <p>{item.para}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="chart">
                                <div>
                                    <p>Completion Rate</p>

                                    <div>
                                        <p>95%</p>
                                        <p>+2.5%</p>
                                    </div>
                                </div>

                                <div>{MemoizedChart}</div>
                            </div>
                        </div>
                    </div>
                </>}

            </div>

        </>
    )
}

export default BarberDashboardComp