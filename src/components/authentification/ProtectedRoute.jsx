import React, { useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate()
  const logout = useSelector(state => state.logout)
  const authUser = window.localStorage.getItem("auth") === "true"

  useEffect(() => {
    if(logout?.success === true){
      navigate("/signin")
    }
    if(!authUser){
      navigate("/signin")
    }
  },[navigate,logout,authUser])
  return (
    children
  )
}

export default ProtectedRoute