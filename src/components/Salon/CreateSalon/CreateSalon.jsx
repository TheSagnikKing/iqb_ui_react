import React, { useEffect, useState } from 'react'
import "./CreateSalon.css"
import { MdKeyboardArrowDown } from "react-icons/md"
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { createSalonAction, getAllSalonIconAction } from '../../../redux/actions/salonAction'
import AdminLayout from '../../layout/Admin/AdminLayout'
import api from "../../../redux/api/Api"
import { useNavigate } from 'react-router-dom'
import { FaArrowDown } from "react-icons/fa6";

const CreateSalon = () => {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    const [image, setImage] = useState("")

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
    // const [userName, setUsername] = useState("")
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

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [chooseIntervalTime, setChooseIntervalTime] = useState(1)

    const dispatch = useDispatch()

    //post images to both db and cloud
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [images, setImages] = useState([])

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const [selectedLogo, setSelectedLogo] = useState(null)
    const [logoImage, setLogoImages] = useState([])

    const handleLogoChange = (e) => {
        setSelectedLogo(e.target.files[0])
    }

    console.log(selectedLogo)

    const createSalon = useSelector(state => state.createSalon)
    const { response } = createSalon


    useEffect(() => {
        if (response?.salonId) {
            const uploadImageHandler = async () => {
                if (selectedFiles != null) {
                    const formData = new FormData();

                    const SalonId = response?.salonId;
                    formData.append('salonId', SalonId);

                    for (const file of selectedFiles) {
                        formData.append('gallery', file);
                    }

                    try {
                        const imageResponse = await api.post('/api/salon/uploadSalonImage', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });

                        console.log('Upload success:', imageResponse.data);
                        setImages(imageResponse.data?.StudentImage?.profile);
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

        //For Salon Logo
        if (response?.salonId) {
            const uploadImageHandler = async () => {
                if (selectedLogo != null) {
                    const formData = new FormData();

                    const SalonId = response?.salonId;

                    if(SalonId){
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

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const navigate = useNavigate()

    const submitHandler = async () => {
        const salonData = {
            //Ai admin emailer value loggin theke asbe
            adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware.user[0].email
            , salonEmail, salonName, address, city, location: {
                type: "Point",
                coordinates: {
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                }
            }, country, postCode, contactTel, salonType, webLink, services, image, appointmentSettings: { startTime, endTime, intervalInMinutes: Number(chooseIntervalTime) }
        }

        console.log(salonData)

        dispatch(createSalonAction(salonData, navigate))

    }

    const addServiceHandler = () => {

        if (serviceName.trim() === '' || serviceDesc.trim() === '' || servicePrice.trim() === '' || serviceEWT.trim() === '') {
            // You can handle the case when any of the fields is empty (e.g., show an error message)
            alert("Please fill all the fields")
            return;
        }

        setServices(prevServices => [...prevServices, {
            serviceName, serviceDesc, servicePrice, serviceEWT, serviceIcon : {
                public_id : currentPublicId,
                url: currentImg
            }
        }]);
        setServiceName("")
        setServiceDesc("")
        setServicePrice("")
        setServiceEWT(0)
        setCurrentImg("")
        setCurrentPublicId("")
        setServiceDrop(false)
    }

    console.log("3333333", services)

    const serviceEditHandler = (ind) => {

        const currentService = services[ind];
        console.log(currentService)

        setServiceName(currentService.serviceName)
        setServiceDesc(currentService.serviceDesc)
        setServicePrice(currentService.servicePrice)
        setServiceEWT(currentService.serviceEWT)
        setCurrentImg(currentService.serviceIcon.url)
        setCurrentPublicId(currentService.serviceIcon.public_id)

        const updatedServices = [...services];
        updatedServices.splice(ind, 1);

        setServices(updatedServices);
    }

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

    const [timeOptions, setTimeOptions] = useState([]);

    // Function to add leading zero for single-digit hours and minutes
    const addLeadingZero = (num) => (num < 10 ? '0' : '') + num;

    // Function to generate time options
    const generateTimeOptions = () => {
        const options = [];

        // Loop through hours (0 to 23)
        for (let hour = 0; hour < 24; hour++) {
            // Loop through minutes (0 and 30)
            for (let minute = 0; minute < 60; minute += 30) {
                // Format the time as HH:mm
                const time = addLeadingZero(hour) + ':' + addLeadingZero(minute);
                options.push({ value: time, label: time });
            }
        }

        setTimeOptions(options);
    };

    // Call the function to generate time options when the component mounts

    useEffect(() => {
        generateTimeOptions();
        dispatch(getAllSalonIconAction())
    }, []);

    const [intervalTimemin, setIntervalTimemin] = useState([])

    const generateTimeIntervalInMinutes = () => {
        const options = []
        for (let i = 1; i <= 60; i++) {
            options.push(i);
        }

        setIntervalTimemin(options)
    }

    useEffect(() => {
        generateTimeIntervalInMinutes()
    }, [])


    const [serviceDrop, setServiceDrop] = useState(false)

    const getAllSalonIcon = useSelector(state => state.getAllSalonIcon)

    const [currentImg, setCurrentImg] = useState("")
    const [currentPublicId, setCurrentPublicId] = useState("")

    const serviceIconHandler = (s) => {
        setCurrentImg(s.url)
        setCurrentPublicId(s.public_id)
    } 

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

                        <h2>Appointment Settings</h2>

                        <div>
                            <label for="cars">Start Time:</label>
                            <select name="startTime" id="startTime" style={{
                                height: "35px",
                                borderRadius: "5px",
                                paddingInline: "10px",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "16px"
                            }}
                                onChange={(e) => setStartTime(e.target.value)}
                                value={startTime}
                            >
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label for="cars">End Time:</label>
                            <select name="endTime" id="endTime" style={{
                                height: "35px",
                                borderRadius: "5px",
                                paddingInline: "10px",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "16px"
                            }} onChange={(e) => setEndTime(e.target.value)}
                                value={endTime}>
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">Interval Time</label>

                            <select name="endTime" id="endTime" style={{
                                height: "35px",
                                borderRadius: "5px",
                                paddingInline: "10px",
                                border: "none",
                                backgroundColor: "#f1f6fc",
                                fontSize: "16px"
                            }} onChange={(e) => setChooseIntervalTime(e.target.value)}
                                value={chooseIntervalTime}>
                                {intervalTimemin.map((option) => (
                                    <option key={option} value={option}>
                                        {option} mins
                                    </option>
                                ))}
                            </select>
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
                            <div style={{ display: "flex" }}>
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
                            />
                        </div>


                    </div>

                    <div className="sa-br-right">

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
                            />
                        </div>

                        <div>
                            <label htmlFor="">Instagram Link</label>
                            <input
                                type="text"
                            />
                        </div>

                        <div>
                            <label htmlFor="">Twitter Link</label>
                            <input
                                type="text"
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


                        <div>
                            <label htmlFor="">Select Salon Logo</label>

                            <input type="file" onChange={handleLogoChange} />
                        </div>



                        <div className='services'>
                            <label className='serv-title'>Add Your Services</label>

                            <div>
                                <div className='service-icon'>
                                    <p>Service Icon</p>
                                    <div onClick={() => setServiceDrop(!serviceDrop)}
                                        style={{ cursor: "pointer", background: "#fff", boxShadow: "0px 0px 4px rgba(0,0,0,0.4)", height: "2.5rem", width: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}><FaArrowDown /></div>
                                </div>

                                {
                                    serviceDrop && <div className='service-icon-content'>{
                                        // getAllSalonIcon?.response
                                        <div>
                                            {
                                                getAllSalonIcon?.response ? (
                                                    getAllSalonIcon.response.map((s) => (
                                                        <div key={s.id} className='service-icon-content-img' onClick={() =>  serviceIconHandler(s) }>
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
                                    currentImg  && <div className='selected-serrvice-icon'>
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
                                <label htmlFor="">Estimated Waiting Time (mins)</label>
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
                                        <label>Estimated Wait Time(ms)</label>
                                        <label>{service.serviceEWT}</label>
                                    </div>


                                    <div>
                                        <img src={service.serviceIcon.url} alt="sc" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="sa-br-btn_box">
                            <button onClick={submitHandler}>
                                {createSalon?.loading == true ? <h3>Loading</h3> : "Submit"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateSalon