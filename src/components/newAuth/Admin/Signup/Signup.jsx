import React, { useEffect, useState } from 'react'
import "./Signup.css"
import { AdminGoogleloginAction, AdminRegisterAction } from '../../../../redux/actions/AdminAuthAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { BiHide, BiShow } from 'react-icons/bi'
import { BsCheckLg } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'
import { GoogleLogin } from '@react-oauth/google'
import { toast,ToastContainer } from 'react-toastify'
import { ADMIN_SIGNIN_FAIL } from '../../../../redux/constants/AdminAuthConstants'
import { BARBER_SIGNIN_FAIL } from '../../../../redux/constants/BarberAuthConstants'

const Signup = () => {

    const AdminRegister = useSelector(state => state.AdminRegister)
    const { loading } = AdminRegister

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
        else if (barberLoggedIn == "true") {
            navigate("/barber-dashboard")
        }
    }, [navigate, userLoggedIn, barberLoggedIn])

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

    const { error: AdminSignupError } = AdminRegister

    useEffect(() => {
        if (AdminSignupError) {
            toast.error(AdminSignupError?.message, {
                position: "top-right",
                style: {
                    background: "#000"
                },
            });
        }

    }, [AdminSignupError])

    //Google Admin Action
    const responseMessage = async (response) => {
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
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

    const [screenwidth, setScreenWidth] = useState("")

    useEffect(() => {
        const changewidthvalue = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize',changewidthvalue)

        return () => {
            window.removeEventListener('resize',changewidthvalue)
        }
    },[])

    return (
        <main className="signup">
            <div className="left">
                <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                    alt="signup" />
            </div>
            <div className="right">
                <div className="right_inner_container">
                    <div className="divone">
                        <h1 style={{color:"#000"}}>Sign Up Admin for an Account</h1>
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
                    >{loading ? <div><ClipLoader color="#fff" /></div> : "Sign Up"}</button>

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
                            width={screenwidth < 400 ? 300 : 400}
                            logo_alignment='left'
                            text='continue_with'
                        />
                    </div>

                    <p className="divsix">Already have an account? <p onClick={signinRoute} className="link"><strong>Log In</strong></p> </p>
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}

export default Signup