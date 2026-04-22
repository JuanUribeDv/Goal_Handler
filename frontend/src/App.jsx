import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Goals from './Pages/Goals'
import Dashboard from './Pages/Dashboard'
import Journal from './Pages/Journal'
import Sidebar from './components/Sidebar'
import Galery from './Pages/Galery'
import Focus_mode from './Pages/Focus_mode'
import './styles/index.css'


function App() {
  return (
    <Router>
      <div className='menu'>
        <Sidebar />
        <Routes>
          <Route path="/Goals" element={<Goals />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/Journal" element={<Journal />} />
          <Route path="/Galery" element={<Galery />} />
          <Route path="/Focus_mode" element={<Focus_mode />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
