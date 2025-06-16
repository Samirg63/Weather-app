
import './app.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router'

//layout components
import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'

//components
import Container from './components/Container'

//Pages
import Home from './pages/Home'
import Pins from './pages/Pins'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className='flex'>

      <Navigation/>
      <div className='w-full'>
        <Header/>
        <Container> 
          <Routes>
              <Route index path="/" element={<Home/>}/>
              <Route path="/pins" element={<Pins/>}/>
          </Routes>
        </Container>
      </div>
    </div>
  </BrowserRouter>
)
