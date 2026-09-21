import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
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
          <Route path='/projects/TENTF-devlog' element={ <Projects page={'TENTF'}/> } />
          <Route path='/projects/YASBot-devlog' element={ <Projects page={'YASBot'}/> } />
          
          <Route path='*' element={ <NotFound/> } />
      </Routes>
    </div>
  )
}
