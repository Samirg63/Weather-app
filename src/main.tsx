
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
import Auth from './pages/Auth'

let headers = new Headers();
headers.append('Access-Control-Allow-Origin', '*')


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className='flex h-full'>

      <Navigation/>
      <div className='w-full h-full overflow-y-hidden'>
        <Header/>
        <Container>
          <div></div> 
          <Routes>
              <Route path="/" index element={<Home/>}/>
              <Route path="/pins" element={<Pins/>}/>
              <Route path={'/auth'} element={<Auth />}/>
              <Route path={'/:key'} element={<Home />}/>
          </Routes>
        </Container>
      </div>
    </div>
  </BrowserRouter>
)
