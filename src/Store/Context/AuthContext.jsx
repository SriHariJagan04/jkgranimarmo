import { URLS } from "../../urls";
import { AuthContext } from "../useContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const getLoginDetails = async ({ username, password }) => {
    try {
      const res = await fetch(URLS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      localStorage.setItem("token", data.access);
      console.log(data.access)
      navigate("/");

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ getLoginDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
