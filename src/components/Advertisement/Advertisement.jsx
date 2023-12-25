import React, { useEffect, useRef, useState } from 'react'
import "./Advertisement.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../redux/api/Api"

const Advertisement = () => {

  const fileInputRef = useRef(null);

  const [publicid, setPublicId] = useState("")
  const [mongoid, setMongoid] = useState("")

  const handleEditButtonClick = (publicId, mongoid) => {
    fileInputRef.current.click();
    setPublicId(publicId)
    setMongoid(mongoid)
  };

  console.log(publicid)
  console.log(mongoid)

  const handleFileInputChange = async (e) => {
    const uploadImage = e.target.files[0];
    console.log(uploadImage)

    const formData = new FormData();

    formData.append('id', mongoid)
    formData.append('advertisements', uploadImage)
    formData.append('public_imgid', publicid)

    try {
      const imageResponse = await api.put('/api/advertisement/updateAdvertisements', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('update success:', imageResponse.data);
      alert("Image Update successfully")
      setPublicId("")
      setMongoid("")
      window.location.reload()
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleDeleteButtonClick = async (publicid, id) => {
    try {
      console.log(publicid)
      console.log(id)
      await api.delete("/api/advertisement/deleteAdvertisements", {
        data:{
          public_id: publicid,
          img_id: id
        }
      })
      alert("Image deleted Successfully")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }


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

  const [advertisementList, setAdvertisementList] = useState([])

  useEffect(() => {
    const getAdvertisementData = async () => {
      const { data } = await api.post(`/api/advertisement/getAdvertisements`, { salonId: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId });

      console.log("adver", data)
      setAdvertisementList(data?.advertisements)
    }

    getAdvertisementData()
  }, [LoggedInMiddleware?.user])


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

          {
            advertisementList ? (advertisementList?.map((a, i) => (
              <div key={i}>
                <img src={a.url} alt="" />
                <div>
                  <button onClick={() => handleEditButtonClick(a.public_id, a._id)}><MdEdit /></button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                  />
                  <button onClick={() => handleDeleteButtonClick(a.public_id, a._id)}><MdDelete /></button>
                </div>
              </div>
            ))) : (<p>No Images</p>)
          }


        </div>
      </div>
    </>
  )
}

export default Advertisement