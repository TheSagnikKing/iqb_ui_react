import React, { useEffect, useState } from 'react'
import "./SalonList.css"
import { useSelector } from 'react-redux'
import Layout from '../../layout/Layout'
import { GrAdd } from 'react-icons/gr'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'

const SalonList = () => {
    const signin = useSelector(state => state.signin)
    const { user } = signin

    const [search,setSearch] = useState("")
    const [salonList,setSalonList] = useState([])
    const [loading,setLoading] = useState(false)

    const searchHandler = async() => {
        if(search === ""){

        }else{
            setLoading(true)
            const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/salon/getAllSalonsByAdminEmail?adminEmail=${search}`)
            setSalonList(data)
            setLoading(false)
        }  
    }

    console.log(salonList)
    
  return (
    <>
    {
        user?.isAdmin ? (<>
        <Layout/>
        <div className="wrapper">
                <div className="header">
                    <p>Salons List</p>

                    <div>
                        <div className='salon-input'>
                            <input
                                type="text"
                                placeholder='Search By Admin Email'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button onClick={searchHandler}><AiOutlineSearch/></button>
                        </div>

                        <div >
                            <GrAdd />
                        </div>
                    </div>
                </div>

                {/* Table  */}
                <div className='table'>
                 {
                    loading ? <div className='salon-puff-loader-box'><PuffLoader/></div> : salonList && salonList.response ? salonList.response.map((salon,index) => (
                        <div key={index} className='salon-item'>
                            <div>
                                <p>Salon ID</p>
                                <p>{salon.salonId}</p>
                            </div>

                            <div>
                                <p>Salon Code</p>
                                <p>{salon.salonCode}</p>
                            </div>

                            <div>
                                <p>Salon Name</p>
                                <p>{salon.salonName}</p>
                            </div>

                            <div>
                                <p>Admin Email</p>
                                <p>{salon.adminEmail}</p>
                            </div>

                            <div>
                                <p>Address</p>
                                <p>{salon.address}</p>
                            </div>

                            <div>
                                <p>City</p>
                                <p>{salon.city}</p>
                            </div>

                        </div>
                    )) : <p className='salon-search'>Search Your Salons</p>
                 }
                </div>

            </div>
        </>) : (<h1>Only Admins can access this page</h1>)
    }
    </>
  )
}

export default SalonList