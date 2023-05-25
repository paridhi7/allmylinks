import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import LinkList from "./components/LinkList";
import AddLinkForm from "./components/AddLinkForm";
import LinkProvider from "./components/LinkContext";
import Modal from "react-modal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AuthProvider from "./components/AuthProvider";
import NavBar from "./components/NavBar";
import ProtectedWrapper from "./components/ProtectedWrapper";

const HomePage = () => (
  <div className="p-4 space-y-8">
    <h1 className="text-2xl font-bold">Linktree Clone</h1>
    <AddLinkForm />
    <LinkList />
  </div>
);

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
            <Route
              path="/"
              element={
                <ProtectedWrapper>
                  <HomePage />
                </ProtectedWrapper>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </LinkProvider>
    </AuthProvider>
  );
}

export default App;
