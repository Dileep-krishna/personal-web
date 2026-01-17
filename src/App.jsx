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
import AdminProtectedRoute from './admin/pages/AdminProtectedRoute'

import PageNotFound from './components/pageNotFound'
import Education from './components/Education'
import AdminResumeController from './admin/pages/AdminResumeController'
import Resume from './components/Resume'

function App() {
  return (
    <div>
      {/* user routes */}
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/project' element={<Project />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/education' element={<Education/>} />
        <Route path='/resume' element={<Resume/>} />
     
        <Route path="*" element={<PageNotFound />} />


        {/* 🔐 Admin Protected Routes */}
        <Route
          path='/admin-home'
          element={
            <AdminProtectedRoute>
              <AdminHome />
            </AdminProtectedRoute>
          }
        />

        <Route
          path='/admin-project'
          element={
            <AdminProtectedRoute>
              <AdminProjectManagement />
            </AdminProtectedRoute>
          }
        />

        <Route
          path='/admin-profile'
          element={
            <AdminProtectedRoute>
              <AdminProfileMangent />
            </AdminProtectedRoute>
          }
        />

        <Route
          path='/admin-skill'
          element={
            <AdminProtectedRoute>
              <AdminSkillManagement />
            </AdminProtectedRoute>
          }
        />
           <Route
          path='/admin-resume'
          element={
            <AdminProtectedRoute>
              <AdminResumeController />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
