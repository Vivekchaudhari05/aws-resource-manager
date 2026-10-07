import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import EC2 from "./pages/EC2";
import S3 from "./pages/S3";
import Resources from "./pages/Resources";
import Activity from "./pages/Activity";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ec2" element={<EC2 />} />
          <Route path="/s3" element={<S3 />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;