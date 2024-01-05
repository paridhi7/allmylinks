import React from "react";
import { Navigate, useLocation, Routes, Route, Link } from "react-router-dom";
import LinksTab from "./LinksTab";
import AppearanceTab from "./AppearanceTab";
import MilestonesTab from "./MilestonesTab";

const AdminPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="m-4">
      <div className="flex justify-start gap-4 items-center border-b-2 border-gray-200 mb-4">
        <Link
          to="."
          className={`text-lg py-2 ${
            location.pathname.endsWith("/admin")
              ? "border-b-4 border-indigo-600"
              : "text-gray-500"
          }`}
        >
          Links
        </Link>
        <Link
          to="milestones"
          className={`text-lg py-2 ${
            location.pathname.endsWith("milestones")
              ? "border-b-4 border-indigo-600"
              : "text-gray-500"
          }`}
        >
          Milestones
        </Link>
        <Link
          to="appearance"
          className={`text-lg py-2 ${
            location.pathname.includes("appearance")
              ? "border-b-4 border-indigo-600"
              : "text-gray-500"
          }`}
        >
          Appearance
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<LinksTab />} />
        <Route path="appearance" element={<AppearanceTab />} />
        <Route path="milestones" element={<MilestonesTab />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
