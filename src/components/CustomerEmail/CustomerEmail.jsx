import React, { useEffect, useState } from 'react'
import "./CustomerEmail.css"
import AdminLayout from '../layout/Admin/AdminLayout'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { customeremailAction } from '../../redux/actions/CustomerAction'
import api from "../../redux/api/Api"

const CustomerEmail = () => {

    const location = useLocation();

    const customerEmail = location?.state

    console.log(customerEmail)

    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [text, setText] = useState("")

    useEffect(() => {
        if (customerEmail) {
            setEmail(customerEmail)
        }
    }, [customerEmail])

    const dispatch = useDispatch()

    const submitHandler = async() => {
        const customerData = {
            email,
            subject,
            text
        }

        dispatch(customeremailAction(customerData))

    }
    return (
        <>
            <AdminLayout />
            <div className="cu-br-right_main_div-1">
                <h3>Customer Email</h3>
                <div className='cu-container-mail'>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Text</label>
                        <textarea id="w3review" name="w3review" rows="4" cols="50"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        >
                            Text
                        </textarea>
                    </div>

                    <button onClick={submitHandler}>Send</button>
                </div>
            </div>
        </>
    )
}

export default CustomerEmail