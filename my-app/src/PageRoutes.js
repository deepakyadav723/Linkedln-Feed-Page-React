import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import OtherPage from "./pages/otherPage/OtherPage.jsx";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/mynetwork"
        element={<OtherPage>My Network Page</OtherPage>}
      />
      <Route path="/jobs" element={<OtherPage>Jobs Page</OtherPage>} />
      <Route
        path="/messaging"
        element={<OtherPage>Messaging Page</OtherPage>}
      />
      <Route
        path="/notification"
        element={<OtherPage>Notification Page</OtherPage>}
      />
      <Route path="*" element={<OtherPage>Page Not Found!</OtherPage>} />
    </Routes>
  );
};

export default PageRoutes;
