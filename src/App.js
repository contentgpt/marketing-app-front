import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Creator from './components/creator/Creator';
import Auth from './components/auth/Auth';

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/auth/sign-in" element={<Auth type="sign-in" />} />
          <Route path="/auth/sign-up" element={<Auth type="sign-up" />} />
          {user && <Route path="/creator" element={<Creator />} />}
          <Route exact path="/" to="/auth/:type" />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
