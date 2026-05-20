import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  }


  return (
    <>
      <section className='p-2 flex justify-between items-center max-w-6xl mx-auto'>
        <h2 className='font-bold text-2xl text-gray-900'>Hello, {user?.name}! </h2>
        <button className='border-2 px-2 py-1 rounded-md' onClick={handleLogout}>Logout</button>
      </section>
    </>

  )

}

export default Dashboard;
