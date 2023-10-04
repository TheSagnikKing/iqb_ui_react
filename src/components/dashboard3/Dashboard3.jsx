import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineDateRange, MdOutlineNotificationsNone } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { GrAdd } from "react-icons/gr"
import './Dashboard3.css'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'

import DataTable from 'react-data-table-component';

const CustomerId = ({ customerid }) => {
    return (
        <>
            <div className="customerId">
                <p>CustomerID</p>
                <p>{customerid}</p>
            </div>
        </>
    )
}

const FirstName = ({ firstname }) => {
    return (
        <>
            <div className="firstname">
                <p>First Name</p>
                <p>{firstname}</p>
            </div>
        </>
    )
}

const LastName = ({ lastname }) => {
    return (
        <>
            <div className="lastname">
                <p>Last Name</p>
                <p>{lastname}</p>
            </div>
        </>
    )
}
const Photo = ({ user }) => {
    return (
        <>
            <div>
                <div className="photo_box">
                    <img src={user} alt="" />
                </div>
            </div>
        </>
    )
}

const Calender = ({ calender }) => {
    return (
        <>
            <div className="date">
                <div>
                    <MdOutlineDateRange />
                </div>
                <p>{calender}</p>
            </div>
        </>
    )
}

const Email = ({email}) => {
    return (
        <>
        <div className="email">
            <p>Email id</p>
            <p>{email}</p>
        </div>
        
        </>
    )
}

const SendMail = () => {
    return (
        <>
            <div className="sendMail">
                <div>
                    <AiOutlineMail />
                </div>
                <p>Send Mail</p>
            </div>
        </>
    )
}

const Notification = () => {
    return (
        <>
            <div className="notification">
                <MdOutlineNotificationsNone />
            </div>
        </>
    )
}

const Menu = () => {
    return (
        <>
            <div className="menu">
                <BsThreeDotsVertical />
            </div>
        </>
    )
}


const columns = [
    {
        cell: (row) => <CustomerId customerid={row.CustomerID} />
    },
    {
        cell: (row) => <FirstName firstname={row.FirstName} />
    },
    {
        cell: (row) => <LastName lastname={row.LastName} />
    },
    {
        cell: (row) => <Photo user={row.User} />
    },
    {
        cell: (row) => <Calender calender={row.Date} />,
        selector: row => row.Date,
    },
    {
        cell: (row) => <Email email={row.EmailID} />
    },
    {
        cell: () => <SendMail />
    },
    {
        cell: () => <Notification />
    },
    {
        cell: () => <Menu />
    },

];

const customStyles = {
    headCells: {
        style: {

        }
    },
    cells: {
        style: {
            fontSize: "18px"
        },
    },
};

const Dashboard3 = () => {

    const [filter, setFilter] = useState("")
    const [apidata, setApidata] = useState([])
    const [loader, setLoader] = useState(true);

    // useEffect(() => {
    //     const getApidata = async () => {
    //         const { data } = await axios.get("http://localhost:3004/customer")
    //         setApidata(data)
    //         setLoader(false)
    //     }
    //     getApidata()
    // }, [])

    // console.log(apidata)


    console.log(filter)
    const Tabledata = apidata.filter(
        (item) =>
        item.FirstName.toLowerCase().includes(filter.toLowerCase()) ||
        item.LastName.toLowerCase().includes(filter.toLowerCase()) ||
        item.Date.toLowerCase().includes(filter.toLowerCase())
        ).map((item) => {
        return {
            id: item.id,
            CustomerID: item.CustomerID,
            FirstName: item.FirstName,
            LastName: item.LastName,
            User: item.User,
            Date: item.Date,
            EmailID: item.EmailID,
        };
    })
    
    const addCustomer = () => {
        setLoader(true)
        // router.push("/customer/customerform")
    }
    return (
        <div className="wrapper">
            <div className="header">
                <p>Customer Information</p>

                <div>
                    <div>
                        <input
                            type="text"
                            placeholder='Search'
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                    </div>

                    <div onClick={addCustomer}>
                        <GrAdd />
                    </div>

                    <div>
                        <BsThreeDotsVertical />
                    </div>
                </div>
            </div>
            <div className="table" >
                {
                    loader ? (<ColorRing colors={["rgba(0,0,0,0.6)"]} />) : (<DataTable
                        columns={columns}
                        data={Tabledata}
                        customStyles={customStyles}
                        pagination
                        defaultSortFieldId={5}
                    />)
                }
                
            </div>
        </div>
    );
};

export default Dashboard3

