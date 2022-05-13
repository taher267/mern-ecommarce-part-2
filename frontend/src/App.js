import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import { useEffect } from 'react';
import Webfont from 'webfontloader';
import Home from './component/Home/Home';

function App() {
  useEffect(() => {
    Webfont.load({
      google: { families: ['Roboto', 'Droid Sans', 'Chilanka'] }
    })
  }, [])
  return <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
  </Router>;
}

export default App;
