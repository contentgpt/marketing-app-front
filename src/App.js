import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Creator from './components/creator/Creator';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/home/Home';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/auth/sign-in" element={<Auth type="sign-in" />} />
          <Route path="/auth/sign-up" element={<Auth type="sign-up" />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
