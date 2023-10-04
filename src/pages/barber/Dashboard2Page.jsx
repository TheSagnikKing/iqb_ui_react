import React from 'react'
import BarberListTable from "../../components/dashboard2/barberlistTable/BarberListTable"
import Layout from '../../components/layout/Layout'

const dashboard2 = () => {
  return (
    <>
    <Layout title="Barber"/>

    {/* <BarberList/> */}
    <BarberListTable/>

    </>
  )
}

export default dashboard2