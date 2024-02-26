import React from 'react'
import "./Cell.css"
import { useSelector } from 'react-redux'

const Cell = ({ className, children, onClick, isActive }) => {

  const darkMode = useSelector(state => state.color.darkmode)

  console.log("Darkmode dashboard", darkMode)

  const currentmode = darkMode === "On"

  return (
    <div
      style={{ color: currentmode ? "var(--light-secondary-color)" : "var(--dark-secondary-color)" }}
      onClick={!isActive ? onClick : undefined}
      className={`${className} ${isActive ? "active-cell" : "cells"}`}
    >{children}</div>
  )
}

export default Cell

