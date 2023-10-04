import React from 'react'
import './Chart.css'
import { ResponsiveContainer,LineChart,Line} from 'recharts'
import { data } from '../data'

const Chart = () => {
  return (
    <>
     <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default Chart