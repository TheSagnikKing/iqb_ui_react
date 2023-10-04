import React from 'react'
import './BarberItem.css'
import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineCalendar} from 'react-icons/ai'
import {AiTwotoneMail} from "react-icons/ai"
import {MdOutlineNotificationsNone} from "react-icons/md"
import {BsThreeDotsVertical} from "react-icons/bs"

const BarberItem = () => {
  return (
    <>
    <main className="barberitem">
        <div>
            <p>Barber ID</p>
            <p>BH1377981234</p>
        </div>

        <div>
            <p>First Name</p>
            <p>Kunal</p>
        </div>

        <div>
            <p> Last Name</p>
            <p>Jasuja</p>
        </div>

        <div>
            <FaUserCircle/>
        </div>

        <div>
         <div>
            <AiOutlineCalendar/>
         </div>
         <p>May 10</p>
        </div>

        <div>
            <p>Email ID</p>
            <p>kkunaljasuja@gmail.com</p>
        </div>

        <div>
            <div>
            <AiTwotoneMail/>
            </div>
            <p>Send Mail</p>
        </div>

        <div>
            <MdOutlineNotificationsNone/>
        </div>

        <div>
            <BsThreeDotsVertical/>
        </div>
    </main>
    </>
  )
}

export default BarberItem