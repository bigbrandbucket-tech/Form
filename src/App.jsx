import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FormPage from "./pages/FormPage";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/layout/AdminLayout";

function App() {
  return (
    <div className="app-component-div">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FormPage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<>DashBoard</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
