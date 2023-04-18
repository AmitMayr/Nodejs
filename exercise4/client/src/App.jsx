import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/index';
import About from './pages/about';
import GetAllStore from './pages/getAllStore';
import GetStoreById from './pages/getStoreByID';
import GetProductByNames from './pages/getProductByNames';
import PostAddStore from './pages/postAddStore';
import PostAddProductToStoreById from './pages/postAddProductToStoreById';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/store">store</Link>
          <Link to="/store/get_store_by_id">get store by id</Link>
          <Link to="/store/get_product_by_names">get product by names</Link>
          <Link to="/store/add">add store</Link>
          <Link to="/store/add_product">add product</Link>

          </div>
        </header>

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/store' element={<GetAllStore />} />
            <Route path='/store/get_store_by_id' element={<GetStoreById />} />
            <Route path='/store/get_product_by_names' element={<GetProductByNames />} />
            <Route path='/store/add' element={<PostAddStore />} />
            <Route path='/store/add_product' element={<PostAddProductToStoreById />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
