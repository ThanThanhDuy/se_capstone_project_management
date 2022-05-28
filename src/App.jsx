import './App.css'
import AdminLayout from './components/layouts/admin'
import Login from './pages/login/Login'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/capstone-team" element={<AdminLayout />} />
        <Route path="/capstone-council" element={<AdminLayout />} />
      </Routes>
    </div>
  )
}

export default App
