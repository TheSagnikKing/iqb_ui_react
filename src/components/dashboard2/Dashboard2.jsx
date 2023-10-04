import React from 'react'
import './Dashboard2.css'
import { MdKeyboardArrowDown } from "react-icons/md"

const Dashboard2 = () => {

  return (
    <>
          <div className="br-right_main_div">

            <div className="br-right_main_head">
              <p>Crud</p>
            </div>

            <div className="br-right_main_form">
              <div className="br-left">
                <div>
                  <label htmlFor="">Barber ID</label>
                  <input type="text" />
                </div>

                <div>
                  <label htmlFor="">Salon ID</label>
                  <input type="text" />
                </div>

                <div>
                  <label htmlFor="">First Name</label>
                  <input type="text" />
                </div>

                <div>
                  <label htmlFor="">Last Name</label>
                  <input type="text" />
                </div>

                <div>
                  <label htmlFor="">Nick Name</label>
                  <input type="text" />
                </div>

                <div>
                  <label htmlFor="">Employee ID</label>
                  <input type="text" />
                </div>
              </div>

              <div className="br-right">

                <div>
                  <label htmlFor="">Email ID</label>
                  <input type="email" />
                </div>

                <div className="br-salonid">
                  <label htmlFor="">Salon ID</label>
                  <div className="br-saloninput">
                    <input type="text" placeholder='List'/>
                  
                  <div>
                    <MdKeyboardArrowDown/>
                  </div>
                  </div>
                </div>


                <div className="br-btn_box">
                  <button>
                    Submit
                  </button>

                  <button>
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          </div>
    </>
  )
}

export default Dashboard2