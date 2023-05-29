import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import LinkProvider from "./components/LinkContext";
import Modal from "react-modal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthProvider from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import ProtectedWrapper from "./components/ProtectedWrapper";
import LandingPage from "./components/LandingPage";
import AdminPage from "./components/AdminPage";

function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <AuthProvider>
      <LinkProvider>
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
          </Routes>
        </Router>
      </LinkProvider>
    </AuthProvider>
  );
}

export default App;
