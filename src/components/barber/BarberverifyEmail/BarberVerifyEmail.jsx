import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { barberVerifiedStatusAction } from '../../../redux/actions/BarberAuthAction'


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

  return (
    <>
    <div className='verify-email'>
        <h1>Enter OTP</h1>
        <input 
        type="number" 
        value={verifyCode}
        onChange={(e) => setverifyCode(e.target.value)}
        /><br/>
        <button onClick={submitHandler}>Submit</button>
    </div>
    </>
  )
}

export default BarberVerifyEmail