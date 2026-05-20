import { BrowserRouter as Router, Routes, Route }
  from "react-router-dom";
import Register from "./pages/Register"
import Login from "./pages/Login"
import Hero from "./pages/Hero"
import Dashboard from "./pages/Dashboard"
import BlogList from "./pages/BlogList"
import BlogContent from "./pages/BlogContent"
import ProtectedRoute from "./components/ProtectedRoute"
import {AuthProvider} from "./context/AuthContext"
import {BlogProvider} from "./context/BlogContext"

let App = () => {
  return (
    <AuthProvider>
     <BlogProvider>
      <Router>
      <Routes>
        <Route path='/' element={<Hero/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/blogs' element={<BlogList/>} />
        <Route path='/post/:id' element={<BlogContent/>} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
           <Dashboard />
          </ProtectedRoute>
       } />
      </Routes>
    </Router>
       </BlogProvider>
   </AuthProvider>
  );
}

export default App;
