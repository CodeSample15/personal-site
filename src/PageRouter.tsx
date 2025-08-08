import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { Drones } from './pages/Drones'
import { NotFound } from './pages/NotFound';
import { Resume } from './pages/Resume';

export const PageRouter = () => {
  return (
    <div className="pt-3">
      <Routes>
          <Route path='/' element={ <Home/> } />
          <Route path='/resume' element={ <Resume/> }/>
          <Route path='/projects' element={ <Projects/> } />
          <Route path='/projects/Squiggly' element={ <Projects page={'Squiggly'}/> } />
          <Route path='/projects/bluetooth-led-controller' element={ <Projects/> } />
          <Route path='/projects/keras-code-generator' element={ <Projects page={'Keras-Code-Generator'}/> } />
          <Route path='/drones' element={ <Drones/> } />
          <Route path='*' element={ <NotFound/> } />
      </Routes>
    </div>
  )
}
