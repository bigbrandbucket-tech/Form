import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/style.css';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(details);
  useEffect(() => {
    fetchApi();
    // Load PayPal SDK if not loaded
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=ASxEwpYzMoX6vklqjEuZ2X0oIFofAiPMDjtOd4pOjlI8XqL-64nb27ANNLQEXmlS4hD8EYpco3GG5Xji&currency=USD`;
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
    window.paypal.Buttons({
      fundingSource: window.paypal.FUNDING.CARD, 
      style: {
        shape: 'rect',
        label: 'pay',
      },
      createOrder: async (data, actions) => {
        // Instead of creating order on frontend, make a call to the backend
        try {
          const response = await axios.post("https://form-backend-gamma.vercel.app/api/create-payment", {
            id: id, // Include userId or other necessary data
          });
  
          if (response.status === 201) {
            return response.data.id; // Return the order ID from backend
          } else {
            alert("Error creating order. Please try again.");
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Payment initialization failed. Please try again.");
        }
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        if (order.status === "COMPLETED") {
          await axios.put(`https://form-backend-gamma.vercel.app/api/user/${id}`, { payment: true });
          console.log(order);
          const response = await axios.get( `https://form-backend-gamma.vercel.app/api/user/${id}` );
          const userData = response.data;
          const { data } = await axios.post("https://form-backend-gamma.vercel.app/api/payment", {
            details:userData,
            id:id,
            email: details.email,
            lastName:details.lastName,
            firstName:details.firstName,
            orderId: order.id,
            paymentIntent: order,
          });
          console.log(data);
          navigate(`/payment-success/${id}`);
        } else {
          alert("Payment could not be completed. Please try again.");
        }
      },
      onError: (err) => {
        console.error(err);
        alert("Payment failed. Please try again.");
      },
    }).render("#paypal-button-container");
  
    // MutationObserver logic remains the same
  };
  
  
  
  
  
  
  
  
  

  return (
    <div className="payment-div">
      <div
        className="form-group"
        style={{ border: "2px solid black", padding: "10px" }}
      >
        <div htmlFor="card-element" style={{ fontFamily: "sans-serif",marginBottom:'18px' }}>
          Pay with PayPal (Application Number: <b>{id}</b>) $1.00
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
            Passenger Summary
          </h2>
          <h3>Passenger Details</h3>
          <p>Given Name: {details.firstName}</p>
          <p>Surname: {details.lastName}</p>
          <p>Passport No: {details.passportNumber}</p>
          <p>Amount: $1</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
