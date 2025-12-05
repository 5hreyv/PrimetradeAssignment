import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

function App() {
  const [view, setView] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("pt_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setView("dashboard");
    }
  }, []);

  const handleAuthSuccess = (user, token) => {
    localStorage.setItem("pt_token", token);
    localStorage.setItem("pt_user", JSON.stringify(user));
    setUser(user);
    setView("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("pt_token");
    localStorage.removeItem("pt_user");
    setUser(null);
    setView("login");
  };

  if (view === "login") {
    return (
      <LoginPage
        onSwitchRegister={() => setView("register")}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  if (view === "register") {
    return (
      <RegisterPage
        onSwitchLogin={() => setView("login")}
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return <DashboardPage user={user} onLogout={handleLogout} />;
}

export default App;
