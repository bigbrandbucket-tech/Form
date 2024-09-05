import React from "react";
import { Link, useParams } from "react-router-dom";
import './PaySuccess.css'; // Ensure this file contains the styling

const PaymentSuccess = () => {
  const { id } = useParams();
  return (
    <div className="payment-success-container">
      <div className="payment-success-message">
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-text">Your payment has been successful.</p>
        <p className="success-text">Your ETA application Ref Number: <b>{id}</b> has been submitted.</p>
        <p className="success-text">If you want to apply for another applicant, <Link to="/" className="apply-link">APPLY HERE</Link>.</p>
        <Link to="/" className="return-home-link">Return to Home</Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
