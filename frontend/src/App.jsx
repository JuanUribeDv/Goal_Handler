import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FocusModeProvider } from "./contexts/FocusModeContext";
import { FocusModeWidget } from "./components/FocusMode";
import Goals from './Pages/Goals'
import Dashboard from './Pages/Dashboard'
import Journal from './Pages/Journal'
import Sidebar from './components/Sidebar'
import Galery from './Pages/Galery'
import Daily_tasks from './Pages/Daily_tasks'
import './styles/index.css'


function App() {
  return (
    <FocusModeProvider>
      <Router>
        <FocusModeWidget />
        <div className='menu'>
          <Sidebar />
          <Routes>
            <Route path="/Goals" element={<Goals />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Journal" element={<Journal />} />
            <Route path="/Galery" element={<Galery />} />
            <Route path="/Daily_tasks" element={<Daily_tasks />} />
          </Routes>
        </div>
      </Router>
    </FocusModeProvider>
  )
}

export default App
