import React, { useEffect } from 'react'
import "./QueueselectServices.css"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'
import { useNavigate } from 'react-router-dom'

const QueueselectServices = () => {

    const signin = useSelector(state => state.signin)
    const { user } = signin

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSalonServicesAction(1))
    }, [dispatch])

    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    const navigate = useNavigate()

    const routechangeHandler = (serviceId) => {
        navigate(`/queue/selectservicebarber/${serviceId}`)
    }

    return (
        <>
            {
                user?.isAdmin ? (<>
                    <AdminLayout />
                    <div className="queselect-wrapper">
                        <p>Select Service</p>

                        <div className='queselect-head'>
                            <p>Service ID</p>
                            <p>Service Name</p>
                            <p>Service Desc</p>
                            <p>Service Price</p>
                            <p>Service EWT</p>
                            <p></p>
                        </div>

                        {
                            getAllSalonServices?.response?.map((s) => (
                                <div className='queselect-content' key={s._id} onClick={() => routechangeHandler(s.serviceId)}>
                                    <p>{s.serviceId}</p>
                                    <p>{s.serviceName}</p>
                                    <p>{s.serviceDesc}</p>
                                    <p>{s.servicePrice}</p>
                                    <p>{s.serviceEWT}</p>
                                </div>
                            ))
                        }

                    </div>
                </>) : (<h1>Only Admins can access this page</h1>)
            }
        </>
    )
}

export default QueueselectServices