import { BrowserRouter as Router, Routes, Route }
  from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Hero from "./pages/Hero"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import {AuthProvider} from "./context/AuthContext"

let App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
           <Dashboard />
          </ProtectedRoute>
       } />
      </Routes>
    </Router>
   </AuthProvider>
  );
}

export default App;
