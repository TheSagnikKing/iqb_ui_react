import React, { useEffect, useState } from 'react'
import "./Queue.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { queueListAction } from '../../redux/actions/joinQueueAction'

const Queue = () => {

    const signin = useSelector(state => state.signin)
    const { user } = signin

    const [singledrop, setSingleDrop] = useState(false)

    console.log(singledrop)

    const salonid = 1

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(queueListAction(salonid))
    }, [dispatch])

    const queueList = useSelector(state => state.queueList)

    return (
        <>
            {
                user?.isAdmin ? (<>
                    <AdminLayout />
                    <div className='queue-wrapper'>
                        <p>Select Your Joins</p>

                        <div className='joins'>
                            <div><p>Group Join</p></div>
                            <div>
                                <p onClick={() => setSingleDrop((prev) => !prev)}>Single Join</p>

                                {
                                    singledrop && <div className='joins-dropdown'>
                                        <Link to="/queue/barberlist">Select Barber</Link>
                                        <Link to="/queue/selectservices">Select Services</Link>
                                    </div>
                                }

                            </div>
                            <div><p><Link to="/queue/autoqueservices">Auto Join</Link></p></div>
                        </div>

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
                            </div>

                            {
                                queueList?.response?.map((c) => (
                                    <div className='que-lst-content' key={c._id}>
                                        <p>{c.userName}</p>
                                        <p>{c.name}</p>
                                        <p>{c.joinedQ == true ? "True" : "False"}</p>
                                        <p>{c.joinedQType}</p>
                                        <p>{c.timeJoinedQ}</p>
                                        <p>{c.barberName}</p>
                                        <p>{c.qPosition}</p>
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

export default Queue