import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Checker from './pages/Checker'
import Tracker from './pages/Tracker'
import Hospitals from './pages/Hospitals'
import Emergency from './pages/Emergency'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-amber-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checker" element={<Checker />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/emergency" element={<Emergency />} />
        </Routes>
      </div>
    </Router>
  )
}