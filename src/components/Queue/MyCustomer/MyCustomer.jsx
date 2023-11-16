import React, { useEffect } from 'react'
import "./MyCustomer.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { queueListAction } from '../../../redux/actions/joinQueueAction'
import { barberServedQueueAction } from '../../../redux/actions/barberAction'
import { PiQueueBold } from 'react-icons/pi'

const MyCustomer = () => {

    const signin = useSelector(state => state.signin)
    const { user } = signin

    const dispatch = useDispatch()

    const salonid = 3

    useEffect(() => {
        dispatch(queueListAction(salonid))
    }, [dispatch])

    const queueList = useSelector(state => state.queueList)

    const barberId = 2;

    const mycustomers = queueList?.response?.filter((f) => f.barberId === barberId)

    // console.log("filterdsjkvknjsldvds",mycustomers)


    const serverHandler = (barberId,serviceId,customerid) => {

        const infodata = {
            barberId,
            serviceId,
            _id:customerid,
            salonId:salonid
        }

        dispatch(barberServedQueueAction(infodata))
    } 
  return (
    <>
            {
                user?.isAdmin ? (<>
                    <AdminLayout />
                    <div className='queue-wrapper'>
                        
                        <div className='queue-list-table'>
                            <p>Queue List</p>

                            <div className='que-lst-head'>
                                <p>User Name</p>
                                <p>Name</p>
                                <p>JoinedQ</p>
                                <p>JoinedQType</p>
                                <p>TimeJoinedQ</p>
                                <p>Barber Name</p>
                                <p>Q Position</p>
                                <p>Served</p>
                            </div>

                            {
                                mycustomers?.map((c) => (
                                    <div className='que-lst-content' key={c._id}>
                                        <p>{c.userName}</p>
                                        <p>{c.name}</p>
                                        <p>{c.joinedQ == true ? "True" : "False"}</p>
                                        <p>{c.joinedQType}</p>
                                        <p>{c.timeJoinedQ}</p>
                                        <p>{c.barberName}</p>
                                        <p>{c.qPosition}</p>
                                        <div className='que-serve' onClick={() => serverHandler(c.barberId,c.serviceId,c._id)}>
                                        <PiQueueBold />
                                        </div>
                                    </div>
                                ))
                            }
                    
                        </div>
                    </div>
                </>) : (<h1>Only Admins can access this page</h1>)
            }
        </>
  )
}

export default MyCustomer
