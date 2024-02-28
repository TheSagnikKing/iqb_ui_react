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


import { getAllSalonIconAction } from '../../../redux/actions/salonAction'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [fbLink, setFbLink] = useState("")
    const [twitterLink, setTwitterLink] = useState("")
    const [instraLink, setInstraLink] = useState("")


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

    const currentEditlocation = useLocation()
    const currentEditSalonId = currentEditlocation?.state?.salonId

    const addServiceHandler = () => {

        // if (serviceName.trim() === '' || serviceDesc.trim() === '' || servicePrice.trim() === '' || serviceEWT.trim() === '') {
        //     // You can handle the case when any of the fields is empty (e.g., show an error message)
        //     alert("Please fill all the fields")
        //     return;
        // }

        if (!serviceName || !serviceDesc || !servicePrice || !serviceEWT) {
            alert("Please fill all the field")
            return;
        }

        setServices(prevServices => [...prevServices, {
            serviceName, serviceDesc, servicePrice, serviceEWT, serviceId, serviceIcon: {
                public_id: currentPublicId,
                url: currentImg
            }
        }]);
        setServiceName("")
        setServiceDesc("")
        setServicePrice("")
        setServiceEWT(0)
        setServiceId(0)
        setCurrentImg("")
        setCurrentPublicId("")
        setServiceDrop(false)
        console.log(services);
    }

    const serviceEditHandler = (ind) => {

        const currentService = services[ind];

        setServiceName(currentService.serviceName)
        setServiceDesc(currentService.serviceDesc)
        setServicePrice(currentService.servicePrice)
        setServiceEWT(currentService.serviceEWT)
        setServiceId(currentService.serviceId)
        setCurrentImg(currentService.serviceIcon.url)
        setCurrentPublicId(currentService.serviceIcon.public_id)

        const updatedServices = [...services];
        updatedServices.splice(ind, 1);

        setServices(updatedServices);
    }


    const currentSalonId = LoggedInMiddleware?.user && LoggedInMiddleware.user[0].salonId



    const [fetchimages, setFetchImages] = useState([])

    const getSalonInfoBySalonIdRef = useRef(null);

    useEffect(() => {

        if (getSalonInfoBySalonIdRef.current) {
            getSalonInfoBySalonIdRef.current.abort(); // Abort previous request if it exists
        }

        const newController = new AbortController();
        getSalonInfoBySalonIdRef.current = newController;

        const signal = newController.signal;

        const getSalonInfoBySalonId = async () => {
            try {
                const { data } = await api.get(`/api/salon/getSalonInfoBySalonId?salonId=${Number(currentEditSalonId)}`, { signal });

                console.log("update", data);

                if (data?.response?.salonInfo) {
                    setFetchImages(data?.response?.salonInfo?.gallery)
                    setSalonEmail(data?.response?.salonInfo?.salonEmail)
                    setSalonName(data?.response?.salonInfo?.salonName)
                    setAddress(data?.response?.salonInfo?.address)
                    setCity(data?.response?.salonInfo?.city)

                    setCountry(data?.response?.salonInfo?.country)
                    setPostCode(data?.response?.salonInfo?.postcode)
                    setContactTel(data?.response?.salonInfo?.contactTel)
                    // setSalonType(data?.response?.salonInfo?.adminEmail)
                    setWebLink(data?.response?.salonInfo?.webLink)
                    setFbLink(data?.response?.salonInfo?.fbLink)
                    setInstraLink(data?.response?.salonInfo?.instraLink)
                    setTwitterLink(data?.response?.salonInfo?.twitterLink)

                    setPostCode(data?.response?.salonInfo?.postCode)
                    setServices(data?.response?.salonInfo?.services)
                    setCurrentSalonLogo(data?.response?.salonInfo?.salonLogo[0]?.url)
                    setCurrentSalonLogoId(data?.response?.salonInfo?.salonLogo[0]?.public_id)
                    setCurrentSalonLogoMongoId(data?.response?.salonInfo?.salonLogo[0]?._id)
                    setSalonType(data?.response?.salonInfo?.salonType)
                }
            } catch (error) {
                if (error.name === 'AbortError' || error.code === 'ECONNABORTED') {
                    console.log("Request Canceled");
                } else {
                    console.log(error);
                }
            }
        };

        getSalonInfoBySalonId();

        return () => {
            getSalonInfoBySalonIdRef.current.abort();
        };
    }, [currentSalonId]);



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
        formData.append('gallery', updateImage)


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


    const [selectedLogo, setSelectedLogo] = useState(null)
    const [logoImage, setLogoImages] = useState([])

    const handleLogoChange = (e) => {
        setSelectedLogo(e.target.files[0])
    }


    useEffect(() => {
        if (response?.salonId) {
            const uploadImageHandler = async () => {
                if (selectedFiles != null) {
                    const formData = new FormData();

                    const SalonId = Number(currentEditSalonId);

                    if (SalonId) {
                        formData.append('salonId', SalonId);

                        for (const file of selectedFiles) {
                            formData.append('gallery', file);
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
                }
            };

            uploadImageHandler();
        }


        //For Salon Logo
        if (response?.salonId) {
            const uploadImageHandler = async () => {
                if (selectedLogo != null) {
                    const formData = new FormData();

                    const SalonId = response?.salonId;

                    if (SalonId) {
                        formData.append('salonId', SalonId);
                        formData.append('salonLogo', selectedLogo);

                        try {
                            const imageResponse = await api.post('/api/salon/uploadSalonLogo', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                            });

                            console.log('Upload success:', imageResponse.data);
                            // setLogoImages(imageResponse.data?.StudentImage?.profile);
                            // setSelectedLogo(null);
                            alert("Salon Logo uploaded Successfully")
                        } catch (error) {
                            console.error('Image upload failed:', error);
                            // Handle error as needed
                        }
                    }

                }
            };

            uploadImageHandler();
        }
    }, [response?.salonId]);

    const [isOpen, setIsOpen] = useState(false);


    //Salon Logo 

    const [currentSalonLogo, setCurrentSalonLogo] = useState("");
    const [currentSalonLogoId, setCurrentSalonLogoId] = useState("");
    const [currentSalonLogoMongoId, setCurrentSalonLogoMongoId] = useState("")

    const fileLogoInputRef = useRef(null);

    const handleLogoEditButtonClick = () => {
        fileLogoInputRef.current.click();
    };


    const handleLogoFileInputChange = async (e) => {
        const updateImage = e.target.files[0];

        const formData = new FormData();

        formData.append('public_imgid', currentSalonLogoId);
        formData.append('id', currentSalonLogoMongoId)
        formData.append('salonLogo', updateImage)
        formData.append('salonId', currentEditSalonId)


        try {
            const imageResponse = await api.put('/api/salon/updateSalonLogo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Salon Logo Upload success:', imageResponse.data);
            window.location.reload()
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };


    const imgLogoDeleteHandler = async () => {
        if (window.confirm("Are you sure you want to delete this Logo?")) {
            try {
                await api.delete("/api/salon/deleteSalonLogo", {
                    data: {
                        public_id: currentSalonLogoId,
                        img_id: currentSalonLogoMongoId,
                        salonId: currentEditSalonId
                    }
                })

                window.location.reload()
            } catch (error) {
                console.log(error)
            }
        }
    }


    const [serviceDrop, setServiceDrop] = useState(false)

    const getAllSalonIcon = useSelector(state => state.getAllSalonIcon)

    const [currentImg, setCurrentImg] = useState("")
    const [currentPublicId, setCurrentPublicId] = useState("")

    useEffect(() => {
        dispatch(getAllSalonIconAction())
    }, [])


    const serviceIconHandler = (s) => {
        setCurrentImg(s.url)
        setCurrentPublicId(s.public_id)
        setServiceDrop(false)
    }



    const submitHandler = () => {
        const salonData = {
            adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].email, salonName, salonEmail, address, city, location: {
                type: "Point",
                coordinates: {
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                }
                //salonId
            }, country, postCode, contactTel, salonType, webLink, fbLink, instraLink, twitterLink, services, salonId: Number(currentEditSalonId)
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

    const darkMode = useSelector(state => state.color.darkmode)

    console.log("Darkmode dashboard", darkMode)

    return (
        <>
            <AdminLayout />
            <div className={`sa-br-right_main_div ${darkMode === "On" ? "sa-br-right_main_div_dark" : ""}`}>

                <div className="sa-br-right_main_head">
                    <h1 
                    style={{color:darkMode === "On" ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}
                    >Update</h1>
                </div>

                <div className={`sa-br-right_main_form ${darkMode === "On" ? "sa-br-right_main_form_dark" : ""}`}>
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

                        <button onClick={geolocHandler} className={`geo-sal ${darkMode === "On" ? "geo-sal_dark" : ""}`}>Get Geolocation</button>

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

                        <div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <label htmlFor="">Salon Type</label>
                                <button onClick={() => setSalontypeDropdown((prev) => !prev)} className='sal-drop-type'><FaArrowDown style={{ fontSize: "1.2rem" }} /></button>
                            </div>

                            {
                                salontypeDropdown && <div className={`sal-drop-type-p ${darkMode === "On" && 'sal-drop-type-p_dark'}`}>
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
                            <label htmlFor="">Facebook Link</label>
                            <input
                                type="text"
                                value={fbLink}
                                onChange={(e) => setFbLink(e.target.value)}
                            />
                        </div>


                    </div>

                    <div className="sa-br-right">

                        <div>
                            <label htmlFor="">Instagram Link</label>
                            <input
                                type="text"
                                value={instraLink}
                                onChange={(e) => setInstraLink(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">Twitter Link</label>
                            <input
                                type="text"
                                value={twitterLink}
                                onChange={(e) => setTwitterLink(e.target.value)}
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
                            <button onClick={() => setIsOpen(true)} className={`sal-up-seeimage ${darkMode === "On" && 'sal-up-seeimage_dark'}`}>See Images</button>
                            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                                <div className='see-salonImages'>

                                    {
                                        fetchimages?.map((img, i) => (
                                            <div key={i}>
                                                <img src={img.url} alt="" />
                                                <div style={{ display: "flex" }}>
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

                        <div>
                            <label htmlFor="">Select Salon Logo</label>

                            <input type="file" onChange={handleLogoChange} />

                        </div>

                        <div>
                            <div style={{ border: "1px solid gray", width: "5.5rem", height: "5.5rem" }}>
                                <img src={`${currentSalonLogo ? currentSalonLogo : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}`} alt="Salon Logo" style={{ width: "100%", height: "100%" }} />
                            </div>

                            <div style={{ display: "flex", gap: "1rem" }}>
                                {currentSalonLogo && <><button className='sl-del' onClick={() => imgLogoDeleteHandler()}><MdDelete /></button>
                                    <button className='sl-ed' onClick={() => handleLogoEditButtonClick()}><MdModeEditOutline /></button>
                                    <input
                                        type="file"
                                        ref={fileLogoInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleLogoFileInputChange}
                                    /></>}
                            </div>
                        </div>



                        <div className='services'>
                            <label className='serv-title' style={{ marginTop: "2rem" }}>Add Your Services</label>

                            <div>
                                <div className='service-icon'>
                                    <p style={{color:darkMode === "On" ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"}}>Service Icon</p>
                                    <div onClick={() => setServiceDrop(!serviceDrop)}
                                        style={{ cursor: "pointer", background: "#fff", boxShadow: "0px 0px 4px rgba(0,0,0,0.4)", height: "2.5rem", width: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%",
                                        color:darkMode === "On" ? "var(--dark-secondary-color)" : "var(--light-secondary-color)"
                                        }}><FaArrowDown style={{color:"var(--dark-secondary-color)"}}/></div>
                                </div>

                                {
                                    serviceDrop && <div className={`service-icon-content ${darkMode === "On" ? "service-icon-content_dark" : ""}`}>{
                                        // getAllSalonIcon?.response
                                        <div>
                                            {
                                                getAllSalonIcon?.response ? (
                                                    getAllSalonIcon.response.map((s) => (
                                                        <div key={s.id} className='service-icon-content-img' onClick={() => serviceIconHandler(s)}>
                                                            <img src={`${s.url}`} alt="s1" />
                                                        </div>
                                                    ))
                                                ) : (
                                                    <h2>No Service Icon Present</h2>
                                                )
                                            }
                                        </div>

                                    }</div>
                                }

                                {
                                    currentImg && <div className='selected-serrvice-icon'>
                                        <div><img src={`${currentImg}`} alt="" /></div>
                                    </div>
                                }

                            </div>

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

                            <button onClick={addServiceHandler}
                            style={{
                                background:darkMode === "On" ? "var(--dark-primary-color)" : "var(--light-tertiary-color)",
                                color: darkMode === "On" ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}
                            >Add Service</button>

                        </div>

                        <div className={`services-data ${darkMode === "On" ? "services-data_dark" : ""}`}>
                            {services.map((service, index) => (
                                <div key={index} className={`ser-table ${darkMode === "On" ? "ser-table_dark" : ""}`} onClick={() => serviceEditHandler(index)}>



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

                                    <div>
                                        <img src={service.serviceIcon?.url} alt="sc" />
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="sa-br-btn_box">
                            <button onClick={submitHandler}
                            style={{
                                background: darkMode === "On" ? "var(--dark-primary-color)" : "var(--light-tertiary-color)",
                                color: darkMode === "On" ? "var(--light-secondary-color)" : "var(--dark-secondary-color)"
                            }}
                            >
                                {updateSalon?.loading == true ? <h2>Loading...</h2> : "update"}
                            </button>
                        </div>

                    </div>
                </div>

                <ToastContainer />
            </div>
        </>
    )
}

export default UpdateSalon