import React, { useEffect, useState } from 'react'
import "./Signin.css"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { BarberGoogleloginAction, BarberLoginAction } from '../../../../redux/actions/BarberAuthAction';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BiHide, BiShow } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';
import { GoogleLogin } from '@react-oauth/google';
import { ADMIN_SIGNUP_FAIL } from '../../../../redux/constants/AdminAuthConstants';
import { BARBER_SIGNUP_FAIL } from '../../../../redux/constants/BarberAuthConstants';

const Signin = () => {

    const userLoggedIn = localStorage.getItem("userLoggedIn")
    const barberLoggedIn = localStorage.getItem("barberLoggedIn")

    const BarberLogin = useSelector(state => state.BarberLogin)
    const { loading: barberLoading, error: barberLoginError } = BarberLogin;

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (userLoggedIn == "true") {
            navigate("/admin-dashboard")
        }
        else if(barberLoggedIn == "true"){
            navigate("/barber-dashboard")
        }
    }, [navigate, userLoggedIn,barberLoggedIn])

    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

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

    useEffect(() => {
        if (barberLoginError) {
            toast.error(barberLoginError?.message, {
                position: "top-right"
            });
        }

        // dispatch({
        //     type:BARBER_SIGNIN_FAIL,
        //     payload:{}
        // })
    }, [barberLoginError, dispatch])

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
    
            navigate("/barber-signup");
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
                    <div className="divone">
                        <h1 style={{color:"#000"}}>Sign In to your Barber Account</h1>
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
                    >{barberLoading ? <div><ClipLoader color="#fff" /></div> : "Sign In"}</button>

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

                    <p className="divsix">Don't have an account? <p onClick={signupRoute} className="link"><strong>Sign Up</strong></p></p>

                </div>
            </div>
            <ToastContainer />
        </main>
    )
}

export default Signin