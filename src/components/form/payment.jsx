import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const { data } = await axios.get(
      `https://form-backend-gamma.vercel.app/api/user/${id}`
    );
    setDetails(data);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(details);
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://form-backend-gamma.vercel.app/api/create-payment",
        { amount: 1000, id:id }
      );

      const result = await stripe.confirmCardPayment(`${data.client_secret}`, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: details.email || "Canada Form Customer",
          },
        },
      });
      if (result.paymentIntent.status === "succeeded") {
        const response = await axios.put(
          `https://form-backend-gamma.vercel.app/api/user/${id}`,
          {
            payment: true,
          }
        );
        await axios.post("https://form-backend-gamma.vercel.app/api/payment", {
          ...details,
          ...result.paymentIntent,
        });
        navigate("/payment-success");
      } else {
        alert("Payment could not be completed. Please try again");
      }
      setLoading(false);
      if (result.error) {
        setLoading(false);
        console.error(result.error.message);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      alert("Payment could not be completed. Please try again");
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "50%", marginLeft: "25%" }}>
      <div
        className="form-group"
        style={{ border: "2px solid black", padding: "10px" }}
      >
        <div htmlFor="card-element" style={{ fontFamily: "sans-serif" }}>
          Enter Your Card Details Below (Application Number : <b>{id}</b>)
        </div>
        &nbsp;&nbsp;
        <div className="form-container">
          <label htmlFor="lastName">
            Card Holder Name{" "}
            <span className="text-red-500 italic">(required)</span>
          </label>
          <div>
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              // onChange={handleChange}
              placeholder="Card Holder Name"
              required
            />
          </div>
        </div>
        &nbsp;&nbsp;
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: "16px",
                marginTop: "10px",

                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
            },
          }}
        />
        <div className="form-container">
          <label htmlFor="lastName">
            Address <span className="text-red-500 italic">(required)</span>
          </label>
          <div>
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              // onChange={handleChange}
              placeholder="Address"
              required
            />
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="form-container">
          <label htmlFor="lastName">
            Country <span className="text-red-500 italic">(required)</span>
          </label>
          <div>
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              // onChange={handleChange}
              placeholder="Country"
              required
            />
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="form-container">
          <label htmlFor="lastName">
            City <span className="text-red-500 italic">(required)</span>
          </label>
          <div>
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              // onChange={handleChange}
              placeholder="City"
              required
            />
          </div>
        </div>
        &nbsp;&nbsp;
        <div className="form-container">
          <label htmlFor="lastName">
            Pin Code <span className="text-red-500 italic">(required)</span>
          </label>
          <div>
            <input
              className="input-field"
              type="text"
              id="lastName"
              name="lastName"
              // value={formData.lastName}
              // onChange={handleChange}
              placeholder="Pin Code"
              required
            />
          </div>
        </div>
        {loading ? (
          <>
            <box-icon
              name="loader-alt"
              animation="spin"
              flip="horizontal"
            ></box-icon>
            <span style={{ fontSize: "12px" }}>
              Payment is under process please do not click or refresh the page
            </span>
          </>
        ) : (
          <button
            type="submit"
            style={{
              background: "red",
              padding: "8px",
              color: "white",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            Pay Now
          </button>
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
    </form>
  );
};

export default Payment;
