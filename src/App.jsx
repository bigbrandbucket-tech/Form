import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FormPage from "./pages/FormPage";
import Dashboard from "./pages/Dashboard";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/layout/AdminLayout";
import PdfGen from "./components/admin/dashboard/pdfGen";
import Payment from "./components/form/payment";
import StripeContainer from "./components/form/stripeContainer";
import PaymentSuccess from "./components/PaymentSuccess";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app-component-div">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<FormPage />} />
          </Route>

          <Route path="/register/:id" element={<Layout />}>
            <Route index element={<FormPage />} />
          </Route>

          <Route path="/payment/:id" element={<Layout />}>
            <Route index element={<Payment />}></Route>
          </Route>
          <Route path="/payment-success/:id" element={<Layout />}>
            <Route index element={<PaymentSuccess />}></Route>
          </Route>

          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<>DashBoard</>} />
            <Route path="/admin/travels" element={<Dashboard />} />
            <Route path="/admin/pdf" element={<PdfGen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
