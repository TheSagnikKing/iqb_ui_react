import React, { useEffect } from 'react'
import "./QueueselectBarber.css"
import AdminLayout from '../../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBarbersByServiceIdAction } from '../../../redux/actions/barberAction'
import { useParams } from 'react-router-dom'
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'

const QueueselectBarber = () => {

    const { serviceid } = useParams()
    console.log(serviceid)

    const signin = useSelector(state => state.signin)
    const { user } = signin

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllBarbersByServiceIdAction())
    }, [dispatch])

    const getAllBarbersByServiceId = useSelector(state => state.getAllBarbersByServiceId)

    const joinQueueHandler = (barberid,name) => {
        const queuedata = {
            salonId: 1,
            name: "Manish Singh",
            userName: "manish",
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            barberName: name,
            barberId: Number(barberid),
            serviceId:Number(serviceid)
          }

          dispatch(singleJoinQueueAction(queuedata))
          alert("Joined to the queue successfully")
    }

    return (
        <>
            {
                user?.isAdmin ? (<>
                    <AdminLayout />
                    <div className="queselectbbr-wrapper">
                        <p>Barber available for this service</p>

                        <div className='queselectbbr-head'>
                            <p>Name</p>
                            <p>Email</p>
                            <p>User Name</p>
                            <p>Mobile Number</p>
                            <p>Active</p>
                        </div>

                        {
                            getAllBarbersByServiceId?.response?.map((s) => (
                                <div className='queselectbbr-content' key={s._id}>
                                    <p>{s.name}</p>
                                    <p>{s.email}</p>
                                    <p>{s.userName}</p>
                                    <p>{s.mobileNumber}</p>
                                    <button onClick={() => joinQueueHandler(s.barberId,s.name)}>Join Queue</button>
                                </div>
                            ))
                        }

                    </div>
                </>) : (<h1>Only Admins can access this page</h1>)
            }
        </>
    )
}

export default QueueselectBarber