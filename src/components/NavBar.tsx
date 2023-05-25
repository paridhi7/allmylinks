import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const auth = getAuth();

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav>
      {authContext?.currentUser ? (
        <>
          <Link to="/">Home</Link>
          <button onClick={handleSignOut}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
