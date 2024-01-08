import React, { useEffect, useRef, useState } from 'react'
import './AdminHeader.css'
import AdminMenu from './AdminMenu'
import { adminmenudata } from '../../../data'
import { FiSettings } from 'react-icons/fi'
import { BsMoonStars } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'
import { CiSearch } from "react-icons/ci"
import { IoNotificationsOutline } from "react-icons/io5"
import { FaCamera, FaUserCircle } from "react-icons/fa"
import { MdKeyboardArrowDown } from "react-icons/md"
import { BiLogOutCircle } from "react-icons/bi"
import { RiAccountCircleFill } from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../../redux/actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogoutAction } from '../../../../redux/actions/AdminAuthAction'

import api from "../../../../redux/api/Api"

const AdminHeader = ({ title }) => {

  const [check, setCheck] = useState(false)

  const [dropdown, setDropdown] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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
    console.log(uploadImage)

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



  return (
    <>
      <section className="nav1">
        <div className="nav1left">
          <div className="nav1left_header">
            <p><span>IQB</span>iqueuebarberss</p>
          </div>

          <div className="nav1wrapper">

            <div className="nav1left_menu_box">
              {adminmenudata.map((item) => {
                return (
                  <div key={item.menu_title}>
                    <AdminMenu
                      menu_logo={item.menu_logo}
                      menu_title={item.menu_title}
                      category={item.category}
                      menu_link={item.menu_link}
                    />
                  </div>
                )
              })}
            </div>

            <div className="nav1menu_settings">
              <div style={{ borderBottom: "1px solid #f5f5f5" }}>
                {/* <div className="menu_settings_item}>
                <div><FiSettings /></div>
                <p>Settings</p>
              </div> */}

              </div>

              <div>
                <div className="nav1menu_settings_item">
                  <div><BsMoonStars /></div>
                  <p>Dark Mode</p>
                </div>

                <div className="nav1toggle_switch2">
                  {/* TOGGLE_SWITCH_CODE */}
                  <label className="nav1toggle_switch">
                    <input type="checkbox"
                      value={check}
                      onClick={(e) => setCheck(!check)}
                    />
                    <span className="nav1slider"></span>
                  </label>
                </div>

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

              <div style={{ cursor: "pointer" }} className="nav1right_dropdown"
                onClick={() => setDropdown(!dropdown)}>
                <MdKeyboardArrowDown />
              </div>

              {
                dropdown && <div className="nav1right_dropdown_box">
                  <div>
                    <div><FiSettings /></div>
                    <p>Settings</p>
                  </div>

                  <div>
                    <div><RiAccountCircleFill /></div>
                    <Link to="/admin/updateprofile">My Account</Link>
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
    </>
  )
}

export default AdminHeader


