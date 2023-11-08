import React from 'react'
import AdminHeader from './Adminheader/AdminHeader'


const AdminLayout = ({children,title}) => {
  return (
    <>
    <AdminHeader title={title}/>
    <main>{children}</main>
    </>
  )
}

export default AdminLayout