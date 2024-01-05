import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { Link, useLocation } from "react-router-dom";
import mainLogo from "../images/amlLogo.png";
import { doc, getDoc } from "firebase/firestore";

const NavBar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const authContext = useContext(AuthContext);
  const user = authContext?.currentUser;
  const location = useLocation();

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data()?.username || null);
        }
      }
    };

    if (user) {
      fetchUsername();
    }
  }, [user]);

  const handleSignOut = async () => {
    if (authContext && authContext.currentUser) {
      await signOut(auth);
    }
  };

  if (
    !["/", "/admin", "/admin/appearance", "/admin/milestones"].includes(
      location.pathname
    )
  ) {
    return null;
  }

  const logoLink = location.pathname === "/admin" ? "/admin" : "/";

  return (
    <nav className="flex items-center justify-between py-2 px-4 bg-white">
      <Link to={logoLink}>
        <img src={mainLogo} alt="logo" className="w-16 h-16" />
      </Link>
      <div className="flex items-center space-x-4">
        {authContext && authContext.currentUser ? (
          ["/admin", "/admin/appearance", "/admin/milestones"].includes(
            location.pathname
          ) ? (
            <>
              <a
                href={`/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-3.5 py-2.5 text-lg text-white bg-indigo-600 rounded hover:bg-indigo-500 transition-colors duration-200"
              >
                View My Profile
              </a>
              <button
                onClick={handleSignOut}
                className="px-3.5 py-2.5 text-lg text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/admin"
                className="text-lg text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                Admin
              </Link>
              <button
                onClick={handleSignOut}
                className="px-3.5 py-2.5 text-lg text-white bg-red-600 rounded hover:bg-red-700 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          )
        ) : (
          <>
            <Link
              to="/signin"
              className="text-lg text-gray-700 hover:text-indigo-600 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-3.5 py-2.5 rounded-md text-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
