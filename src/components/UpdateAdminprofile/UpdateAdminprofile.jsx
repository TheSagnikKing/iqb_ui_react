import React, { useRef, useState } from 'react'
import "./UpdateAdminprofile.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdminAction } from '../../redux/actions/AdminAuthAction'
import { MdDelete } from 'react-icons/md'
import { FaCamera } from "react-icons/fa";

import api from "../../redux/api/Api"

const UpdateAdminprofile = () => {

    const [username, setUsername] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDob] = useState("")

    const dispatch = useDispatch()

    const submitHandler = () => {
        const profiledata = {
            email: "arghyahimanstech@gmail.com",
            salonId: 3,
            username,
            mobileNumber,
            name,
            gender
        }

        dispatch(updateAdminAction(profiledata))
    }


    const [setprofilepic, Setsetprofilepic] = useState("")

    const fileInputRef = useRef(null);

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

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


    // console.log(LoggedInMiddleware?.user[0]?.profile[0]?.url)

    return (
        <>
            <AdminLayout />
            <div className="wrapper">

                <div className="sa-br-right_main_head">
                    <p>Crud</p>
                </div>

                <div className="sa-br-right_main_form">

                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="">Salon Id</label>
                        <input
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="">User Name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Mobile Number</label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Gender</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>

                    <div className='admin-profile'>
                        <img
                            src={
                                setprofilepic
                                    ? setprofilepic
                                    : LoggedInMiddleware?.user &&
                                        LoggedInMiddleware.user[0]?.profile &&
                                        LoggedInMiddleware.user[0].profile[0]?.url
                                        ? LoggedInMiddleware.user[0].profile[0].url
                                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            alt=""
                        />
                        <div>
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

                    <div className="sa-br-btn_box">
                        <button onClick={submitHandler}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateAdminprofile