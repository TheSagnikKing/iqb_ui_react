// import React, { useEffect, useState, useRef } from 'react'
// import './SignUp.css'
// import { AiOutlineMail } from 'react-icons/ai'
// import { RiLockPasswordLine } from 'react-icons/ri'
// import { FcGoogle } from 'react-icons/fc'
// import { BsFacebook } from 'react-icons/bs'
// import { BsCheckLg } from 'react-icons/bs'
// import { BiShow } from 'react-icons/bi'
// import { BiHide } from 'react-icons/bi'
// import { RiErrorWarningLine } from 'react-icons/ri'
// import { FaRegUser } from "react-icons/fa"
// import { ColorRing } from 'react-loader-spinner'
// import { Link, useNavigate } from 'react-router-dom'
// // import { googleSignIn, signup } from '../../redux/actions/userAction'
// // import { auth } from '../../config.js/firebase.config'
// //authentication
// import { validateSigninUser } from '../../utils/ValidateUser'

// const SignUp = () => {

//     const [check, setCheck] = useState(false)

//     const isChecked = () => {
//         setCheck(!check)
//     }

//     const [name, setName] = useState("")
//     const [password, setPassword] = useState("")
//     const [email, setEmail] = useState("")
//     const [visible, setVisible] = useState(false)
//     const [error, setError] = useState(true)

//     //=============
//     const handleNameChange = (e) => {
//         setName(e.target.value)
//         localStorage.setItem("name", name)
//     }

//     //authentication starts

//     //User 
//     const [barber, setBarber] = useState(true);


//     const navigate = useNavigate();

//     const authObject = { isAdmin: 'false', isBarber: 'true' };
//     const authJSON = JSON.stringify(authObject);

//     useEffect(() => {

//         const unsubscribe = auth.onAuthStateChanged((userCred) => {
//             if (userCred) {
//                 userCred.getIdToken().then(async (token) => {
//                     console.log("barber signup", token)
//                     const username = localStorage.getItem("name")

//                     validateSigninUser(token,barber,username).then((data) => {
//                         window.localStorage.setItem('auth', authJSON);
//                         console.log("validateSignup", data);
//                         localStorage.removeItem("name")
//                         navigate('/dashboard');
//                     });
//                 });
//             } else {
//                 window.localStorage.setItem('auth', 'false');
//             }
//         });

//         return () => {
//             unsubscribe()
//         }
//     }, []);


//     // useEffect(() => {

//     //     const unsubscribe = auth.onAuthStateChanged((userCred) => {
//     //         if (userCred) {
//     //             userCred.getIdToken().then(async (token) => {
//     //                 console.log("barber signup", token)
//     //                 // const username = localStorage.getItem("name")

//     //                 // validateSigninUser(token,barber,username).then((data) => {
//     //                 //     window.localStorage.setItem('auth', authJSON);
//     //                 //     console.log("validateSignup", data);
//     //                 //     localStorage.removeItem("name")
//     //                 //     navigate('/dashboard');
//     //                 // });
//     //             });
//     //         } else {
//     //             window.localStorage.setItem('auth', 'false');
//     //         }
//     //     });

//     //     return () => {
//     //         unsubscribe()
//     //     }
//     // }, []);

//     // // getAdditionalUserInfo(result)


//     const submitHandler = async () => {
//         try {
//             if (!email) {
//                 alert("Email Required")
//             } else if (!password) {
//                 alert("Password required")
//             } else {
//                 window.localStorage.setItem("name", name)
//                 const currentuser = await signup(email, password)
//             }
//         } catch (error) {
//             console.log(error.message)
//         }
//     }


//     const googleSigninHandler = async () => {
//         try {
//             await googleSignIn();
//         } catch (error) {
//             console.log(error.message);
//         }
//     }


//     return (
//         <>
//             <main className="signup">
//                 <div className="left">
//                     <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000"
//                         alt="signup" />
//                 </div>
//                 <div className="right">
//                     <div className="right_inner_container">

//                         <div className="divone">
//                             <h1>Sign Up for an Account</h1>
//                         </div>

//                         <div className="divtwo">

//                             <div className="input_container">
//                                 <div>
//                                     <FaRegUser />
//                                 </div>
//                                 <input type="text" placeholder='Name'
//                                     value={name}
//                                     onChange={handleNameChange}
//                                 />
//                             </div>

//                             <div className="input_container">
//                                 <div>
//                                     <AiOutlineMail />
//                                 </div>
//                                 <input type="email" placeholder='Email'
//                                     value={email}
//                                     onChange={(e) => setEmail(e.target.value)}
//                                 />
//                             </div>

//                             <div className="input_container_password">
//                                 <div className="password_icon">
//                                     <RiLockPasswordLine />
//                                 </div>
//                                 <input
//                                     type={visible ? "text" : "password"}
//                                     placeholder='Password'
//                                     value={password}
//                                     onChange={e => setPassword(e.target.value)}
//                                     className="password"
//                                     style={{ border: error ? "1px solid red" : "" }}
//                                 />
//                                 <div className="toggle_password" onClick={() => setVisible(!visible)}>
//                                     {visible ? <BiShow /> : <BiHide />}
//                                 </div>
//                             </div>

//                             <div className="error">
//                                 <div>
//                                     <RiErrorWarningLine />
//                                 </div>
//                                 <p>Your password is not strong enough.Use atleast 8 charecters.</p>
//                             </div>

//                             <div className="input_container_end">

//                                 <div style={{ color: "white", backgroundColor: check ? "black" : "" }}
//                                     onClick={isChecked}>
//                                     <BsCheckLg />
//                                 </div>

//                                 <p>By creating an account means you agree to the
//                                     <span style={{ color: "black" }}> Terms & Conditions</span> and our <span style={{ color: "black" }}> Privacy Policy</span></p>
//                             </div>
//                         </div>

//                         <button className="divthree"
//                             onClick={submitHandler}
//                         >Sign Up</button>

//                         <div className="divfour">
//                             <div>

//                             </div>
//                             <p>Or sign in with</p>
//                             <div>

//                             </div>
//                         </div>

//                         <div className="divfive">
//                             <div className="social_button" onClick={googleSigninHandler}>
//                                 <div>
//                                     <FcGoogle />
//                                 </div>
//                                 <p>Google</p>
//                             </div>

//                             <div className="social_button">
//                                 <div>
//                                     <BsFacebook />
//                                 </div>
//                                 <p>facebook</p>
//                             </div>
//                         </div>

//                         <p className="divsix">Already have an account? <Link to="/signin" className="link"><strong>Log In</strong></Link> </p>
//                     </div>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default SignUp

import React from 'react'

const SignUp = () => {
  return (
    <div>SignUp</div>
  )
}

export default SignUp