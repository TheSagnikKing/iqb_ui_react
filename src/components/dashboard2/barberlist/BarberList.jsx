import React, { useEffect, useState } from 'react'
import './BarberList.css'
import { TbSortAscending } from "react-icons/tb"
import { FiFilter } from "react-icons/fi"
import { GrAdd } from "react-icons/gr"
import { BsThreeDotsVertical } from "react-icons/bs"
import BarberItem from '@/components/barberItem/BarberItem'

import { ColorRing } from 'react-loader-spinner'


const BarberList = () => {

  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
        setLoader2(false)
    },3000)

    return () => clearInterval(timeout)
  },[])

  const addCustomer = () => {
    setLoader(true)
    // router.push("/barber/barberform")
  }
  return (
    <>
      {loader ? (<div className="loader">
        <ColorRing
          colors={['rgba(0,0,0,0.6)']}
        />
      </div>) : (<div className="right_main_div">

        <div className="right_main_head">
          <p>Barber Information</p>

          <div className="btn_box">

            <div>
              <TbSortAscending />
              <p>Sort: Date Created</p>
            </div>

            <div>
              <FiFilter />
              <p>Filter</p>
            </div>

            <div onClick={addCustomer}>
              <GrAdd />
            </div>

            <div>
              <BsThreeDotsVertical />
            </div>
          </div>
        </div>

        <div className="right_main_content">

          {
            loader2 ? (<div className="loader2">
              <ColorRing
                colors={['rgba(0,0,0,0.6)']}
              />
            </div>) : (<div><BarberItem />
            <BarberItem />
            <BarberItem />
            <BarberItem />
  
            <BarberItem />
            <BarberItem />
  
            <BarberItem />
            <BarberItem />
  
            <BarberItem />
            <BarberItem />
            <BarberItem />
            <BarberItem /></div>)
          }
        </div>
      </div>)}


    </>
  )
}

export default BarberList