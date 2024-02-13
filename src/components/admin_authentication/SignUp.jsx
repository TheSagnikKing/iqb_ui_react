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

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AdminGoogleloginAction, AdminRegisterAction } from '../../redux/actions/AdminAuthAction'
import { GoogleLogin } from '@react-oauth/google'
import { BarberGoogleloginAction, BarberRegisterAction } from '../../redux/actions/BarberAuthAction'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { getMessaging, getToken } from "firebase/messaging";
// import { messaging } from '../../firebase';
import { ClipLoader } from 'react-spinners'
import { ADMIN_SIGNIN_FAIL } from '../../redux/constants/AdminAuthConstants'
import { BARBER_SIGNIN_FAIL } from '../../redux/constants/BarberAuthConstants'


const SignUp = () => {

    const AdminRegister = useSelector(state => state.AdminRegister)
    const {loading } = AdminRegister

    const BarberRegister = useSelector(state => state.BarberRegister)
    const {loading:BarberLoading} = BarberRegister

    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    const navigate = useNavigate()
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

    const submitHandler = async () => {
        try {
            if (!email) {
                alert("Email Required")
            } else if (!password) {
                alert("Password required")
            } else {
                const signupdata = { email, password }
                dispatch(AdminRegisterAction(signupdata, navigate))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const {error:AdminSignupError} = AdminRegister

    useEffect(() => {
        if(AdminSignupError){
            toast.error(AdminSignupError?.message, {
                position: "top-right"
            });
        }

    },[AdminSignupError])

    const [activeTab, setActiveTab] = useState("Admin")

    const handleTabClick = (e, cityName) => {
        setActiveTab(cityName);
    };

     //Google Admin Action
     const responseMessage = async (response) => {
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
        console.log(error);
    };


    //BARBER PART 
    const [barberpassword, setBarberPassword] = useState("")
    const [barberemail, setBarberEmail] = useState("")
    const [barbervisible, setBarberVisible] = useState(false)


    const {error:BarberRegisterError} = BarberRegister

    const barbersubmitHandler = () => {
        try {
            if (!barberemail) {
                alert("Email Required")
            } else if (!barberpassword) {
                alert("Password required")
            } else {
                const signupdata = { email:barberemail, password:barberpassword }
                console.log(signupdata)
                dispatch(BarberRegisterAction(signupdata, navigate))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if(BarberRegisterError){
            toast.error(BarberRegisterError?.message, {
                position: "top-right"
            });
        }

    },[BarberRegisterError])

    // Google barber Action
    const responseBarberMessage = async (response) => {
        console.log("barber")
        dispatch(BarberGoogleloginAction(response.credential, navigate))
    };

    const errorBarberMessage = (error) => {
        console.log(error);
    };
    

    const signinRoute = () => {
        try {
            dispatch({
                type: ADMIN_SIGNIN_FAIL,
                payload: {}
            });
    
            dispatch({
                type: BARBER_SIGNIN_FAIL,
                payload: {}
            });
    
            navigate("/admin-signin");
        } catch (error) {
            console.error("Error navigating:", error);
        }
    };
    

    return (
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
                                className={`tablinks ${activeTab === 'Barber' && 'active4'}`}
                                onClick={(e) => handleTabClick(e, 'Barber')}
                            >
                                Barber
                            </button>
                        </div>
                        {/* Tab end =====  */}

                        {/* Tab-Content start ==== */}

                        {
                            activeTab == "Admin" ? <>
                                <div className="divone">
                                    <h1>Sign Up Admin for an Account</h1>
                                </div>

                                <div className="divtwo">

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
                                            // style={{ border: error ? "1px solid red" : "" }}
                                        />
                                        <div className="toggle_password" onClick={() => setVisible(!visible)}>
                                            {visible ? <BiShow /> : <BiHide />}
                                        </div>
                                    </div>

                                    {/* <div className="error">
                                        <div>
                                            <RiErrorWarningLine />
                                        </div>
                                        <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                                    </div> */}

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
                                >{loading ? <div><ClipLoader color="#fff"/></div> : "Sign Up"}</button>

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
                                        width={310}
                                        logo_alignment='left'
                                        text='continue_with'
                                    />
                                </div>

                                <p className="divsix">Already have an account? <p onClick={signinRoute} className="link"><strong>Log In</strong></p> </p>
                            </> : <>
                                <div className="divone">
                                    <h1>Sign Up Barber for an Account</h1>
                                </div>

                                <div className="divtwo">

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
                                            // style={{ border: error ? "1px solid red" : "" }}
                                        />
                                        <div className="toggle_password" onClick={() => setBarberVisible(!barbervisible)}>
                                            {barbervisible ? <BiShow /> : <BiHide />}
                                        </div>
                                    </div>

                                    {/* <div className="error">
                                        <div>
                                            <RiErrorWarningLine />
                                        </div>
                                        <p>Your password is not strong enough.Use atleast 8 charecters.</p>
                                    </div> */}

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
                                    onClick={barbersubmitHandler}
                                >{BarberLoading ? <div><ClipLoader color="#fff"/></div> : "Sign Up"}</button>

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
                                        width={310}
                                        logo_alignment='left'
                                        text='continue_with'
                                    />
                                </div>

                                <p className="divsix">Already have an account? <p onClick={signinRoute} className="link"><strong>Log In</strong></p> </p>
                            </>
                        }
                        {/* Tab-Content end ===== */}


                    </div>
                </div>
                <ToastContainer />
            </main>
    )
}

export default SignUp