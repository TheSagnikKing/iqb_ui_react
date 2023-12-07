import React from 'react'
import BarberListTable from "../../components/dashboard2/barberlistTable/BarberListTable"
import AdminLayout from '../../components/layout/Admin/AdminLayout'

const dashboard2 = () => {
  return (
    <>
    <AdminLayout title="Barber"/>
    <BarberListTable/>
    </>
  )
}

export default dashboard2