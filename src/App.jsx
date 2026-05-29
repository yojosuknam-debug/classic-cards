import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import CardDetail from './pages/CardDetail'
import Store from './pages/Store'
import MyNotes from './pages/MyNotes'
import Settings from './pages/Settings'
import Diagnosis from './pages/Diagnosis'
import FilteredCards from './pages/FilteredCards'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 font-sans flex justify-center">
      <div className="relative w-full max-w-md min-h-screen">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/card/:id" element={<CardDetail />} />
            <Route path="/store" element={<Store />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/filter/:tag" element={<FilteredCards />} />
            <Route path="/notes" element={<MyNotes />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
