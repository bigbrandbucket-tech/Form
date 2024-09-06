import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/style.css';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApi();
    // Load PayPal SDK if not loaded
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AQbGfUMi_-GeuUpGOtoWVsC61MjF_b0zll4KaKHkOXjVadggTeVxhlFYdhe3ebRCr-lBrS_raHq9K01c&currency=USD`;
      script.onload = initializePayPalButton;
      document.body.appendChild(script);

    } else {
      initializePayPalButton();
    }
  }, []);

  const fetchApi = async () => {
    const { data } = await axios.get(
      `https://form-backend-gamma.vercel.app/api/user/${id}`
    );
    setDetails(data);
  };

  const initializePayPalButton = () => {
    // Render PayPal buttons and force Debit/Credit Card fields to open by default
    window.paypal.Buttons({
      fundingSource: window.paypal.FUNDING.CARD, // Show card payment fields directly
      style: {
        shape: 'rect',
        label: 'pay',
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              //currency_code: 'USD',
              value: '1000', // Specify payment amount
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
          await axios.put(`https://form-backend-gamma.vercel.app/api/user/${id}`, { payment: true });
          await axios.post("https://form-backend-gamma.vercel.app/api/payment", {
            ...details,
            orderId: order.id,
            paymentIntent: order,
          });
          navigate(`/payment-success/${id}`);
        } else {
          alert("Payment could not be completed. Please try again.");
        }
      },
      onError: (err) => {
        console.error(err);
        alert("Payment failed. Please try again.");
      },
    }).render("#paypal-button-container"); // Render the button and card fields immediately
  
    // Use MutationObserver to detect when the card button is added to the DOM
    const observer = new MutationObserver((mutationsList, observer) => {
      const debitCardButton = document.querySelector('button[data-funding-source="card"]');
      if (debitCardButton) {
        debitCardButton.click(); // Simulate click to focus on the card fields
        observer.disconnect(); // Stop observing once we found and clicked the button
      }
    });
  
    // Start observing the DOM changes in the #paypal-button-container
    const targetNode = document.getElementById('paypal-button-container');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  };
  
  
  
  
  
  
  
  

  return (
    <div className="payment-div">
      <div
        className="form-group"
        style={{ border: "2px solid black", padding: "10px" }}
      >
        <div htmlFor="card-element" style={{ fontFamily: "sans-serif",marginBottom:'18px' }}>
          Pay with PayPal (Application Number: <b>{id}</b>)
        </div>
        {/* <div className="form-container">
          <label htmlFor="lastName">
            Address <span className="text-red-500 italic">(required)</span>
          </label>
          <input
            className="input-field"
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            required
          />
        </div> */}
        <div id="paypal-button-container"></div>
        {loading && (
          <span style={{ fontSize: "12px" }}>
            Payment is under process, please do not click or refresh the page.
          </span>
        )}
        <div
          style={{
            backgroundColor: "lightgrey",
            marginTop: "10px",
            padding: "8px",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
            Order Summary
          </h2>
          <h3>Passenger Details</h3>
          <p>Given Name: {details.firstName}</p>
          <p>Surname: {details.lastName}</p>
          <p>Passport No: {details.passportNumber}</p>
          <p>Amount: $1000</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
