import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Consultation from './pages/Consultation'
import MealPlan from './pages/MealPlan'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/mealplan" element={<MealPlan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App