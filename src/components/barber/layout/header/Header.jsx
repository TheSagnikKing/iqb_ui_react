import React, { useState } from 'react'
import './Header.css'
import Menu from './Menu2.jsx'
import { barbermenudata } from '../../data'
import { FiSettings } from 'react-icons/fi'
import { BsMoonStars } from 'react-icons/bs'
import { IoIosArrowForward } from 'react-icons/io'
import { CiSearch } from "react-icons/ci"
import { IoNotificationsOutline } from "react-icons/io5"
import { FaUserCircle } from "react-icons/fa"
import { MdKeyboardArrowDown } from "react-icons/md"
import { BiLogOutCircle } from "react-icons/bi"
import { RiAccountCircleFill } from "react-icons/ri"


const Header = ({ title }) => {

  const [check, setCheck] = useState(false)

  const [dropdown, setDropdown] = useState(false)

  return (
    <>
      <section className="nav1">
        <div className="nav1left">
          <div className="nav1left_header">
            <p><span>IGB</span>iqueuebarbers</p>
          </div>

          <div className="nav1wrapper">

            <div className="nav1left_menu_box">
              {barbermenudata.map((item) => {
                return (
                  <div key={item.menu_title}>
                    <Menu
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
            <p>Dashboard</p>
            <IoIosArrowForward />
            <p>List</p>
            <IoIosArrowForward />
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
                <FaUserCircle />
              </div>

              <div className="nav1profile_detail">
                <b>Kunal Jasuja</b>
                <p>Owner</p>
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
                    <div><RiAccountCircleFill/></div>
                    <p>My Account</p>
                  </div>

                  <div>
                    <div><BiLogOutCircle /></div>
                    <p>Logout</p>
                  </div>
                </div>
              }

            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Header
