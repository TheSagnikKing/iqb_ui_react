import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { RiErrorWarningLine } from 'react-icons/ri'
import { FaRegUser } from "react-icons/fa"
import { ColorRing } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'

import { googleSigninAction, signupAction } from '../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'

const SignUp = () => {

    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const dispatch = useDispatch()
    const signin = useSelector(state => state.signin)
    const navigate = useNavigate()

    const authUser = window.localStorage.getItem("auth")

    useEffect(() => {
      if(authUser === "true"){
        navigate("/dashboard")
      }
    },[authUser,navigate])

    useEffect(() => {
        if(signin?.error){
            setError(signin.error)
        }
        if(signin?.success === true){
            window.localStorage.setItem("auth","true")
            navigate("/dashboard")
        }
    },[signin,navigate,window])

    const submitHandler = async() => {
        dispatch(signupAction(email,password))
    }

    const googleSigninHandler = () => {
        dispatch(googleSigninAction())
    }
    return (
        <>
            <main className="signup">
                <div className="left">
                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                        alt="signup" />
                </div>
                <div className="right">
                    <div className="right_inner_container">

                        <div className="divone">
                            <h1>Sign Up for an Account</h1>
                        </div>

                        <div className="divtwo">

                            <div className="input_container">
                                <div>
                                    <FaRegUser />
                                </div>
                                <input type="text" placeholder='Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="input_container">
                                <div>
                                    <AiOutlineMail />
                                </div>
                                <input type="email" placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

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
                                    style={{ border: error ? "1px solid red" : "" }}
                                />
                                <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                    {visible ? <BiShow /> : <BiHide />}
                                </div>
                            </div>

                            <div className="error">
                                <div>
                                    <RiErrorWarningLine />
                                </div>
                                <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                            </div>

                            <div className="input_container_end">

                                <div style={{ color: "white", backgroundColor: check ? "black" : "" }}
                                    onClick={isChecked}>
                                    <BsCheckLg />
                                </div>

                                <p>By creating an account means you agree to the
                                    <span style={{ color: "black" }}> Terms & Conditions</span> and our <span style={{ color: "black" }}> Privacy Policy</span></p>
                            </div>
                        </div>

                        <button className="divthree"
                            onClick={submitHandler}
                        >Sign Up</button>

                        <div className="divfour">
                            <div>

                            </div>
                            <p>Or sign in with</p>
                            <div>

                            </div>
                        </div>

                        <div className="divfive">
                            <div className="social_button" onClick={googleSigninHandler}>
                                <div>
                                    <FcGoogle />
                                </div>
                                <p>Google</p>
                            </div>

                            <div className="social_button">
                                <div>
                                    <BsFacebook />
                                </div>
                                <p>facebook</p>
                            </div>
                        </div>

                        <p className="divsix">Already have an account? <Link to="/signin" className="link"><strong>Log In</strong></Link> </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp