import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Modal from "react-modal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthProvider from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import ProtectedWrapper from "./components/ProtectedWrapper";
import LandingPage from "./components/LandingPage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";

function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              <ProtectedWrapper>
                <AdminPage />
              </ProtectedWrapper>
            }
          />
          <Route path="/:username" element={<UserPage />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
