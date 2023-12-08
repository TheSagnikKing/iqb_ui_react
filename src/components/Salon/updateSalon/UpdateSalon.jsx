import React, { useEffect, useState } from 'react'
import "./UpdateSalon.css"
import { MdKeyboardArrowDown } from "react-icons/md"
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updateSalonAction } from '../../../redux/actions/salonAction'
import { useLocation, useParams } from 'react-router-dom'
import AdminLayout from '../../layout/Admin/AdminLayout'
import axios from 'axios'
import { getSharedSalonData } from './salonId'


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

    const [adminEmail, setAdminEmail] = useState("")
    const [userName, setUsername] = useState("")
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

    const dispatch = useDispatch()

    const submitHandler = () => {
        const salonData = {
            adminEmail, userName, salonName, address, city, location: {
                type: "Point",
                coordinates: {
                    longitude: Number(longitude),
                    latitude: Number(latitude)
                }
            }, country, postCode, contactTel, salonType, webLink, services, salonId: 11
        }


        dispatch(updateSalonAction(salonData))

        setAdminEmail("")
        setUsername("")
        setSalonName("")
        setAddress("")
        setCity("")
        setLongitude(0)
        setLatitude(0)
        setCountry("")
        setPostCode("")
        setContactTel("")
        setSalonType("")
        setWebLink("")
        setServices([])
        setServiceName("")
        setServiceDesc("")
        setServicePrice("")
        alert("Salon created Successfully")
    }


    const addServiceHandler = () => {
        setServices(prevServices => [...prevServices, {
            serviceName, serviceDesc, servicePrice
        }]);
        setServiceName("")
        setServiceDesc("")
        setServicePrice("")
        console.log(services);
    }

    const serviceEditHandler = (ind) => {

        const currentService = services[ind];

        setServiceName(currentService.serviceName)
        setServiceDesc(currentService.serviceDesc)
        setServicePrice(currentService.servicePrice)


        const updatedServices = [...services];
        updatedServices.splice(ind, 1);

        setServices(updatedServices);
    }


    const locationstate = useLocation()
    const currentSalonId = locationstate?.state?.salonId

    useEffect(() => {
        const fetchAllSalons = async () => {
            const { data } = await axios.get(`https://iqb-backend2.onrender.com/api/salon/getSalonInfoBySalonId?salonId=${currentSalonId}`)

            setAdminEmail(data?.response?.salonInfo?.adminEmail)
            setUsername(data?.response?.salonInfo?.userName)
            setSalonName(data?.response?.salonInfo?.salonName)
            setAddress(data?.response?.salonInfo?.address)
            setCity(data?.response?.salonInfo?.city)

            setCountry(data?.response?.salonInfo?.country)
            setPostCode(data?.response?.salonInfo?.postcode)
            setContactTel(data?.response?.salonInfo?.contactTel)
            // setSalonType(data?.response?.salonInfo?.adminEmail)
            setWebLink(data?.response?.salonInfo?.webLink)
            setPostCode(data?.response?.salonInfo?.postCode)

        }

        fetchAllSalons()
    }, [])


    const [salontypeDropdown, setSalontypeDropdown] = useState(false)

    const handleSalonTypeClick = (selectedSalonType) => {
        setSalonType(selectedSalonType);
        setSalontypeDropdown(false); // Close the dropdown after selecting a salon type
    };


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
                            <label htmlFor="">Admin Email</label>
                            <input
                                type="text"
                                value={adminEmail}
                                onChange={(e) => setAdminEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="">User Name</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
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
                            <div>
                                <label htmlFor="">Salon Type</label>
                                <button onClick={() => setSalontypeDropdown((prev) => !prev)}>dropdown</button>
                            </div>

                            {
                                salontypeDropdown && <div>
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
                            <input type="file" multiple />

                        </div>

                        <div className='services'>
                            <label className='serv-title'>Add Your Services</label>

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

                                </div>
                            ))}
                        </div>

                        <div className="sa-br-btn_box">
                            <button onClick={submitHandler}>
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateSalon