import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='product/:id' element={<ProductDetail></ProductDetail>}></Route>
        <Route path="/add-product" element={<AddProduct />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
