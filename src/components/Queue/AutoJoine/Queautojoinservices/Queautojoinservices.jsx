import React, { useEffect } from 'react'
import "./Queautojoinservices.css"
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../../redux/actions/salonAction'
import { autojoinAction } from '../../../../redux/actions/joinQueueAction'

const Queautojoinservices = () => {

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const currentAdminSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

    const dispatch = useDispatch()

    useEffect(() => {
        if (currentAdminSalonId) {
            dispatch(getAllSalonServicesAction(currentAdminSalonId))
        }
    }, [dispatch, currentAdminSalonId])

    const getAllSalonServices = useSelector(state => state.getAllSalonServices)


    const autojoinHandler = (serviceId,serviceName,serviceEWT) => {
        const joindata = {
            userName: "Arghya",
            name: "Arghya Ghosh",
            joinedQType: "Auto-Join",
            methodUsed: "Walk-In",
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            services: [
                {
                    serviceId: serviceId,
                    barberServiceEWT: Number(serviceEWT),
                    serviceName: serviceName
                }
            ],
            isOnline: true
        }

        dispatch(autojoinAction(joindata))
        alert("Auto join successful")

    }

    return (
        <>
            <AdminLayout />
            <div className="queselectauto-wrapper">
                <p>Select Service</p>

                <div className='queselectauto-head'>
                    <p>Service ID</p>
                    <p>Service Name</p>
                    <p>Service Desc</p>
                    <p>Service Price</p>
                    <p>Service EWT</p>
                    <p>Action</p>
                </div>

                {
                    getAllSalonServices?.response?.map((s) => (
                        <div className='queselectauto-content' key={s._id}>
                            <p>{s.serviceId}</p>
                            <p>{s.serviceName}</p>
                            <p>{s.serviceDesc}</p>
                            <p>{s.servicePrice}</p>
                            <p>{s.serviceEWT}</p>
                            <button onClick={() => autojoinHandler(s.serviceId,s.serviceEWT,s.serviceName)}>Join Queue</button>
                        </div>
                    ))
                }

            </div>

        </>
    )
}

export default Queautojoinservices