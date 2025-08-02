import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Drones } from './pages/Drones'
import { NotFound } from './pages/NotFound';

export const PageRouter = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home/> } />

        <Route path='/projects' element={ <Projects/> } />
        <Route path='/projects/squiggly' element={ <Projects/> } />
        <Route path='/projects/bluetooth-led-controller' element={ <Projects/> } />
        <Route path='/projects/keras-code-generator' element={ <Projects/> } />

        <Route path='/drones' element={ <Drones/> } />
        <Route path='*' element={ <NotFound/> } />
    </Routes>
  )
}
