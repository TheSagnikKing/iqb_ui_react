import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_SIGNIN_SUCCESS } from '../../redux/constants/userConstants'
import { auth } from '../../config.js/firebase.config'
import { validateSigninAdmin, validateSigninUser } from '../../utils/ValidateUser'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authValue = window.localStorage.getItem("auth") === "false"

  const [barber, setBarber] = useState(false)
  const [admin, setAdmin] = useState(false)

  const storedAuthJSON = localStorage.getItem("auth");
  const storedAuthObject = JSON.parse(storedAuthJSON);


  const authObject = { isAdmin: "false", isBarber: "true" };
  const authJSON = JSON.stringify(authObject);

  const authAdminObject = { isAdmin: "true", isBarber: "false" };
  const authAdminJSON = JSON.stringify(authAdminObject)

  useEffect(() => {

      let isMounted = true

      if (storedAuthObject.isBarber == "true") {
        auth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then(token => {
              console.log("barberrrrrrr", token)

              validateSigninUser(token,barber).then(data => {
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
      } else{
        auth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then(token => {
              console.log("adminnnnn", token)

              validateSigninAdmin(token, admin).then(data => {
                window.localStorage.setItem("auth", authAdminJSON)
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