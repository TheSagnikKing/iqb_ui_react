import React, { useEffect, useRef, useState } from 'react'
import './AdminHeader.css'
import AdminMenu from './AdminMenu'
import { adminmenudata } from '../../../data'
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
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogoutAction } from '../../../../redux/actions/AdminAuthAction'

import api from "../../../../redux/api/Api"
import { applySalonAction } from '../../../../redux/actions/salonAction'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../../../redux/actions/colorAction'
import { darkmodeSelector } from '../../../../redux/reducers/colorReducer'

const AdminHeader = ({ title }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [check, setCheck] = useState(true);

  // const colorHandler = () => {
  //   setCheck((prev) => {
  //     const newCheck = !prev; // Toggle the value
  //     if (newCheck) {
  //       dispatch({ type: DARK_MODE_ON });
  //       localStorage.setItem("dark", "On");
  //     } else {
  //       dispatch({ type: DARK_MODE_OFF });
  //       localStorage.setItem("dark", "Off");
  //     }
  //     return newCheck; // Return the new value for the state
  //   });
  // };


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

  // const colorHandler = () => {
  //   const newCheck = !check; // Toggle the value
  //   setCheck(newCheck);

  //   if (newCheck) {
  //     dispatch({ type: DARK_MODE_ON });
  //   localStorage.setItem("dark", "On");
  //   } else {
  //     dispatch({ type: DARK_MODE_OFF });
  //     localStorage.setItem("dark", "Off");
  //   }
  // };


  // const darkMode = localStorage.getItem("dark")
  const darkMode = useSelector(darkmodeSelector)

  console.log(darkMode)

  useEffect(() => {
    if (localStorage.getItem("dark") === "On") {
      setCheck(true)
    } else {
      setCheck(false)
    }
  }, [])

  console.log("Check refresh ", check)

  const [dropdown, setDropdown] = useState(false)

  const logoutHandler = async () => {
    dispatch(AdminLogoutAction(navigate))
  }

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  const [setprofilepic, Setsetprofilepic] = useState("")

  const fileInputRef = useRef(null);

  const handleEditButtonClick = (publicid, id) => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];
    // console.log(uploadImage)

    const formData = new FormData();

    formData.append('email', LoggedInMiddleware?.user[0]?.email)
    formData.append('profile', uploadImage)

    try {
      const imageResponse = await api.post('/api/admin/uploadAdminProfilePicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload success:', imageResponse.data);
      Setsetprofilepic(imageResponse?.data?.adminImage?.profile[0]?.url)
      alert("Image Uploaded successfully")
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  //================

  const [salonList, setSalonList] = useState([])


  const [chooseSalonId, setChooseSalonId] = useState("");

  const applySalonData = {
    salonId: Number(chooseSalonId),
    adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
  }

  const applySalonHandler = async () => {
    if (Number(chooseSalonId) == 0 || LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId == Number(chooseSalonId)) {

    } else {
      const confirm = window.confirm("Are you sure ?")
      if (confirm) {
        dispatch(applySalonAction(applySalonData))
      }
    }

  }

  const applySalon = useSelector(state => state.applySalon)
  // const { error: applySalonError } = applySalon


  // useEffect(() => {
  //   if (applySalonError) {
  //     toast.error(applySalonError?.message, {
  //       position: "top-right"
  //     });
  //   }

  // }, [applySalonError])

  useEffect(() => {
    if (LoggedInMiddleware?.user) {

      const getSalonfnc = async () => {
        try {
          const { data } = await api.post("/api/admin/getAllSalonsByAdmin", {
            adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
          });
          setSalonList(data?.salons);
        } catch (error) {

        }
      };

      getSalonfnc();

      const getSalonfnc2 = async () => {
        try {
          const { data } = await api.post("/api/admin/getDefaultSalonByAdmin", {
            adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
          });
          setChooseSalonId(Number(data?.response?.salonId));
        } catch (error) {

        }
      };

      getSalonfnc2();
    }

  }, [LoggedInMiddleware?.user]);



  const location = useLocation()
  const { pathname } = location

  const [expandMenu, setExpandMenu] = useState(false)

  // useEffect(() => {
  //   const storedDarkMode = localStorage.getItem("dark");

  //   if(storedDarkMode){
  //     dispatch({type:DARK_MODE_ON})
  //   }
  // }, [dispatch]);

  return (
    <section className="nav1">
      <div className="nav1left" style={{background: darkMode === "On" ? "black" : "white"}}>
        <div className="nav1left_header">
          <span>IQB</span>&nbsp;<span>iqueuebarbers</span>
          {/* <button onClick={() => setExpandMenu(!expandMenu)}>{">"}</button> */}
        </div>

        <div className={darkMode === "On" ? "nav1wrapperdark" : "nav1wrapper"}>

          <div className="nav1left_menu_box">
            <button onClick={() => setExpandMenu(true)} style={{ background: "#fff", border: "none", boxShadow: "0px 0px 4px rgba(0,0,0,0.5)", height: "30px", fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center" }}><RxHamburgerMenu /></button>
            {adminmenudata.map((item) => {
              return (
                <div key={item.menu_title} className={`${pathname === item.menu_link ? "menu-active" : "menu-inactive"}`}>
                  <AdminMenu
                    menu_logo={item.menu_logo}
                    menu_title={item.menu_title}
                    category={item.category}
                    menu_link={item.menu_link}
                    menucolor={`${pathname === item.menu_link ? "#fff" : ""}`}
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

            {adminmenudata.map((item) => {
              return (
                <div key={item.menu_title} className={`${pathname === item.menu_link ? "menu-active" : "menu-inactive"}`} style={{ marginBottom: "2rem" }}>
                  <Link to={`${item.menu_link}`} style={{ color: "#000", textDecoration: "none" }} >
                    <div className="nav1-menu">
                      <div style={{ display: "flex", alignItems: "center", gap: "2rem", width: "80%", fontSize: "1.4rem" }}>
                        <div style={{ color: `${pathname === item.menu_link ? "#fff" : ""}` }}>
                          {item.menu_logo}
                        </div>

                        <h3 style={{ display: "block", color: `${pathname === item.menu_link ? "#fff" : ""}` }}>{item.menu_title}</h3>
                      </div>

                    </div>
                  </Link>
                </div>
              )
            })}

          </div>}

          <div className="nav1menu_settings">
            <div style={{ borderBottom: "1px solid #f5f5f5" }}>
              {/* <div className="menu_settings_item}>
                <div><FiSettings /></div>
                <p>Settings</p>
              </div> */}

            </div>

            <div className='colormode'>
              <div className="nav1menu_settings_item" style={{cursor:"pointer"}} onClick={darkHandler}>
                <div style={{fontSize:"2rem",color:"black",color:check === true ? "black" : "black",background:check === true && "white",height:"3.2rem",width:"3.2rem",borderRadius:"50%",boxShadow:"0px 0px 4px white"}}><FaMoon /></div>
                {/* <p style={{fontSize:"1.2rem", color:"black",color:check === true ? "white" : "black"}}>Dark Mode</p> */}
              </div>
              
              <div className="nav1menu_settings_item" style={{cursor:"pointer"}} onClick={lightHandler}>
                <div style={{fontSize:"2rem", color:check === false ? "white" : "white",background:check === false && "black",height:"3.2rem",width:"3.2rem",borderRadius:"50%"}}><MdOutlineWbSunny /></div>
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
          </div>
        </div>

      </div>

      <div className="nav1right">
        <div className="nav1right_left_div">
          {/* <p>Dashboard</p>
            <IoIosArrowForward />
            <p>List</p>
            <IoIosArrowForward /> */}
          <b style={{ color: "rgba(0,0,0,0.6)" }}>{title}</b>

        </div>

        <div className="nav1right_right_div">

          <div style={{
            display: "flex",
            gap: "1rem"
          }}>
            <h2 for="cars" style={{ fontSize: "1.2rem" }}>Choose Salon</h2>

            <select
              name="cars"
              id="cars"
              value={chooseSalonId}
              onChange={(e) => setChooseSalonId(e.target.value)}
              style={{ fontSize: "1rem" }}
            >
              {salonList?.map((s, i) => (
                <option value={s.salonId} key={i} style={{
                  backgroundColor: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId === s.salonId ? "green" : "",
                  color: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId === s.salonId ? "#fff" : "black"
                }}>
                  {s.salonName}
                </option>
              ))}
            </select>

            {
              applySalon?.loading == true ? <button style={{
                height: "2.5rem",
                width: "6rem",
                background: "#f1f6fc",
                boxShadow: "0px 0px 4px rgba(0,0,0,0.3)",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
                fontWeight: "500"
              }}>Loading</button> : <button onClick={applySalonHandler} style={{
                height: "2.5rem",
                width: "6rem",
                background: "#f1f6fc",
                boxShadow: "0px 0px 4px rgba(0,0,0,0.3)",
                cursor: "pointer",
                borderRadius: "5px",
                border: "none",
                marginRight: "1rem",
                fontSize: "1rem"
              }}>Apply</button>
            }

          </div>

          <div className="nav1search_box">
            <div>
              <CiSearch />
            </div>

            <input type="text" placeholder='Search...' />
          </div>

          <div className="nav1notification">
            <IoNotificationsOutline />
          </div>

          {/* profile_div */}
          <div className="nav1profile">
            <div className="nav1image">
              {/* <FaUserCircle />dsvdsv */}
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
              <b>{LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].name}</b>
              <p>Admin</p>
            </div>

            <div style={{ cursor: "pointer", fontSize: "2.4rem" }} className="nav1right_dropdown"
              onClick={() => setDropdown(!dropdown)}>
              <MdKeyboardArrowDown />
            </div>

            {
              dropdown && <div className="nav1right_dropdown_box">
                <div>
                  <div><RiAccountCircleFill /></div>
                  <Link to="/admin/updateprofile" style={{ fontSize: "2rem", textDecoration: "none" }}>My Account</Link>
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

    </section >
  )
}

export default AdminHeader


