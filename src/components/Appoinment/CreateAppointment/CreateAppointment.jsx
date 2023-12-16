import React from 'react'
import "./CreateAppointment.css"
import AdminLayout from '../../layout/Admin/AdminLayout'

const CreateAppointment = () => {
    return (
        <>
            <AdminLayout />
            <div className='create-appointment-container'>
                <h2>Create Appointment</h2>

                <div className='create-form'>
                    <div>
                        <label htmlFor="">Customer Name</label>
                        <input 
                        type="text" 
                        placeholder='Enter Name'
                        />
                    </div>
                    <div>
                        <label htmlFor="">Choose Date</label>
                        <input 
                        type="date"                   
                        />
                    </div>

                    <div>
                        <label htmlFor="">Barber List</label>
                        
                        <div>
                            Barber List Dropdown
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Choose  Services</label>

                        <div>
                            Selected Barberer Services gulo dekhabe
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Your Services</label>

                        <div>
                            Jai Service gulo choose kora hoeche
                        </div>
                    </div>

                    <div>
                        <label htmlFor="">Choose  TimeSlots</label>

                        <div>
                            Sobh TimeSlotser Data gulo dekhabe
                        </div>
                    </div>

                    <button>Create Appointment</button>
                </div>
            </div>
        </>
    )
}

export default CreateAppointment