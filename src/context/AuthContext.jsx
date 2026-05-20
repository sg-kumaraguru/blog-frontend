import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {authAPI} from "../api/authApi.js"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    try {
      const { data } = await authAPI.me();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials) => {
    await authAPI.login(credentials);
    await initializeAuth();
  }

  const register = async (data) => {
    await authAPI.register(data);
    await initializeAuth();
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  };

  if (loading) return <h1 className="text-gray-900 font-2xl font-bold grid place-content-center min-h-screen">Loading...</h1>;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
