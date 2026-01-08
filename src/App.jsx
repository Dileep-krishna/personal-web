import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Project from './components/Project'
import Login from './components/Login'
import Home from './components/Home'
import AdminHome from './admin/pages/AdminHome'
import AdminProjectManagement from './admin/pages/AdminProjectManagement'
import AdminProfileMangent from './admin/pages/AdminProfileMangent'
import AdminSkillManagement from './admin/pages/AdminSkillManagement'

function App() {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Profile/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>

      {/* Admin */}
   <Route path='/admin-home' element={<AdminHome/>}/>
   <Route path='/admin-project' element={<AdminProjectManagement/>}/>
   <Route path='/admin-profile' element={<AdminProfileMangent/>}/>
   <Route path='/admin-skill' element={<AdminSkillManagement/>}/>

     </Routes>
    </div>
  )
}

export default App
