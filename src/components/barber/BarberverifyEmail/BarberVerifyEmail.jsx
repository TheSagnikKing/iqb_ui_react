import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { barberVerifiedStatusAction } from '../../../redux/actions/BarberAuthAction'
import ClipLoader from "react-spinners/ClipLoader";


const BarberVerifyEmail = () => {

  const [verifyCode, setverifyCode] = useState(null)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const submitHandler = () => {
    const confirm =  window.confirm("Are you sure ?")

    if(confirm){
      dispatch(barberVerifiedStatusAction(navigate,{
        email:LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email,
        verificationCode:verifyCode
      }))
    }
  }

  const barberVerifyStatus = useSelector(state => state.barberVerifyStatus)
  const {loading} = barberVerifyStatus

  const darkMode = useSelector(state => state.color.darkmode)

  return (
    <div className='verify-email'>
        <h1 style={{color:darkMode === "On" ? "var(--light-secondary-color)":"var(--dark-secondary-color)"}}>Enter OTP</h1>
        <input 
        type="number" 
        value={verifyCode}
        onChange={(e) => setverifyCode(e.target.value)}
        /><br/>
        <button onClick={submitHandler}>{ loading === true ? <ClipLoader/> : <p style={{fontSize:"1.2rem"}}>Submit</p>}</button>
    </div>
  )
}

export default BarberVerifyEmail