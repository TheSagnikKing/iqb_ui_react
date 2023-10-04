import React from 'react'
import './CustomerForm.css'
import { MdKeyboardArrowDown } from "react-icons/md"

const CustomerForm = () => {
  return (
    <>
    <div className="cs-right_main_div">

      <div className="cs-right_main_head">
        <p>Crud</p>
      </div>

      <div className="cs-right_main_form">
        <div className="cs-left">
          <div>
            <label htmlFor="">Customer ID</label>
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
          
        </div>

        <div className="cs-right">

          <div>
            <label htmlFor="">Email ID</label>
            <input type="email" />
          </div>

          <div className="cs-salonid">
            <label htmlFor="">Salon ID</label>
            <div className="cs-saloninput">
              <input type="text" placeholder='List'/>
            
            <div>
              <MdKeyboardArrowDown/>
            </div>
            </div>
          </div>


          <div className="cs-btn_box">
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

export default CustomerForm