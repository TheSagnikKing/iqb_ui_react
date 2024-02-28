import React, { useEffect, useState } from 'react'
import "./Signin.css"
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AdminGoogleloginAction, AdminLoginAction } from '../../../../redux/actions/AdminAuthAction'
import { BiHide, BiShow } from 'react-icons/bi'
import { BsCheckLg } from 'react-icons/bs'
import { ClipLoader } from 'react-spinners'
import { GoogleLogin } from '@react-oauth/google'
import { toast, ToastContainer } from 'react-toastify'
import { ADMIN_SIGNUP_FAIL } from '../../../../redux/constants/AdminAuthConstants'
import { BARBER_SIGNUP_FAIL } from '../../../../redux/constants/BarberAuthConstants'

const Signin = () => {

    const AdminLogin = useSelector(state => state.AdminLogin)
    const { loading, error: adminLoginError } = AdminLogin

    const navigate = useNavigate();
    const dispatch = useDispatch()


    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }


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
                console.log(signindata)
                dispatch(AdminLoginAction(signindata, navigate))
            }
        } catch (error) {
            console.log(error?.response?.data);
        }
    }

    //Google Admin Action
    const responseMessage = async (response) => {
        dispatch(AdminGoogleloginAction(response.credential, navigate))
    };

    const errorMessage = (error) => {
        console.log(error);
    };


    useEffect(() => {
        if (adminLoginError) {
            toast.error(adminLoginError?.message, {
                position: "top-right",
                style: {
                    background: "#000"
                },
            });
        }

    }, [adminLoginError, dispatch])



    const signupRoute = () => {
        try {
            dispatch({
                type: ADMIN_SIGNUP_FAIL,
                payload: {}
            });

            dispatch({
                type: BARBER_SIGNUP_FAIL,
                payload: {}
            });

            navigate("/admin-signup");
        } catch (error) {
            console.error("Error navigating:", error);
        }
    };


    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)


    const [screenwidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    console.log(screenwidth)

    return (
        <main className="signup">
            <div className="left">
                <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
                    alt="signup" />
            </div>

            <div className="right">
                <div className="right_inner_container">


                    <div className="divone">
                        <h1 style={{ color: "#000" }}>Sign In to your Admin Account</h1>
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
                    >{loading ? <div><ClipLoader color="#fff" /></div> : "Sign In"} </button>

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
                            width={screenwidth <= 400 ? 300 : 400}
                            logo_alignment='left'
                            text='continue_with'
                        />


                    </div>

                    <p className="divsix">Don't have an account? <p onClick={signupRoute} className="link"><strong>Sign Up</strong></p></p>
                </div>
                <ToastContainer />
            </div>
        </main>
    )
}

export default Signin