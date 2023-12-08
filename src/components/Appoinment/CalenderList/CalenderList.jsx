import React from 'react'
import "./CalenderList.css"
import { useLocation } from 'react-router-dom'
import AdminLayout from '../../layout/Admin/AdminLayout'

const appoinments = [
    {
        title: "B",
        barbername: "John",
        event: [
            {
                event: "B1",
                background: "#87CEEB",//sky blue,
                startTime: "8:00",
                endTime: "9:00"
            },
            {
                event: "B2",
                background: "#FFA500",//orange,
                startTime: "10:00",
                endTime: "11:00"
            },
            {
                event: "B3",
                background: "#FA86C4",//pink,
                startTime: "12:00",
                endTime: "1:00"
            },
            {
                event: "B4",
                background: "#15F4EE", //flurocent blue
                startTime: "3:00",
                endTime: "4:00"
            },
            {
                event: "B1",
                background: "#c5e3e7", //grayish blue,
                startTime: "2:00",
                endTime: "2:30"
            },
            {
                event: "B2",
                background: "#87CEEB",//sky blue
                startTime: "11:00",
                endTime: "11:30"
            },
            {
                event: "B3",
                background: "#FA86C4",//pink
                startTime: "5:00",
                endTime: "6:00"
            },
            {
                event: "B4",
                background: "#c5e3e7", //grayish blue
                startTime: "4:30",
                endTime: "5:00"
            }
        ]
    },
    {
        title: "C",
        barbername: "Smith",
        event: [
            {
                event: "C1",
                background: "#FFA500",//orange
                startTime: "5:00",
                endTime: "6:00"
            },
            {
                event: "C2",
                background: "#FA86C4",//pink
                startTime: "11:00",
                endTime: "11:30"
            }
        ]
    },
    {
        title: "D",
        barbername: "Dorian",
        event: [
            {
                event: "D1",
                background: "#15F4EE", //flurocent blue
                startTime: "4:30",
                endTime: "5:00"
            },
            {
                event: "D2",
                background: "#FA86C4",//pink
                startTime: "5:00",
                endTime: "6:00"
            },
            {
                event: "D3",
                background: "#c5e3e7", //grayish blue
                startTime: "2:00",
                endTime: "2:30"
            }
        ]
    },
    {
        title: "E",
        barbername: "Mihawk",
        event: [
            {
                event: "E1",
                background: "#c5e3e7", //grayish blue
                startTime: "8:00",
                endTime: "9:00"
            },
            {
                event: "E2",
                background: "#15F4EE", //flurocent blue
                startTime: "10:00",
                endTime: "11:00"
            },
            {
                event: "D3",
                background: "#15F4EE", //flurocent blue
                startTime: "2:00",
                endTime: "2:30"
            }
        ]

    },
    {
        title: "F",
        barbername: "Georgina"

    },
    {
        title: "G",
        barbername: "Angelo"

    },
    {
        title: "H",
        barbername: "vinci"

    }
]

const List = () => {

    const location = useLocation()
    console.log(location.state)

    return (
        <>
        <AdminLayout/>
        <div className='calender-list'>
            <div className='list-header'>
                <h2>Date : {location.state ? location.state : "Please Select Your Date"}</h2>
            </div>
            <div className='list-cont'>
                {
                    appoinments.map((app, index) => (
                        <div className='list-content-box'>
                            <div>
                                <div>
                                    <div><img src="https://img.freepik.com/free-vector/hand-drawn-side-profile-cartoon-illustration_23-2150517168.jpg?size=626&ext=jpg&ga=GA1.1.1806204793.1699434893&semt=ais" alt="H" /></div>
                                    <p>{app.barbername}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    app.event ? app.event.map((evt, ind) => (
                                        <div>
                                            <div style={{
                                                background: evt.background,
                                            }}></div><p>Event {evt.event}</p>
                                        </div>
                                    )) : <p className='noappoin2'>No Appoinments</p>
                                }

                                {/* <div>
                                    <div></div><p>Event 2</p>
                                </div>
                                <div>
                                    <div></div><p>Event 3</p>
                                </div> */}
                            </div>
                        </div>
                    ))
                }

            </div>
            </div>
        </>
    )
}

export default List