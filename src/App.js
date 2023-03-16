import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Creator from './components/creator/Creator';
import Auth from './components/auth/Auth';

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/auth/:type" element={<Auth />} />
          <Route path="/" element={<Creator />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
