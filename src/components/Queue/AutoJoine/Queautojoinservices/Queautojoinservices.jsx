import React, { useEffect } from 'react'
import "./Queautojoinservices.css"
import { useDispatch, useSelector } from 'react-redux'
import AdminLayout from '../../../layout/Admin/AdminLayout'
import { getAllSalonServicesAction } from '../../../../redux/actions/salonAction'
import { autojoinAction } from '../../../../redux/actions/joinQueueAction'

const Queautojoinservices = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSalonServicesAction(1))
    }, [dispatch])

    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    const autojoinHandler = (serviceId) => {
        const joindata = {
            userName: "Arghya",
            name: "Arghya Ghosh",
            joinedQType: "Auto-Join",
            methodUsed: "Walk-In",
            salonId: 1,
            serviceId: serviceId,
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
                                    <button onClick={() => autojoinHandler(s.serviceId)}>Join Queue</button>
                                </div>
                            ))
                        }

                    </div>
               
        </>
    )
}

export default Queautojoinservices