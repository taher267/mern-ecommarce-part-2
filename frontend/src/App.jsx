import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { useEffect } from 'react';
import Webfont from 'webfontloader';
import Home from './component/layout/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search.jsx';
function App() {
  useEffect(() => {
    Webfont.load({
      google: { families: ['Roboto', 'Droid Sans', 'Chilanka'] }
    })
  }, [])
  return <Router>
    <Header />
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="products/:keyword" element={<Products />} />
      <Route path="products" element={<Products />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="search" element={<Search />} />
    </Routes>
    <Footer />
  </Router>;
}

export default App;
