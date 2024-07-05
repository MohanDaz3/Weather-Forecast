import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// components
import Login from "./pages/Login";
import Register from "./pages/Register";
import WeatherBoard from "./pages/WeatherBoard";

const App = () => {

  const[isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean)=>{
    setIsAuthenticated(boolean)
  }

  const isAuth = async()=>{
    try {
      const response = await fetch("http://localhost:5000/auth/verify",{
        method:"GET",
        headers:{token: localStorage.token}
      })
      const parseResponse = await response.json()
      parseResponse === true? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(()=>{
    isAuth()
  })

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/weatherboard" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/weatherboard" />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/weatherboard" />}
            />
            <Route
              path="/weatherboard"
              element={isAuthenticated ? <WeatherBoard setAuth={setAuth} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <ToastContainer/>
      </Router>
    </Fragment>
  );
}

export default App;
