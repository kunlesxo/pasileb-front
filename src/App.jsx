import {  Routes, Route } from 'react-router-dom';

import Navbar from './componets/Navbar'
import ProductPage from './pages/DetailedCart'
import './App.css'
import CakesData from './pages/Cake'
import CakeOrderForm from './pages/ProductDetails';
import Home from './pages/Home';
import AuthForm from './pages/Auth';

function App() {

  return (
   <div>
    <Navbar/>
     <Routes>
          <Route path="" element={<Home/>} />

          <Route path="/cart" element={<ProductPage />} />
          <Route path="/cakes" element={<CakesData/>}/>
          <Route path="/details" element={<CakeOrderForm/>}/>
          <Route path="/auth" element={<AuthForm/>}/>


        </Routes>
   </div>
  )
}

export default App
