import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Drones } from './pages/Drones'

export const PageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/projects' element={ <Projects/> } />
        <Route path='/drones' element={ <Drones/> } />
    </Routes>
  )
}
