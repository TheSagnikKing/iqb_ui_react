import React, { useEffect, useState, Suspense, useMemo } from 'react'
import './dashboard.css'
import { IoMdAdd } from 'react-icons/io'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FaUserCircle, FaUsers } from 'react-icons/fa'
import { BsCheckLg, BsThreeDotsVertical } from 'react-icons/bs'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiChevronRight } from 'react-icons/bi'
import CustomerDetail from '../customerDetail/CustomerDetail'
const Chart = React.lazy(() => import("../chart/Chart"))
import { customerDetail } from '../data'
import { reports } from '../data'

import Calender from '../calender/Calender'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { queueListAction } from '../../redux/actions/joinQueueAction'

import api from "../../redux/api/Api"

const dashboard = () => {

    const [checkbox, setCheckbox] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)

    const [currentDate, setCurrentDate] = useState(new Date())

    const [loader, setLoader] = useState(true)

    const checkboxhandler = () => {
        setCheckbox(!checkbox)
    }

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonid = Number(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId);

    const MemoizedChart = useMemo(() => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Chart />
            </Suspense>
        );
    }, []);

    const dispatch = useDispatch()

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    useEffect(() => {
        if (salonId) {
            dispatch(queueListAction(Number(salonId)))
        }
    }, [dispatch, salonId])

    const queueList = useSelector(state => state.queueList)

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString(undefined, options);

        // Extract components and rearrange them
        const [month, day, year] = formattedDate.split('/');
        return `${year}-${month}-${day}`;
    };

    const formattedDate = formatDate(currentDate);
    console.log(formattedDate);

    const [appointmentData, setAppointmentData] = useState([])

    useEffect(() => {
        const appointfnc = async () => {
            const { data } = await api.post("/api/advertisement/getDashboardAppointmentList", {
                salonId,
                appointmentDate: formattedDate
            })

            setAppointmentData(data)
        }

        appointfnc()
    }, [salonId, formattedDate])

    console.log(appointmentData)


    const [advertisementList, setAdvertisementList] = useState([])

    useEffect(() => {
      const getAdvertisementData = async () => {
        const { data } = await api.post(`/api/advertisement/getAdvertisements`, { salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId });
  
        console.log("adver", data)
        setAdvertisementList(data?.advertisements)
      }
  
      getAdvertisementData()
    }, [LoggedInMiddleware?.user])

    console.log("dash",advertisementList)

    return (
        <>
            <div className="right_main_div">
                {salonid == 0 ? <div className='nosalon'>
                    <h2>No Salons. Please Create a Salon First</h2>
                    <Link to="/salon/createsalon">Create Salon</Link>
                </div > : <>
                    <div className="right_div_top">

                        <div className="div_left">
                            <div className="div_left_head">
                                <p>Advertisement</p>
                                <div className="btn_box">
                                    <div className="btn_one">
                                        <div>
                                            <IoMdAdd />
                                        </div>

                                        <p><Link to="/advertisement">Add New Post</Link></p>
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
                                    <img src={advertisementList[0]?.url} alt="" />
                                </div>

                                <div className="img_two">

                                    <div>
                                        <img src={advertisementList[1]?.url} alt="" />
                                    </div>

                                    <div>
                                        <img src={advertisementList[2]?.url} alt="" />
                                    </div>

                                </div>

                                <div className="img_three">
                                    <img src={advertisementList[3]?.url} alt=""/>
                                </div>
                            </div>
                        </div>

                        <div className="div_right">
                            <div className="div_right_head">
                                <p>Queue List</p>

                                <div className="btn_box">

                                    <div className="btn_one">
                                        {/* <div>
                                            <IoMdAdd />
                                        </div> */}

                                        <p><Link to="/queue"
                                            style={{
                                                fontSize: "11px"
                                            }}
                                        >Add Customers</Link></p>
                                    </div>


                                    {/* <div className="btn_one">
                                        <div>
                                            <FaUsers />
                                        </div>

                                        <p>Join Queue</p>
                                    </div> */}

                                    {/* <div className="last_item">
                                        <BsThreeDotsVertical />
                                    </div> */}

                                </div>
                            </div>

                            <div className="div_right_third">

                                <div>
                                    <p style={{
                                        marginTop: "10px"
                                    }}><Link to="/queue" style={{
                                        fontSize: "11px"
                                    }}>See All</Link></p>
                                    <div>
                                        <BiChevronRight />
                                    </div>
                                </div>

                            </div>


                            <div className='dashboard-quelist'

                                style={{
                                    overflow: "scroll",
                                    height: "350px"
                                }}>
                                <div className='dashboard-quelist-content-head'>
                                    <p>Customer Name</p>
                                    <p>Barber Name</p>
                                    <p>Queue Position</p>
                                </div>

                                {
                                    queueList?.response?.slice(0, 5).map((c, i) => (
                                        <div className='dashboard-quelist-content' key={i}>
                                            <p>{c.name}</p>
                                            <p>{c.barberName}</p>
                                            <p>{c.qPosition}</p>
                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    </div>

                    <div className="right_div_end">

                        <div className="right_div_end_left">
                            <div className="right_div_end_head">
                                <p>Calender</p>

                                <div className="btn_box">
                                    <button><Link to="/appoinment">Appoinments</Link></button>
                                    {/* <button>Reservation</button> */}
                                </div>
                            </div>


                            <div className="right_div_end_main">
                                <div className="main_left">
                                    <Calender value={currentDate} setCurrentDate={setCurrentDate} />
                                </div>

                                <div className="main_right">
                                    <div className='appoin-content-head'>
                                        <p>Appointment Name</p>
                                        <p>Customer Name</p>
                                        <p>Barber Name</p>
                                    </div>
                                    {
                                        appointmentData?.response?.map((ap,i) => (
                                            <div className='appoin-content-div' key={i}>
                                                <p>{ap.appointmentName}</p>
                                                <p>{ap.customerName}</p>
                                                <p>{ap.barberName}</p>
                                            </div>
                                        ))
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

export default dashboard