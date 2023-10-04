import React, { useEffect, useState } from 'react'
import './SignIn.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { BsFacebook } from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { RiErrorWarningLine } from 'react-icons/ri'

import { ColorRing } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { googleSignIn, googleSigninAction, signinAction } from '../../redux/actions/userAction'


//This is sign-in page not sign-up

const SignIn = () => {
    const [check, setCheck] = useState(false)
    const [loader, setLoader] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const dispatch = useDispatch()
    const signin = useSelector(state => state.signin)
    const navigate = useNavigate()

    const authUser = window.localStorage.getItem("auth") === "true"

    useEffect(() => {
      if(authUser){
        navigate("/dashboard")
      }
    },[authUser,navigate])

    useEffect(() => {
        if (signin?.error) {
            setError(signin.error)
        }
        if (signin?.success === true) {
            window.localStorage.setItem("auth", "true")
            navigate("/dashboard")
        }
    }, [signin, navigate, window])

    const submitHandler = async () => {

        dispatch(signinAction(email, password))

    }

    const googleSigninHandler = async() => {
        await googleSignIn()
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
                            <h1>Sign In to your Account</h1>
                            <p>Welcome back! please enter your detail</p>
                        </div>

                        <div className="divtwo">
                            {error && <p>{error}</p>}
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

                            <div className="lg-input_container_end">
                                <div>
                                    <div style={{ color: "white", backgroundColor: check ? "black" : "" }}
                                        onClick={isChecked}>
                                        <BsCheckLg />
                                    </div>
                                    <p>Remember me</p>
                                </div>

                                <Link to="/resetpassword" style={{ textDecoration: "none" }}><p>Forgot Password?</p></Link>
                            </div>
                        </div>

                        <button className="divthree"
                            onClick={submitHandler}
                        >Sign In</button>

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

                        <p className="divsix">Don't have an account? <Link to="/signup" className="link"><strong>Sign Up</strong></Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignIn