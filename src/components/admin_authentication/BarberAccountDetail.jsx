import React, { useState } from 'react'
import "./AdminAccountDetail.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBarberAccountDetailsAction } from '../../redux/actions/BarberAuthAction'

const BarberAccountDetail = () => {

    const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const submitHandler = () => {
        //email authentication  theke asbe
        const profiledata = {email:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.email,mobileNumber,name,gender,dateOfBirth:dob,salonId:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0]?.salonId,userName:username};

        // const profiledata = {email:"sagniknandy27@gmail.com",mobileNumber,name,gender,dateOfBirth:dob,salonId:LoggedInMiddleware?.user[0]?.salonId,userName:username};
        dispatch(updateBarberAccountDetailsAction(navigate,profiledata))
    }

    const skipHandler = () => {
        navigate("/barber-dashboard")
    }

    return (
        <>

            <div className='admin_account_detail_container'>
                <div>
                    <h2>Fill Your Barber Account Details</h2>
                </div>
                <div className='admin_account_detail'>

                    {/* <div>
                        <label htmlFor="">Salon Id</label>
                        <input
                            type="text"
                        />
                    </div> */}

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

                    <button className='skip' onClick={skipHandler}>Skip</button>
                </div>

            </div>
        </>
    )
}

export default BarberAccountDetail