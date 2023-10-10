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
import { auth } from '../../config.js/firebase.config'
import { googleSignIn, signin } from '../../redux/actions/userAction'

import { validateSigninAdmin } from '../../utils/ValidateUser'

//This is sign-in page not sign-up

const SignIn = () => {
    const [check, setCheck] = useState(false)

    const isChecked = () => {
        setCheck(!check)
    }

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [visible, setVisible] = useState(false)
    const [error, setError] = useState(true)

    //authentication starts
    //Admin
    const [admin, setAdmin] = useState(true);

    const navigate = useNavigate();

    const authObject = { isAdmin: 'true', isBarber: 'false' };
    const authJSON = JSON.stringify(authObject);

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then(async (token) => {
                    console.log("admin signin", token)

                    validateSigninAdmin(token, admin).then((data) => {
                        window.localStorage.setItem('auth', authJSON);
                        console.log("validateSigninAdmin", data);
                        navigate("/admin-dashboard")
                       
                    });
                });
            } else {
                window.localStorage.setItem('auth', 'false');
            }
        });

        return () => {
            unsubscribe()
        }
    }, []);


    const submitHandler = async () => {
        try {
            if (!email) {
                alert('Email Required');
            } else if (!password) {
                alert('Password required');
            } else {
                await signin(email, password);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const googleSigninHandler = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error.message);
        }
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

                        <p className="divsix">Don't have an account? <Link to="/admin-signup" className="link"><strong>Sign Up</strong></Link></p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignIn


// https://iqb-frontend.netlify.app/