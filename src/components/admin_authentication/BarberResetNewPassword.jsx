import React, { useState } from 'react'
import "./BarberResetNewPassword.css"
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { BarberResetPasswordAction } from '../../redux/actions/BarberAuthAction'

const BarberResetNewPassword = () => {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const {token} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const resetnewpasswordHandler = () => {
        if(!password && !confirmPassword){
            alert("Please fill all the fields")
        }else if(password !== confirmPassword){
            alert("Password donot match")
        }else{
            dispatch(BarberResetPasswordAction(token,password,navigate))
        }
    }

    return (
            <main className="signup">
                <div className="left">
                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                        alt="signup" />
                </div>

                <div className="right">
                    <div className="right_inner_container">

                        <div className="divone">
                            <h1>Reset Password</h1>
                            <p>Welcome back! Please reset your new password</p>
                        </div>

                        <div className="divtwo">
                            <div className="input_container_password">
                                <div className="password_icon">
                                    <RiLockPasswordLine />
                                </div>
                                <input
                                    type={visible ? "text" : "password"}
                                    placeholder='Password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="password"
                                />
                                <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                    {visible ? <BiShow /> : <BiHide />}
                                </div>
                            </div>

                            <div className="input_container_password">
                                <div className="password_icon">
                                    <RiLockPasswordLine />
                                </div>
                                <input
                                    type={visible2 ? "text" : "password"}
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="password"
                                />
                                <div className="toggle_password" onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <BiShow /> : <BiHide />}
                                </div>
                            </div>

                        </div>

                        <button className="divthree" onClick={resetnewpasswordHandler}>continue</button>
                    </div>
                </div>
            </main>
    )
}

export default BarberResetNewPassword