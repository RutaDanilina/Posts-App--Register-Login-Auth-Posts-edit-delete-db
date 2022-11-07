import * as React from 'react'
import MainContext from './context/MainContext'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';


const App = () => {



  return (
    <MainContext.Provider value={{}}>
      <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" end element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </MainContext.Provider>

  );
}

export default App;
