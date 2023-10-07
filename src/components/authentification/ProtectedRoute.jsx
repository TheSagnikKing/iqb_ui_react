import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_SIGNIN_SUCCESS } from '../../redux/constants/userConstants'
import { auth } from '../../config.js/firebase.config'
import { validateSigninUser } from '../../utils/ValidateUser'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authValue = window.localStorage.getItem("auth") === "false"

  const [user, setUser] = useState(false)
  // const [admin, setAdmin] = useState(false)

  const storedAuthJSON = localStorage.getItem("auth");
  const storedAuthObject = JSON.parse(storedAuthJSON);


  const authObject = { isAdmin: "false", isUser: "true" };
  const authJSON = JSON.stringify(authObject);

  // const authAdminObject = { isAdmin: "true", isUser: "false" };
  // const authAdminJSON = JSON.stringify(authAdminObject)

  useEffect(() => {

      let isMounted = true

      if (storedAuthObject.isUser == "true") {
        auth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then(token => {
              console.log("userrrrrr", token)

              validateSigninUser(token, user).then(data => {
                window.localStorage.setItem("auth", authJSON)
                console.log(data)
                dispatch({ type: USER_SIGNIN_SUCCESS, payload: data })

              })
        
            })
          } else {
            navigate("/")
            window.localStorage.setItem("auth", "false")
          }
        })
      } 

    return () => {
      isMounted = false;
    }

  }, []);


  useEffect(() => {
    if (authValue) {
        navigate("/")
    }
  }, [authValue, navigate])

  return (
    children
  )
}

export default ProtectedRoute