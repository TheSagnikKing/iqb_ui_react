import React, { useState } from 'react';
import "./Month.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useNavigate } from 'react-router-dom';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import AdminLayout from '../../layout/Admin/AdminLayout';

function Month() {

    const navigate = useNavigate()

    const handleDateSelect = (selectInfo) => {

        navigate("/appoinment/calender", { state: selectInfo.dateStr })
        // console.log(selectInfo.dateStr); // Log the selected date's start date
    };

    return (
        <>
        <AdminLayout/>
        <div className='calender-month'>
            <div className='demo-app-main'>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    dateClick={handleDateSelect}
                    initialEvents={INITIAL_EVENTS}
                    dayMaxEvents={true}
                />
            </div>
        </div>
        </>
    );
}

export default Month;
