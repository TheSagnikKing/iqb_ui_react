import React, { useEffect, useState, Suspense } from 'react'
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
import { useSelector } from 'react-redux'

const dashboard = () => {

    const [checkbox, setCheckbox] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)

    const [currentDate, setCurrentDate] = useState(new Date())

    const [loader, setLoader] = useState(true)

    const checkboxhandler = () => {
        setCheckbox(!checkbox)
    }

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonid = LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId;

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

                                <div>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <Chart />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}

            </div>

        </>
    )
}

export default dashboard