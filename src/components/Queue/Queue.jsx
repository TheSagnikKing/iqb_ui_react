import React, { useEffect, useState } from 'react'
import "./Queue.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cancelQueueAtion, queueListAction } from '../../redux/actions/joinQueueAction'
import { GiCancel } from "react-icons/gi";
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

    const cancelHandler = (barberId, _id) => {
        const canceldata = {
            salonId,
            barberId,
            _id
        }

        const confirm = window.confirm("Are you sure ?")

        if(confirm){
            dispatch(cancelQueueAtion(canceldata))
        }
    }

    return (
        <>
            <AdminLayout />
            <div className='queue-wrapper'>
                <h1>Select Your Joins</h1>

                <div className='joins'>
                    <Link to="/queue/group/customers"
                    style={{
                        background:"#fff",
                        padding:"1rem 1rem",
                        borderRadius:"3px",
                        boxShadow:"0px 0px 2px rgba(0,0,0,0.4)",
                        fontSize:"1.4rem"
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
                    <div><p><Link to="/queue/barberlist/kyosks">Select Barber</Link></p></div>

                    <div><p><Link to="/queue/autoqueservices">Auto Join</Link></p></div>

                    {/* <div><p style={{ marginLeft: "10px" }}><Link to="/queue/mycustomer">My Customers</Link></p></div> */}
                </div>

                <div className='queue-list-table'>
                    <h3>Queue List</h3>

                    <div className='que-lst-head'>
                        <h4>Name</h4>
                        {/* <p>JoinedQ</p> */}
                        {/* <p>JoinedQType</p> */}
                        <h4>TimeJoinedQ</h4>
                        <h4>Barber Name</h4>
                        <h4>Q Position</h4>
                        <h4>Served</h4>
                        <h4>Cancel</h4>
                    </div>

                    {
                        queueList?.response?.map((c) => (
                            <div className='que-lst-content' key={c._id}>
                                <p>{c.name}</p>
                                <p>{c.timeJoinedQ}</p>
                                <p>{c.barberName}</p>
                                <p>{c.qPosition}</p>
                                <div className='que-serve' onClick={() => serverHandler(c.barberId, c.serviceId, c._id)}>
                                    <PiQueueBold />
                                </div>
                                <div className='que-cancel' onClick={() => cancelHandler(c.barberId,  c._id)}>
                                    <GiCancel/>
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