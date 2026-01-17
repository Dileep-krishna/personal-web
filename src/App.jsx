import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Profile from './components/Profile'
import Project from './components/Project'
import Login from './components/Login'
import Home from './components/Home'
import Education from './components/Education'
import Resume from './components/Resume'
import PageNotFound from './components/pageNotFound'

import AdminHome from './admin/pages/AdminHome'
import AdminProjectManagement from './admin/pages/AdminProjectManagement'
import AdminProfileMangent from './admin/pages/AdminProfileMangent'
import AdminSkillManagement from './admin/pages/AdminSkillManagement'
import AdminResumeController from './admin/pages/AdminResumeController'
import AdminProtectedRoute from './admin/pages/AdminProtectedRoute'
import AdminCretificate from './admin/pages/AdminCertificate'
import Certificate from './components/Certificate'

function App() {
  return (
    <Routes>
      {/* 👤 User Routes */}
      <Route path='/' element={<Profile />} />
      <Route path='/home' element={<Home />} />
      <Route path='/project' element={<Project />} />
      <Route path='/education' element={<Education />} />
      <Route path='/resume' element={<Resume />} />
      <Route path='/login' element={<Login />} />
      <Route path='/certificate' element={<Certificate/>} />

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
          <Route
        path='/admin-certificate'
        element={
          <AdminProtectedRoute>
            <AdminCretificate />
          </AdminProtectedRoute>
        }
      />

      {/* ❌ 404 — ALWAYS LAST */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default App
