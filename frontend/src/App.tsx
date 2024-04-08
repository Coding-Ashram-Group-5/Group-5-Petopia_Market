import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Home from "./components/pages/Home"
import NotFound from "./components/pages/NotFound"
import SecuredRoute from "./components/pages/securepage/SecuredRoute"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SecuredRoute>
              <Home />
            </SecuredRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App