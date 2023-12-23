import React, { useEffect, useRef, useState } from 'react'
import "./Advertisement.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../redux/api/Api"
import { getAllAdvertisementAction } from '../../redux/actions/AdvertisementAction';

const Advertisement = () => {

  const fileInputRef = useRef(null);

  const handleEditButtonClick = () => {
    fileInputRef.current.click();
  };


  const handleFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];
    console.log(uploadImage)

    // const formData = new FormData();

    // formData.append('email', LoggedInMiddleware?.user[0]?.email)
    // formData.append('profile', uploadImage)

    // try {
    //   const imageResponse = await api.post('/api/admin/uploadAdminProfilePicture', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   console.log('Upload success:', imageResponse.data);
    //   Setsetprofilepic(imageResponse?.data?.adminImage?.profile[0]?.url)
    //   alert("Image Uploaded successfully")
    // } catch (error) {
    //   console.error('Image upload failed:', error);
    // }
  };


  const [selectedFiles, setSelectedFiles] = useState(null);

  console.log(selectedFiles)

  const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

  console.log(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId)

  const uploadImageHandler = async () => {
    if (selectedFiles != null) {
      const formData = new FormData();

      const SalonId = Number(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId)
      formData.append('salonId', SalonId);

      for (const file of selectedFiles) {
        formData.append('advertisements', file);
      }

      try {
        const imageResponse = await api.post('/api/advertisement/addAdvertisements', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Upload success:', imageResponse.data);
        setSelectedFiles(null);
        alert("Image uploaded Successfully")
      } catch (error) {
        console.error('Image upload failed:', error);
        // Handle error as needed
      }
    }
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllAdvertisementAction(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId))
  },[LoggedInMiddleware?.user])

  return (
    <>
      <AdminLayout />
      <div className="sa-br-right_main_div">
        <div className='advertisement-header'>
          <p>Advertisement</p>
          <div>
            <input
              type='file'
              multiple onChange={(e) => setSelectedFiles(e.target.files)}
            />

            <button onClick={uploadImageHandler}>Upload Image</button>
          </div>
        </div>

        <div className='advertisement-container'>
          <div>
            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" alt="" />
            <div>
              <button onClick={() => handleEditButtonClick()}><MdEdit /></button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
              <button><MdDelete /></button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Advertisement