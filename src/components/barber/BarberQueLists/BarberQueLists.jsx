import React, { useEffect, useState } from 'react'
import './BarberQueLists.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { PiQueueBold } from "react-icons/pi";
import Layout from '../../../components/layout/Layout';
import { barberQueListAction, barberServedQueueAction } from '../../../redux/actions/barberAction';


const BarberQueLists = () => {

    const [singledrop, setSingleDrop] = useState(false)

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    // const barberId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].barberId;

    const dispatch = useDispatch()

    useEffect(() => {

            dispatch(barberQueListAction({
                salonId:LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId,
                barberId:LoggedInMiddleware?.user && LoggedInMiddleware.user[0].barberId
            }))
        
    }, [dispatch,LoggedInMiddleware?.user])

    const barberQuelist = useSelector(state => state.barberQuelist)

    const serverHandler = (barberId, serviceId, customerid) => {

        const infodata = {
            barberId,
            serviceId,
            _id: customerid,
            salonId: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId
        }

        dispatch(barberServedQueueAction(infodata))
    }


    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard",darkMode)
  
    const currentmode = darkMode === "On"

    return (
        <>
            <Layout />
            <div className='queue-wrapper'>

                <div className={`queue-list-table ${currentmode && 'queue-list-table_dark'}`}>
                    <p style={{
                        color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                    }}>Queue List</p>

                    <div className={`que-lst-head ${currentmode && 'que-lst-head_dark'}`}>
                        <p className={`que-lst-head-para ${currentmode && 'que-lst-head-para_dark'}`}>Name</p>
                        {/* <p>JoinedQ</p>
                        <p>JoinedQType</p> */}
                        <p className={`que-lst-head-para ${currentmode && 'que-lst-head-para_dark'}`}>TimeJoinedQ</p>
                        <p className={`que-lst-head-para ${currentmode && 'que-lst-head-para_dark'}`}>Barber Name</p>
                        <p className={`que-lst-head-para ${currentmode && 'que-lst-head-para_dark'}`}>Q Position</p>
                        <p className={`que-lst-head-para ${currentmode && 'que-lst-head-para_dark'}`}>Served</p>
                    </div>

                    {
                        barberQuelist?.queueList?.map((c) => (
                            <div className={`que-lst-content ${currentmode && 'que-lst-content_dark'}`} key={c._id}>
                                <p>{c.name}</p>
                                {/* <p>{c.joinedQ == true ? "True" : "False"}</p>
                                <p>{c.joinedQType}</p> */}
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

export default BarberQueLists