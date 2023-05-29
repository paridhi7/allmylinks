import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    if (authContext && authContext.currentUser) {
      await signOut(auth);
    }
  };

  if (authContext && authContext.currentUser) {
    return (
      <nav>
        <img src="./mainLogo.svg" alt="logo" width="100" height="100" />
        <Link to="/admin">Admin</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <img src="./mainLogo.svg" alt="logo" width="100" height="100" />
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    );
  }
};

export default NavBar;
