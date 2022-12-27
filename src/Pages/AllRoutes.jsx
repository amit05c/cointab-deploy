import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import UserDetails from './UserDetails'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/users' element={<UserDetails/>}/>
    </Routes>
  )
}

export default AllRoutes