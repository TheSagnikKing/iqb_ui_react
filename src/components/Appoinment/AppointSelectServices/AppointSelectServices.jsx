// import React from 'react'

// const AppointSelectServices = () => {
//   return (
//     <div>AppointSelectServices</div>
//   )
// }

// export default AppointSelectServices

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'
import { useNavigate } from 'react-router-dom'

const AppointSelectServices = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSalonServicesAction(1))
    }, [dispatch])

    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    const navigate = useNavigate()

    const routechangeHandler = (serviceId) => {
        navigate(`/appointment/selectservicebarber/${serviceId}`)
    }

    return (
        <>
         
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
                
        </>
    )
}

export default AppointSelectServices