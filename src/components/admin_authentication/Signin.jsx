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
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';

import { AdminLoginAction, AdminGoogleloginAction } from '../../redux/actions/AdminAuthAction'
import { useDispatch } from 'react-redux'
import { BarberGoogleloginAction, BarberLoginAction } from '../../redux/actions/BarberAuthAction'

//This is sign-in page not sign-up

const SignIn = () => {
    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userLoggedIn = localStorage.getItem("userLoggedIn")
    const barberLoggedIn = localStorage.getItem("barberLoggedIn")

    useEffect(() => {
        if (userLoggedIn == "true") {
            navigate("/admin-dashboard")
        }
        else if(barberLoggedIn == "true"){
            navigate("/barber-dashboard")
        }
    }, [navigate, userLoggedIn,barberLoggedIn])

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const adminsubmitHandler = async () => {

        console.log("Yes i am admin")
        try {
            if (!email) {
                alert('Email Required');
            } else if (!password) {
                alert('Password required');
            } else {
                const signindata = { email, password }
                dispatch(AdminLoginAction(signindata, navigate))
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Google Admin Action
    const responseMessage = async (response) => {
        console.log("admin")
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
        console.log(error);
    };


    const [activeTab, setActiveTab] = useState("Admin")

    const handleTabClick = (e, cityName) => {
        setActiveTab(cityName);
    };

    //FOR BARBER

    const [barberpassword, setBarberPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")
    const [barbervisible, setBarberVisible] = useState(false)
    const [barbererror, setBarberError] = useState(true)


    const barbersubmitHandler = async () => {

        console.log("Yes i am barber")
        try {
            if (!barberemail) {
                alert('Email Required');
            } else if (!barberpassword) {
                alert('Password required');
            } else {
                const signindata = { email: barberemail, password: barberpassword }
                console.log(signindata)
                dispatch(BarberLoginAction(signindata, navigate))
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Google barber Action
    const responseBarberMessage = async (response) => {
        console.log("barber")
        dispatch(BarberGoogleloginAction(response.credential, navigate))
    };

    const errorBarberMessage = (error) => {
        console.log(error);
    };



    return (
        <>
            <main className="signup">
                <div className="left">
                    <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                        alt="signup" />
                </div>

                <div className="right">
                    <div className="right_inner_container">

                        {/* Tab start ==== */}
                        <div className="tab-buttons">
                            <button
                                className={`tablinks ${activeTab === 'Admin' && 'active3'}`}
                                onClick={(e) => handleTabClick(e, 'Admin')}
                            >
                                Admin
                            </button>
                            <button
                                className={`tablinks ${activeTab === 'Barber' && 'active3'}`}
                                onClick={(e) => handleTabClick(e, 'Barber')}
                            >
                                Barber
                            </button>
                        </div>
                        {/* Tab end =====  */}

                        {/* Tab-Content start ==== */}

                        <div className="tab-content">
                            {
                                activeTab == "Admin" ? <>
                                    <div className="divone">
                                        <h1>Sign In to your Admin Account</h1>
                                        <p>Welcome back Admin! please enter your detail</p>
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
                                        onClick={adminsubmitHandler}
                                    >Sign In </button>

                                    <div className="divfour">
                                        <div>

                                        </div>
                                        <p>Or sign in with</p>
                                        <div>

                                        </div>
                                    </div>

                                    <div className="divfive">
                                        <GoogleLogin
                                            onSuccess={responseMessage}
                                            onError={errorMessage}
                                            size='large'
                                            shape='circle'
                                            width={400}
                                            logo_alignment='left'
                                            text='continue_with'
                                        />


                                    </div>

                                    <p className="divsix">Don't have an account? <Link to="/admin-signup" className="link"><strong>Sign Up</strong></Link></p>
                                </> :
                                    <>
                                        <div className="divone">
                                            <h1>Sign In to your Barber Account</h1>
                                            <p>Welcome back Barber! please enter your detail</p>
                                        </div>

                                        <div className="divtwo">
                                            {barbererror && <p>{barbererror}</p>}
                                            <div className="input_container">
                                                <div>
                                                    <AiOutlineMail />
                                                </div>
                                                <input type="email" placeholder='Email'
                                                    value={barberemail}
                                                    onChange={(e) => setBarberEmail(e.target.value)}
                                                />
                                            </div>

                                            <div className="input_container_password">
                                                <div className="password_icon">
                                                    <RiLockPasswordLine />
                                                </div>
                                                <input
                                                    type={barbervisible ? "text" : "password"}
                                                    placeholder='Password'
                                                    value={barberpassword}
                                                    onChange={e => setBarberPassword(e.target.value)}
                                                    className="password"
                                                    style={{ border: error ? "1px solid red" : "" }}
                                                />
                                                <div className="toggle_password" onClick={() => setBarberVisible(!barbervisible)}>
                                                    {barbervisible ? <BiShow /> : <BiHide />}
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

                                                <Link to="/barber-resetpassword" style={{ textDecoration: "none" }}><p>Forgot Password?</p></Link>
                                            </div>
                                        </div>

                                        <button className="divthree"
                                            onClick={barbersubmitHandler}
                                        >Sign In</button>

                                        <div className="divfour">
                                            <div>

                                            </div>
                                            <p>Or sign in with</p>
                                            <div>

                                            </div>
                                        </div>

                                        <div className="divfive">
                                            <GoogleLogin
                                                onSuccess={responseBarberMessage}
                                                onError={errorBarberMessage}
                                                size='large'
                                                shape='circle'
                                                width={400}
                                                logo_alignment='left'
                                                text='continue_with'
                                            />
                                        </div>

                                        <p className="divsix">Don't have an account? <Link to="/admin-signup" className="link"><strong>Sign Up</strong></Link></p></>
                            }
                        </div>

                        {/* Tab-Content end ===== */}

                    </div>
                </div>
            </main>

        </>
    )
}

export default SignIn


// // https://iqb-frontend.netlify.app/

