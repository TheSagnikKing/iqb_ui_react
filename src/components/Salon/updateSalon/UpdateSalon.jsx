import React, { useState } from 'react'
import "./UpdateSalon.css"
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../layout/Layout'
import { updateSalonAction } from '../../../redux/actions/salonAction'

const UpdateSalon = () => {

    const signin = useSelector(state => state.signin)
    const { user } = signin

    const [salonId,setSalonId] = useState("")
    const [adminEmail,setAdminEmail] = useState("")
    const [postCode,setPostCode] = useState("")
    const [contactTel,setContactTel] = useState(0)

    const dispatch = useDispatch()

    const submitHandler = () => {
        const salondata = {salonId,adminEmail,postCode,contactTel}
        console.log(salondata)

        dispatch(updateSalonAction(salondata))
        alert("updated successfully")
    }

    return (
        <>
            {
                user?.isAdmin ? (<>
                    <Layout />
                    <div className='updsal-wrapper'>
                        <p>Update Salon</p>

                        <div className='updsal-form'>
                            <div>
                                <label>Salon ID</label>
                                <input 
                                type="text" 
                                placeholder='Enter Salon ID'
                                value={salonId}
                                onChange={(e) => setSalonId(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Admin Email</label>
                                <input 
                                type="email" 
                                placeholder='Enter Admin Email'
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Postal Code</label>
                                <input 
                                type="text" 
                                placeholder='Enter Postal Code'
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Contact Tel</label>
                                <input 
                                type="number" 
                                placeholder='Enter Contact Tel'
                                value={contactTel}
                                onChange={(e) => setContactTel(e.target.value)}
                                />
                            </div>

                            <button onClick={submitHandler}>Update</button>
                        </div>

                    </div>
                </>) : (<h1>Only Admins can access this page</h1>)
            }
        </>
    )
}

export default UpdateSalon