import axios from "axios";
import React, { useEffect } from "react";
const PaymentSuccess = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>
        Payment Successfully received. Please check you mail for the transaction
        details !!
      </p>
      <a href="/" style={{ color: "blue" }}>
        Click on this link to make a new form
      </a>
    </div>
  );
};

export default PaymentSuccess;
