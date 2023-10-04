import CustomerForm from "../../components/dashboard3/customerform/CustomerForm"
import React from 'react'
import Layout from "../../components/layout/Layout"

const CustomerformPage = () => {
  return (
   <>
   <Layout title="CustomerInformation">
    <CustomerForm/>
   </Layout>
   </>
  )
}

export default CustomerformPage