import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Hello = () => {

    const [newData, setNewData] = useState([])


    useEffect(() => {
        const abc = async() => {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/comments")
            setNewData(data)
        }

        abc()
    },[])
  return (
    <>
    <h1>Comments</h1>

    {
        newData?.map((d) => (
            <div key={d.id}> 
                <p>{d.email}</p>
            </div>
        ))
    }
    </>
  )
}

export default Hello