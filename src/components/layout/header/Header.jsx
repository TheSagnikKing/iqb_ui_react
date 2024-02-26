import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
import Menu from './Menu2.jsx'
import { menudata } from '../../data'
import { FiSettings } from 'react-icons/fi'
import { BsMoonStars } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'
import { CiSearch } from "react-icons/ci"
import { IoNotificationsOutline } from "react-icons/io5"
import { FaCamera, FaMoon, FaUserCircle } from "react-icons/fa"
import { MdKeyboardArrowDown, MdOutlineWbSunny } from "react-icons/md"
import { BiLogOutCircle } from "react-icons/bi"
import { RiAccountCircleFill } from "react-icons/ri"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BarberLogoutAction } from '../../../redux/actions/BarberAuthAction.js'
import { useDispatch, useSelector } from 'react-redux'
import { barberOnlineStatusAction } from '../../../redux/actions/barberAction.js'
import api from "../../../redux/api/Api.js"
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../redux/actions/colorAction.js'


const Header = ({ title }) => {

  const [check, setCheck] = useState(false)

  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutHandler = async () => {
    dispatch(BarberLogoutAction(navigate))
  }

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)



  //===================================================

  const [setprofilepic, Setsetprofilepic] = useState("")

  const fileInputRef = useRef(null);

  const handleEditButtonClick = (publicid, id) => {
    fileInputRef.current.click();
  };


  const handleFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];
    console.log(uploadImage)

    const formData = new FormData();

    formData.append('email', LoggedInMiddleware?.user[0]?.email)
    formData.append('profile', uploadImage)

    try {
      const imageResponse = await api.post('/api/barber/uploadBarberProfilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', imageResponse.data);
      Setsetprofilepic(imageResponse?.data?.adminImage?.profile[0]?.url)
      window.location.reload()
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  //================


  const location = useLocation()
  const { pathname } = location

  console.log("Pathname", pathname)

  const [expandMenu, setExpandMenu] = useState(false)

  const notifyHandler = () => {
    navigate("/barber/allnotification")
  }


  const darkHandler = () => {
    setCheck(true)
    dispatch({ type: DARK_MODE_ON });
    localStorage.setItem("dark", "On");
  }

  const lightHandler = () => {
    setCheck(false)
    dispatch({ type: DARK_MODE_OFF });
    localStorage.setItem("dark", "Off");
  }

  const darkMode = useSelector(state => state.color.darkmode)

  useEffect(() => {
    if (localStorage.getItem("dark") === "On") {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [])

  const currentmode = darkMode === "On"

  return (
    <section className="nav1">
      <div className={`nav1left ${currentmode && 'nav1left_dark'}`}>
        <div className={`nav1left_header ${currentmode && 'nav1left_header_dark'}`}>
          <span>IQB</span>&nbsp;<span>iqueuebarbers</span>
        </div>

        <div className={`nav1wrapper ${currentmode && 'nav1wrapper_dark'}`}>

          <div className="nav1left_menu_box">
            <button onClick={() => setExpandMenu(true)} style={{ background: "#fff", border: "none", boxShadow: "0px 0px 4px rgba(0,0,0,0.5)", height: "30px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}><RxHamburgerMenu /></button>

            {menudata.map((item) => {
              return (
                <div key={item.menu_title} className={`${pathname === item.menu_link ? "menu-active" : "menu-inactive"}`}>
                  <Menu
                    menu_logo={item.menu_logo}
                    menu_title={item.menu_title}
                    category={item.category}
                    menu_link={item.menu_link}
                    menucolor={`${darkMode === "On" ? pathname === item.menu_link ? "red" : "var(--light-secondary-color)" : pathname === item.menu_link ? "#fff" : ""}`}
                  />
                </div>
              )
            })}
          </div>


          {expandMenu && <div style={{
            top: "0px",
            position: "absolute",
            background: "#fff",
            height: "105vh",
            width: "30rem",
            zIndex: "1000",
            borderRight: "1px solid rgba(0,0,0,0.6)",
          }}
          >
            <button onClick={() => setExpandMenu(false)} style={{ background: "#fff", border: "none", boxShadow: "0px 0px 4px rgba(0,0,0,0.5)", height: "30px", width: "30px", margin: "1rem 2rem 1rem auto", borderRadius: "50%", mfontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", color: "red" }}><RxCross2 /></button>

            {menudata.map((item) => {
              return (
                <div key={item.menu_title} className={`${pathname === item.menu_link ? "menu-active" : "menu-inactive"}`} style={{ marginBottom: "2rem" }}>
                  <Link to={`${item.menu_link}`} style={{ color: "#000", textDecoration: "none" }} >
                    <div className="nav1-menu">
                      <div style={{ display: "flex", alignItems: "center", gap: "2rem", width: "80%", fontSize: "1.4rem" }}>
                        <div style={{ color: `${pathname === item.menu_link ? "#fff" : "var(--dark-secondary-color)"}` }}>
                          {item.menu_logo}
                        </div>

                        <h3 style={{ display: "block", color: `${pathname === item.menu_link ? "#fff" : "var(--dark-secondary-color)"}` }}>{item.menu_title}</h3>
                      </div>

                    </div>
                  </Link>
                </div>
              )
            })}

          </div>}

          <div className="nav1menu_settings">
            <div></div>

            <div className='colormode' style={{ marginTop: "2rem" }}>
              <div className="nav1menu_settings_item" style={{ cursor: "pointer", width:"4.5rem"}} onClick={darkHandler}>
                <div style={{ fontSize: "2rem", color: "black", color: check === true ? "black" : "black", background: check === true && "white", height: "100%", width: "100%", borderRadius: "50%", boxShadow: "0px 0px 4px white" }}><FaMoon /></div>
                {/* <p style={{fontSize:"1.2rem", color:"black",color:check === true ? "white" : "black"}}>Dark Mode</p> */}
              </div>

              <div className="nav1menu_settings_item" style={{ cursor: "pointer", width:"4.5rem" }} onClick={lightHandler}>
                <div style={{ fontSize: "2rem", color: check === false ? "white" : "white", background: check === false && "black", height: "3.2rem", width: "3.2rem", borderRadius: "50%" }}><MdOutlineWbSunny /></div>
                {/* <p style={{fontSize:"1.2rem", color:check === false ? "white" : "white"}}>Light Mode</p> */}
              </div>


              {/* <div className="nav1toggle_switch2">
                <label className="nav1toggle_switch">
                  <input type="checkbox"
                    value={check}
                    onClick={colorHandler}
                  />
                  <span
                    className={`nav1slider ${check ? 'checked' : ''}`}
                    style={{
                      background: check ? "#4CBB17" : "",
                      width: "4rem"
                    }}
                  ></span>
                </label>
              </div> */}

            </div>

            {/* <div>
              <div className="nav1menu_settings_item">
                <div><BsMoonStars /></div>
                <p>Dark Mode</p>
              </div>

              <div className="nav1toggle_switch2">
              
                <label className="nav1toggle_switch">
                  <input type="checkbox"
                    value={check}
                    onClick={(e) => setCheck(!check)}
                  />
                  <span className="nav1slider"></span>
                </label>
              </div>

            </div> */}
          </div>
        </div>

      </div>

      <div className={`nav1right ${currentmode && 'nav1right_dark'}`}>
        <div className="nav1right_left_div">
          {/* <p>Dashboard</p>
            <IoIosArrowForward />
            <p>List</p>
            <IoIosArrowForward />
            <b style={{ color: "rgba(0,0,0,0.6)" }}>{title}</b> */}
        </div>

        <div className="nav1right_right_div">

          <div className="nav1search_box">
            <div>
              <CiSearch />
            </div>
            <input type="text" placeholder='Search...' />
          </div>

          <div className="nav1notification" style={{display:"block"}} onClick={() => notifyHandler()}>
            <IoNotificationsOutline />
          </div>

          {/* profile_div */}
          <div className="nav1profile">
            <div className="nav1image">
              {/* <FaUserCircle /> */}

              <div className='ad-profile-image'>
                <img src={
                  setprofilepic
                    ? setprofilepic
                    : LoggedInMiddleware?.user &&
                      LoggedInMiddleware.user[0]?.profile &&
                      LoggedInMiddleware.user[0].profile[0]?.url
                      ? LoggedInMiddleware.user[0].profile[0].url
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                } alt="" />
              </div>


              <div className='ad-profile-image-camera'>
                {/* <button onClick={() => imgDeleteHandler()}><MdDelete /></button> */}
                <button onClick={() => handleEditButtonClick()}><FaCamera /></button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInputChange}
                />
              </div>


            </div>

            <div className="nav1profile_detail">
              <b style={{
                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
              }}>{LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].name}</b>
              <p style={{
                color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
              }}>Barber</p>
            </div>

            <div style={{ cursor: "pointer" }} className="nav1right_dropdown"
              onClick={() => setDropdown(!dropdown)}>
              <MdKeyboardArrowDown style={{ fontSize: "2rem" }} />
            </div>

            {
              dropdown && <div className={`nav1right_dropdown_box ${currentmode && 'nav1right_dropdown_box_dark'}`}>

                <div>
                  <div><RiAccountCircleFill /></div>
                  <p><Link to="/barber/updateprofile" style={{
                    color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)",
                    textDecoration: "none"
                  }}>My Account</Link></p>
                </div>

                <div onClick={logoutHandler}>
                  <div><BiLogOutCircle /></div>
                  <p>Logout</p>
                </div>
              </div>
            }

          </div>
        </div>
      </div>

    </section>
  )
}

export default Header
