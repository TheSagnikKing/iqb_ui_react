import React, { useState } from 'react'
import "./UpdateAdminprofile.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch } from 'react-redux'
import { updateAdminAction } from '../../redux/actions/AdminAuthAction'

const UpdateAdminprofile = () => {

    const [username,setUsername] = useState("")
    const [mobileNumber,setMobileNumber] = useState("")
    const [name,setName] = useState("")
    const [gender,setGender] = useState("")
    const [dob,setDob] = useState("")

    const dispatch = useDispatch()

    const submitHandler = () => {
        const profiledata = {
            email:"arghyahimanstech@gmail.com",
            salonId:3,
            username,
            mobileNumber,
            name,
            gender
        }

        dispatch(updateAdminAction(profiledata))
    } 

    return (
        <>
            <AdminLayout />
            <div className="wrapper">

            <div className="sa-br-right_main_head">
                    <p>Crud</p>
                </div>

                <div className="sa-br-right_main_form">

                        <div>
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                            />
                        </div>

                        <div>
                            <label htmlFor="">Salon Id</label>
                            <input
                                type="text"
                            />
                        </div>

                        <div>
                            <label htmlFor="">User Name</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Mobile Number</label>
                            <input
                                type="text"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Gender</label>
                            <input
                                type="text"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Date of Birth</label>
                            <input 
                            type="date" 
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            />
                        </div>

                        <div className="sa-br-btn_box">
                            <button onClick={submitHandler}>
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
        </>
    )
}

export default UpdateAdminprofile