import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
export const ThemeContext = createContext(null);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token);
    }
  }, [navigate]);
  useEffect(function () {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(
    function () {
      const body = document.body;
      if (theme === "light") {
        body.classList.remove("dark");
        body.classList.add("light");
      } else {
        body.classList.remove("light");
        body.classList.add("dark");
      }
    },
    [theme]
  );
  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute isAuth={!!token}>
                <MainLayouts>
                  <Home></Home>
                </MainLayouts>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          ></Route>
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
