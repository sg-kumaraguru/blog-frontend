import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseLink =
    "text-sm font-medium px-4 py-2 rounded-lg";

  return (
    <nav className="bg-gray-100 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <NavLink
          to="/"
          className="text-xl font-bold text-slate-900 tracking-tight"
        >
          BlogIt.
        </NavLink>

        <div className="flex items-center gap-3">

          <NavLink
            to="/login"
            className={`${baseLink} border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900`}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={`${baseLink} bg-slate-900 text-white hover:bg-slate-800`}
          >
            Register
          </NavLink>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
