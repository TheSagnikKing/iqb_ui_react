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
import { barberAllSalonServicsAction, barberOnlineStatusAction } from '../../../redux/actions/barberAction'

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
                const { data } = await api.get("/api/barber/getAllSalons")
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
            dispatch(barberAllSalonServicsAction(salonid))
        }
    }


    const barberAllSalonServics = useSelector(state => state.barberAllSalonServics)


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

    console.log("se", selectedService)

    const connectSalonHandler = () => {
        // connectSalonBarberAction

        if (currentSelectSalonId && selectedService.length > 0) {
            const barberSalonData = {
                email: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
                salonId: currentSelectSalonId,
                barberServices: selectedService
            }

            console.log(barberSalonData)

            dispatch(connectSalonBarberAction(barberSalonData))
        } else {
            alert("Please Select Salon and Services")
        }

    }


    const MemoizedChart = useMemo(() => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Chart />
            </Suspense>
        );
    }, []);

    const [check, setCheck] = useState(false)

    useEffect(() => {
        setCheck(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].isOnline)
    }, [LoggedInMiddleware?.user])

    const setOnlineHandler = () => {
        const newCheckValue = !check;
        setCheck(newCheckValue);

        const barberOnlineData = {
            barberId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].barberId,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId,
            isOnline: newCheckValue,
        };

        dispatch(barberOnlineStatusAction(barberOnlineData));
    };

    const connectBarberSalon = useSelector(state => state.connectBarberSalon)

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    const currentmode = darkMode === "On"

    return (
        <div className="right_main_div" style={{
            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)",
            height: "140.23vh"
        }}>
            {salonid == 0 ? <div className='connectSalon'>
                <h1 style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Connect Salon Barber Please</h1>
                <div style={{ background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)" }}>
                    <div>
                        <h3 style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }} >List of Salons</h3>
                        <div style={{
                            overflowX: "scroll",
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)"
                        }}>
                            {
                                connectedSalonData && connectedSalonData?.response && connectedSalonData?.response.length > 0 ? (connectedSalonData?.response?.map((s) => (
                                    <div className='barber-salonlist-cnt'
                                    style={{background:currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"}}
                                    >
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>SalonId {s.salonId}</p>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{s.salonName}</p>
                                        <button onClick={() => selectSalonServices(s.salonId)} style={{
                                            border: "1px solid blue",
                                            background: "#fff",
                                            width: "10rem",
                                            color: "blue",
                                            boxShadow: "0px 0px 4px blue",
                                            cursor: "pointer"
                                        }}>+</button>
                                    </div>
                                ))) : (<p>No Salon Data</p>)
                            }

                        </div>
                    </div>

                    <div>
                        <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>List of Services</h3>
                        <div style={{
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)"
                        }}>
                            {
                                barberAllSalonServics ? barberAllSalonServics?.response?.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id} style={{
                                        fontSize: "1.2rem",
                                        background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)",
                                        gridTemplateColumns: "repeat(6, 1fr)"
                                    }}>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{b.serviceId}</p>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{b.serviceName}</p>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{b.vipService ? "Vip" : "Regular"}</p>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{b.serviceCode}</p>
                                        <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>{b.serviceEWT}</p>
                                        <button onClick={() => selectedServiceHandler(b, index)} style={{
                                            color: "limegreen",
                                            border: "1px solid limegreen",
                                            background: "#fff",
                                            boxShadow: "0px 0px 4px limegreen",
                                            width: "10rem",
                                            cursor: "pointer"
                                        }}>+</button>
                                    </div>
                                )) : <p>No Services Present</p>
                            }
                        </div>
                    </div>

                    <div>
                        <h3 style={{color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Barber Selected Services</h3>
                        <div  style={{
                            background: currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)"
                        }}>
                            {
                                selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                    <div className='barber-single-join-quebarberserv-content' key={b._id} style={{ fontSize: "1.2rem",
                                    background: currentmode ? "var(--dark-secondary-color)" : "var(--light-secondary-color)",
                                    gridTemplateColumns: "repeat(6,1fr)"
                                    }}>
                                        <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{b.serviceId}</p>
                                        <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{b.serviceName}</p>
                                        <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{b.vipService ? "Vip" : "Regular"}</p>
                                        <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{b.serviceCode}</p>
                                        <p style={{color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>{b.serviceEWT}</p>
                                        <button onClick={() => selectedServiceDelete(b)} style={{
                                            color: "red",
                                            border: "1px solid red",
                                            background: "#fff",
                                            boxShadow: "0px 0px 4px red",
                                            width: "10rem",
                                            cursor: "pointer"
                                        }}>-</button>
                                    </div>
                                )) : <p>No Services Available</p>
                            }
                        </div>
                    </div>

                    {
                        connectBarberSalon?.loading == true ? <button style={{ fontWeight: "500" }}>Loading</button> : <button onClick={connectSalonHandler}
                        style={{
                            background:currentmode ? "var(--dark-primary-color)" : "var(--light-primary-color)",
                            color:currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                        }}
                        >Connect Salon</button>
                    }

                </div>

                {/* <Link to="/salon/createsalon">Create Salon</Link> */}
            </div > : <>
                <div className={`right_div_top`}>

                    <div className={`div_left ${currentmode && 'div_left_dark'}`}>
                        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "1.5rem" }}>
                            <h3 style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Offline</h3>
                            <label className="nav2toggle_switch" >
                                <input type="checkbox"
                                    value={check}
                                    onClick={() => setOnlineHandler()}

                                />
                                <span className="nav2slider"></span>
                                <span className={`nav2slider ${check ? 'checked' : ''}`}
                                    style={{
                                        background: check ? "#4CBB17" : ""
                                    }}
                                ></span>
                            </label>
                            <h3 style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Online</h3>
                        </div>

                        <div className="div_left_head">
                            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                                <h2>Advertisement</h2>
                            </div>

                            <div className="btn_box">
                                {/* <div className="btn_one">
                                        <div>
                                            <IoMdAdd />
                                        </div>

                                        <p>Add New Post</p>
                                    </div> */}

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

                    <div className={`div_right ${currentmode && 'div_right_dark'}`}>
                        <div className={`div_right_head ${currentmode && 'div_right_head_dark'}`}>
                            <p>Queue List</p>

                            <div className={`btn_box ${currentmode && 'btn_box_dark'}`}>

                                <div className={`btn_one ${currentmode && 'btn_one_dark'}`}>
                                    <div>
                                        <IoMdAdd />
                                    </div>

                                    <p
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                                    >Add Customers</p>
                                </div>


                                <div className={`btn_one ${currentmode && 'btn_one_dark'}`}>
                                    <div>
                                        <FaUsers />
                                    </div>

                                    <p
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                                    >Join Queue</p>
                                </div>

                                <div className="last_item">
                                    <BsThreeDotsVertical style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }} />
                                </div>

                            </div>
                        </div>

                        <div className={`div_right_middle ${currentmode && 'div_right_middle_dark'}`}>

                            <div className={`content ${currentmode && 'content_dark'}`}>
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

                            <div className={`content ${currentmode && 'content_dark'}`}>
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

                        <div className={`div_right_third ${currentmode && 'div_right_third_dark'}`}>
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

                        <div className={`div_right_fourth ${currentmode && 'div_right_fourth_dark'}`}>

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
                                <div style={{ color: "var(--dark-secondary-color)", fontWeight: "500" }}>
                                    In Progress
                                </div>

                                <div>
                                    <FaUserCircle
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }} />
                                </div>

                                <div>
                                    <FiMoreHorizontal
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                                    />
                                </div>
                            </div>


                        </div>

                        <div className={`div_right_fifth ${currentmode && 'div_right_fifth_dark'}`}>

                            <div>
                                <div className="checkbox"
                                    style={{ backgroundColor: checkbox2 ? "#2164f3" : "", border: checkbox2 ? "none" : "1px solid rgba(0,0,0,0.4)" }}
                                    onClick={() => setCheckbox2(!checkbox2)}
                                >
                                    <BsCheckLg />
                                </div>

                                <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Priti Roy</p>
                            </div>

                            <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>JLDF13598</p>

                            <div>
                                <div style={{ color: "var(--dark-secondary-color)", fontWeight: "500" }}>
                                    Pending
                                </div>

                                <div>
                                    <FaUserCircle
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                                    />
                                </div>

                                <div>
                                    <FiMoreHorizontal
                                        style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className={`right_div_end ${currentmode && 'right_div_end_dark'}`}>

                    <div className={`right_div_end_left ${currentmode && 'right_div_end_left_dark'}`}>
                        <div className={`right_div_end_head ${currentmode && 'right_div_end_head_dark'}`}>
                            <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Calender</p>

                            <div className={`btn_box ${currentmode && 'btn_box_dark'}`}>
                                <button>Appoinments</button>
                                <button>Reservation</button>
                            </div>
                        </div>


                        <div className="right_div_end_main">
                            <div className="main_left">
                                <Calender value={currentDate} setCurrentDate={setCurrentDate} />
                            </div>

                            <div className={`main_right ${currentmode && 'main_right_dark'}`}>
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

                    <div className={`right_div_end_right ${currentmode && 'right_div_end_right_dark'}`}>
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

                        <div className={`chart ${currentmode && 'chart_dark'}`}>
                            <div>
                                <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>Completion Rate</p>

                                <div>
                                    <p style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}>95%</p>
                                    <p>+2.5%</p>
                                </div>
                            </div>

                            <div>{MemoizedChart}</div>
                        </div>
                    </div>
                </div>
            </>}

        </div>
    )
}

export default BarberDashboardComp