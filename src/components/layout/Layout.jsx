import React from 'react'
import Header from './header/Header'

const Layout = ({children,title}) => {
  return (
    <>
    <Header title={title}/>
    <main>{children}</main>
    </>
  )
}

export default Layout