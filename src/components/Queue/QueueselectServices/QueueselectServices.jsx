// import React, { useEffect } from 'react'
// import "./QueueselectServices.css"
// import { useSelector, useDispatch } from 'react-redux'
// import AdminLayout from '../../layout/Admin/AdminLayout'
// import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'
// import { useNavigate } from 'react-router-dom'

// const QueueselectServices = () => {

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getAllSalonServicesAction(1))
//     }, [dispatch])

//     const getAllSalonServices = useSelector(state => state.getAllSalonServices)

//     const navigate = useNavigate()

//     const routechangeHandler = (serviceId) => {
//         navigate(`/queue/selectservicebarber/${serviceId}`)
//     }

//     return (
//         <>

//                     <AdminLayout />
//                     <div className="queselect-wrapper">
//                         <p>Select Service</p>

//                         <div className='queselect-head'>
//                             <p>Service ID</p>
//                             <p>Service Name</p>
//                             <p>Service Desc</p>
//                             <p>Service Price</p>
//                             <p>Service EWT</p>
//                             <p></p>
//                         </div>

//                         {
//                             getAllSalonServices?.response?.map((s) => (
//                                 <div className='queselect-content' key={s._id} onClick={() => routechangeHandler(s.serviceId)}>
//                                     <p>{s.serviceId}</p>
//                                     <p>{s.serviceName}</p>
//                                     <p>{s.serviceDesc}</p>
//                                     <p>{s.servicePrice}</p>
//                                     <p>{s.serviceEWT}</p>
//                                 </div>
//                             ))
//                         }

//                     </div>

//         </>
//     )
// }

// export default QueueselectServices


import React, { useEffect, useState } from 'react'
import "../QueuebarberList/QueuebarberList"
import { useSelector, useDispatch } from 'react-redux'
import AdminLayout from '../../layout/Admin/AdminLayout'
import { barberListAction, getBarberByMultipleServicesAction, getbarberServicesbyBarberIdAction } from '../../../redux/actions/barberAction'
import { useNavigate } from "react-router-dom"
import { singleJoinQueueAction } from '../../../redux/actions/joinQueueAction'
import { getAllSalonServicesAction } from '../../../redux/actions/salonAction'

const QueueselectServices = () => {


    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const loggedinAdminSalonid = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

    useEffect(() => {
        if (loggedinAdminSalonid) {
            dispatch(getAllSalonServicesAction(loggedinAdminSalonid))
        }
    }, [dispatch, loggedinAdminSalonid])

    const getAllSalonServices = useSelector(state => state.getAllSalonServices)

    console.log(getAllSalonServices)


    const [selectedService, setSelectedService] = useState([])

    const selectedServiceHandler = (ser) => {
        const servicepresent = selectedService.find((s) => s._id === ser._id)

        if (!servicepresent) {
            const serviceWithEWT = { ...ser, barberServiceEWT: Number(ser.serviceEWT) };

            setSelectedService([...selectedService, serviceWithEWT]);
        }
    }

    const selectedServiceDelete = (ser) => {
        const deleteService = selectedService.filter((f) => f._id !== ser._id)
        setSelectedService(deleteService)
    }

    console.log(selectedService)

    const searchBarber = () => {
        const confirm = window.confirm("Are you sure ?")
        if (confirm) {
            const serviceIds = selectedService.map(item => item.serviceId);

            dispatch(getBarberByMultipleServicesAction(loggedinAdminSalonid, serviceIds))
        }
    }

    const getBarberByMultipleServices = useSelector(state => state.getBarberByMultipleServices)

    const [currentbarbername, setCurrentBarberName] = useState("")
    const [currentbarberId, setCurrentBarberId] = useState(null)
    const [name, setName] = useState("")

    const barberSelectHandler = (barbername, barberid) => {
        const confirm = window.confirm("Are you sure ?")

        if (confirm) {
            setCurrentBarberName(barbername)
            setCurrentBarberId(barberid)
        }
    }

    const joinqueueHandler = () => {
        const queuedata = {
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
            name,
            joinedQType: "Single-Join",
            methodUsed: "Walk-In",
            barberName: currentbarbername,
            barberId: currentbarberId,
            services: selectedService
        }

        console.log(queuedata)

        const confirm = window.confirm("Are you sure ? ")

        if (confirm) {
            dispatch(singleJoinQueueAction(queuedata))
        }
    }

    return (
        <>

            <AdminLayout />
            <div className="singlejoin-barber-quebarber-wrapper">

                <h2>Single Join</h2>

                <div className='barber-single-join'>
                    <div>
                        <p>Customer Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Your Customer Name'
                        />
                    </div>

                    <div className='barber-single-join-dropdown'>
                        <p>Choose Services</p>
                        {/* <button onClick={() => setServiceDrop(!serviceDrop)}>drop</button> */}
                    </div>

                    <div className='barber-single-join-dropdown-list'>
                        <div className='barber-single-join-quebarberserv-content'>
                            <p>Service Id</p>
                            <p>Service Name</p>
                            <p>Service Code</p>
                            <p>Service EWT</p>
                            <p>Action</p>
                        </div>
                        {
                            getAllSalonServices ? getAllSalonServices?.response?.map((b, index) => (
                                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                    <p>{b.serviceId}</p>
                                    <p>{b.serviceName}</p>
                                    <p>{b.serviceCode}</p>
                                    <p>{b.serviceEWT}</p>
                                    <button onClick={() => selectedServiceHandler(b, index)}>Add</button>
                                </div>
                            )) : <p>No Services Present</p>
                        }
                    </div>

                    <p>Your Selected Services</p>
                    <div className='barber-single-join-services'>
                        <div className='barber-single-join-quebarberserv-content'>
                            <p>Service Id</p>
                            <p>Service Name</p>
                            <p>Service Code</p>
                            <p>Service EWT</p>
                            <p>Action</p>
                        </div>
                        {
                            selectedService && selectedService.length > 0 ? selectedService.map((b, index) => (
                                <div className='barber-single-join-quebarberserv-content' key={b._id}>
                                    <p>{b.serviceId}</p>
                                    <p>{b.serviceName}</p>
                                    <p>{b.serviceCode}</p>
                                    <p>{b.serviceEWT}</p>
                                    <button onClick={() => selectedServiceDelete(b)}>Del</button>
                                </div>
                            )) : <p>No Services Available</p>
                        }
                    </div>

                    <button onClick={() => searchBarber()}>Search Barber</button>


                    <p>Choose Barber </p>
                    <div className='barber-single-join-services'>

                        <div className='barber-single-join-content-bbr'>
                            <p>Email</p>
                            <p>Name</p>
                            <p>User Name</p>
                            <p>Barber EWT</p>
                            <p>Active</p>
                            <p>Action</p>
                        </div>

                        {
                            getBarberByMultipleServices && getBarberByMultipleServices?.response?.length > 0 ? getBarberByMultipleServices?.response?.map((barber) => (
                                <div className='barber-single-join-content-bbr' key={barber._id}>
                                    <p>{barber.email}</p>
                                    <p>{barber.name}</p>
                                    <p>{barber.userName}</p>
                                    <p>{barber.barberEWT}</p>
                                    <p>{barber.isActive === true ? "Yes" : "No"}</p>
                                    <button onClick={() => barberSelectHandler(barber.name, barber.barberId)}>Select</button>
                                </div>


                            )) : <p>No Barber Present</p>
                        }
                    </div>

                    <button onClick={joinqueueHandler}>Join Queue</button>
                </div>
            </div>

        </>
    )
}

export default QueueselectServices
