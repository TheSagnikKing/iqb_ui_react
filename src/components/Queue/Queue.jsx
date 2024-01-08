import React, { useEffect, useState } from 'react'
import "./Queue.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { queueListAction } from '../../redux/actions/joinQueueAction'

import { PiQueueBold } from "react-icons/pi";
import { barberServedQueAction, barberServedQueueAction } from '../../redux/actions/barberAction'

const Queue = () => {

    const [singledrop, setSingleDrop] = useState(false)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const salonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId;

    const dispatch = useDispatch()

    useEffect(() => {
        if(salonId){
            dispatch(queueListAction(Number(salonId)))
        }   
    }, [dispatch,salonId])

    const queueList = useSelector(state => state.queueList)

    const serverHandler = (barberId, serviceId, customerid) => {

        const infodata = {
            barberId,
            serviceId,
            _id: customerid,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId
        }

        console.log("cust",infodata)

        const confirm = window.confirm("Are you sure ?")

        if(confirm){
            dispatch(barberServedQueAction(infodata))
        }

    }

    return (
        <>
            <AdminLayout />
            <div className='queue-wrapper'>
                <p>Select Your Joins</p>

                <div className='joins'>
                    <Link to="/queue/group/customers"
                    style={{
                        background:"#fff",
                        padding:"10px 12px",
                        borderRadius:"10px",
                        boxShadow:"0px 0px 2px rgba(0,0,0,0.4)"
                    }}
                    >Group Join</Link>

                    {/* <div>
                        <p onClick={() => setSingleDrop((prev) => !prev)}>Single Join</p>

                        {
                            singledrop && <div className='joins-dropdown'>
                                <Link to="/queue/barberlist">Select Barber</Link>
                                <Link to="/queue/selectservices">Select Services</Link>
                            </div>
                        }

                    </div> */}
                    <div><p><Link to="/queue/barberlist">Select Barber</Link></p></div>

                    <div><p><Link to="/queue/autoqueservices">Auto Join</Link></p></div>

                    {/* <div><p style={{ marginLeft: "10px" }}><Link to="/queue/mycustomer">My Customers</Link></p></div> */}
                </div>

                <div className='queue-list-table'>
                    <p>Queue List</p>

                    <div className='que-lst-head'>
                        <p>Name</p>
                        {/* <p>JoinedQ</p> */}
                        {/* <p>JoinedQType</p> */}
                        <p>TimeJoinedQ</p>
                        <p>Barber Name</p>
                        <p>Q Position</p>
                        <p>Served</p>
                    </div>

                    {
                        queueList?.response?.map((c) => (
                            <div className='que-lst-content' key={c._id}>
                                <p>{c.name}</p>
                                {/* <p>{c.joinedQ == true ? "True" : "False"}</p> */}
                                {/* <p>{c.joinedQType}</p> */}
                                <p>{c.timeJoinedQ}</p>
                                <p>{c.barberName}</p>
                                <p>{c.qPosition}</p>
                                <div className='que-serve' onClick={() => serverHandler(c.barberId, c.serviceId, c._id)}>
                                    <PiQueueBold />
                                </div>
                            </div>
                        ))
                    }


                </div>
            </div>

        </>
    )
}

export default Queue