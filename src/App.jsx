import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import {Container} from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const loading = useSelector(state => state.loading)



  return (
    <div className="App">
      <HashRouter>
        <MyNavBar/>
        { loading && <LoadingScreen/>}
        <Container className='mt-5'>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/products/:id' element={<ProductDetail/>} />
          <Route element={<ProtectedRoutes/>}>  
          <Route path='/purchases' element={<Purchases/>} />
          </Route>
        </Routes>
        </Container>
      </HashRouter>
    </div>
  )
}

export default App
