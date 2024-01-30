import React, { useEffect, useRef, useState } from 'react'
import "./UpdateSalon.css"
import { MdKeyboardArrowDown } from "react-icons/md"
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updateSalonAction } from '../../../redux/actions/salonAction'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AdminLayout from '../../layout/Admin/AdminLayout'
import axios from 'axios'
import { getSharedSalonData } from './salonId'

import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import api from "../../../redux/api/Api"
import Modal from '../../Modal/Modal'
import { FaArrowDown } from 'react-icons/fa'

const UpdateSalon = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setError("You denied access to your geolocation. Please enable it in your browser settings.");
                    } else {
                        setError("Error accessing geolocation: " + error.message);
                    }
                }
            );
        } else {
            setError("Geolocation is not available in your browser.");
        }
    }, []);

    // ==========================================

    const [salonEmail, setSalonEmail] = useState("")
    const [salonName, setSalonName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [location] = useState({
        type: "Point",
        coordinates: {
            longitude: Number(longitude),
            latitude: Number(latitude)
        }
    })

    const [country, setCountry] = useState("")
    const [postCode, setPostCode] = useState("")
    const [contactTel, setContactTel] = useState("")
    const [salonType, setSalonType] = useState("")
    const [webLink, setWebLink] = useState("")
    const [services, setServices] = useState([])

    const [serviceName, setServiceName] = useState("")
    const [serviceDesc, setServiceDesc] = useState("")
    const [servicePrice, setServicePrice] = useState("")
    const [serviceEWT, setServiceEWT] = useState(null)
    const [serviceId, setServiceId] = useState(null)

    const dispatch = useDispatch()

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const adminSalonId = LoggedInMiddleware.user && LoggedInMiddleware.user[0].salonId

    const navigate = useNavigate()

    const submitHandler = () => {
        const salonData = {
            adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].email, salonName, salonEmail, address, city, location: {
                type: "Point",
                coordinates: {
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                }
                //salonId
            }, country, postCode, contactTel, salonType, webLink, services, salonId: adminSalonId
        }
        console.log(salonData)
        dispatch(updateSalonAction(salonData, navigate))

        // setSalonName("")
        // setAddress("")
        // setCity("")
        // setLongitude(0)
        // setLatitude(0)
        // setCountry("")
        // setPostCode("")
        // setContactTel("")
        // setSalonType("")
        // setWebLink("")
        // setServices([])
        // setServiceName("")
        // setServiceDesc("")
        // setServicePrice("")
        // setSalonEmail("")

    }


    const addServiceHandler = () => {

        setServices(prevServices => [...prevServices, {
            serviceName, serviceDesc, servicePrice, serviceEWT, serviceId
        }]);
        setServiceName("")
        setServiceDesc("")
        setServicePrice("")
        setServiceEWT(0)
        setServiceId(0)
        console.log(services);
    }

    const serviceEditHandler = (ind) => {

        const currentService = services[ind];

        setServiceName(currentService.serviceName)
        setServiceDesc(currentService.serviceDesc)
        setServicePrice(currentService.servicePrice)
        setServiceEWT(currentService.serviceEWT)
        setServiceId(currentService.serviceId)

        const updatedServices = [...services];
        updatedServices.splice(ind, 1);

        setServices(updatedServices);
    }


    const currentSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId

    const [fetchimages, setFetchImages] = useState([])

    useEffect(() => {
        const fetchAllSalons = async () => {
            const { data } = await api.get(`/api/salon/getSalonInfoBySalonId?salonId=${currentSalonId}`)

            console.log("update", data)

            if (data?.response?.salonInfo) {
                setFetchImages(data?.response?.salonInfo?.profile)
                setSalonEmail(data?.response?.salonInfo?.salonEmail)
                setSalonName(data?.response?.salonInfo?.salonName)
                setAddress(data?.response?.salonInfo?.address)
                setCity(data?.response?.salonInfo?.city)

                setCountry(data?.response?.salonInfo?.country)
                setPostCode(data?.response?.salonInfo?.postcode)
                setContactTel(data?.response?.salonInfo?.contactTel)
                // setSalonType(data?.response?.salonInfo?.adminEmail)
                setWebLink(data?.response?.salonInfo?.webLink)
                setPostCode(data?.response?.salonInfo?.postCode)
                setServices(data?.response?.salonInfo?.services)
            }

        }

        fetchAllSalons()
    }, [currentSalonId])


    const geolocHandler = () => {
        alert("Go to settings to enable your location")
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setError("You denied access to your geolocation. Please enable it in your browser settings.");
                    } else {
                        setError("Error accessing geolocation: " + error.message);
                    }
                }
            );
        } else {
            setError("Geolocation is not available in your browser.");
        }
    }



    const [salontypeDropdown, setSalontypeDropdown] = useState(false)

    const handleSalonTypeClick = (selectedSalonType) => {
        setSalonType(selectedSalonType);
        setSalontypeDropdown(false); // Close the dropdown after selecting a salon type
    };


    const imgDeleteHandler = async (publicid, id) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await api.delete("/api/salon/deleteSalonImages", {
                    data: {
                        public_id: publicid,
                        img_id: id
                    }
                })

                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }


    const fileInputRef = useRef(null);

    const [public_imgid, setPublic_imgid] = useState("")
    const [mongoid, setMongoid] = useState("")

    const handleEditButtonClick = (publicid, id) => {
        fileInputRef.current.click();
        setPublic_imgid(publicid)
        setMongoid(id)
    };

    const handleFileInputChange = async (e) => {
        const updateImage = e.target.files[0];

        const formData = new FormData();

        formData.append('public_imgid', public_imgid);
        formData.append('id', mongoid)
        formData.append('profile', updateImage)


        try {
            const imageResponse = await api.put('/api/salon/updateSalonImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Upload success:', imageResponse.data);
            window.location.reload()
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    //for adding more salon images

    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const updateSalon = useSelector(state => state.updateSalon)
    const { response } = updateSalon

    useEffect(() => {
        if (response?.salonId) {
            const uploadImageHandler = async () => {
                if (selectedFiles != null) {
                    const formData = new FormData();

                    const SalonId = response?.salonId;
                    formData.append('salonId', SalonId);

                    for (const file of selectedFiles) {
                        formData.append('profile', file);
                    }

                    try {
                        const imageResponse = await api.post('/api/salon/uploadMoreImages', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        console.log('Upload success:', imageResponse.data);
                        // setImages(imageResponse.data?.StudentImage?.profile);
                        setSelectedFiles(null);
                        alert("Image uploaded Successfully")
                    } catch (error) {
                        console.error('Image upload failed:', error);
                        // Handle error as needed
                    }
                }
            };

            uploadImageHandler();
        }
    }, [response?.salonId]);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AdminLayout />
            <div className="sa-br-right_main_div">

                <div className="sa-br-right_main_head">
                    <p>Crud</p>
                </div>

                <div className="sa-br-right_main_form">
                    <div className="sa-br-left">
                        <div>
                            <label htmlFor="">Salon Email</label>
                            <input
                                type="text"
                                value={salonEmail}
                                onChange={(e) => setSalonEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Salon Name</label>
                            <input
                                type="text"
                                value={salonName}
                                onChange={(e) => setSalonName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">latitude</label>
                            <input
                                type="number"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">longitude</label>
                            <input
                                type="number"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </div>

                        <button onClick={geolocHandler} className='geo-sal'>Get Geolocation</button>

                        <div>
                            <label htmlFor="">Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Postal Code</label>
                            <input
                                type="text"
                                value={postCode}
                                onChange={(e) => setPostCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Contact Tel</label>
                            <input
                                type="text"
                                value={contactTel}
                                onChange={(e) => setContactTel(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="sa-br-right">

                        <div>
                            <div style={{display:"flex"}}>
                                <label htmlFor="">Salon Type</label>
                                <button onClick={() => setSalontypeDropdown((prev) => !prev)} className='sal-drop-type'><FaArrowDown /></button>
                            </div>

                            {
                                salontypeDropdown && <div className='sal-drop-type-p'>
                                    <p onClick={() => handleSalonTypeClick('Salon Type 1')}>Salon Type 1</p>
                                    <p onClick={() => handleSalonTypeClick('Salon Type 2')}>Salon Type 2</p>
                                    <p onClick={() => handleSalonTypeClick('Salon Type 3')}>Salon Type 3</p>
                                </div>
                            }
                            <input
                                type="text"
                                value={salonType}
                                onChange={(e) => setSalonType(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Web Link</label>
                            <input
                                type="text"
                                value={webLink}
                                onChange={(e) => setWebLink(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Select Salon Images</label>
                            {/* <input type="file" multiple onChange={handleFileChange} />
                            <label htmlFor="file" className='file'>
                                Choose a Photo
                            </label> */}
                            <input type="file" multiple onChange={handleFileChange} />


                        </div>

                        <div className='img-container'>
                            <button onClick={() => setIsOpen(true)} className='sal-up-seeimage'>See Images</button>
                            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                                <div className='see-salonImages'>

                                    {
                                        fetchimages?.map((img,i) => (
                                            <div key={i}>
                                                <img src={img.url} alt="" />
                                                <div style={{display:"flex"}}>
                                                    <button onClick={() => imgDeleteHandler(img.public_id, img._id)} className='sl-del'><MdDelete /></button>
                                                    <button onClick={() => handleEditButtonClick(img.public_id, img._id)} className='sl-ed'><MdModeEditOutline /></button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileInputChange}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div></Modal>


                        </div>

                        <div className='services'>
                            <label className='serv-title' style={{ marginTop: "2rem" }}>Add Your Services</label>

                            <div>
                                <label htmlFor="">Service Name</label>
                                <input
                                    type="text"
                                    value={serviceName}
                                    onChange={(e) => setServiceName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Service Desc</label>
                                <input
                                    type="text"
                                    value={serviceDesc}
                                    onChange={(e) => setServiceDesc(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Service Price</label>
                                <input
                                    type="text"
                                    value={servicePrice}
                                    onChange={(e) => setServicePrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="">Estimated Waiting Time(mins)</label>
                                <input
                                    type="text"
                                    value={serviceEWT}
                                    onChange={(e) => setServiceEWT(e.target.value)}
                                />
                            </div>

                            <button onClick={addServiceHandler}>Add Service</button>

                        </div>

                        <div className='services-data'>
                            {services.map((service, index) => (
                                <div key={index} className='ser-table' onClick={() => serviceEditHandler(index)}>
                                    <div>
                                        <label>Service Name</label>
                                        <label>{service.serviceName}</label>
                                    </div>

                                    <div>
                                        <label>Service Des</label>
                                        <label>{service.serviceDesc}</label>
                                    </div>

                                    <div>
                                        <label>Service Price</label>
                                        <label>{service.servicePrice}</label>
                                    </div>

                                    <div>
                                        <label>Estimated Wait Time(mins)</label>
                                        <label>{service.serviceEWT}</label>
                                    </div>


                                </div>
                            ))}
                        </div>

                        <div className="sa-br-btn_box">
                            <button onClick={submitHandler}>
                                {updateSalon?.loading == true ? <h2>Loading...</h2> : "update"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateSalon