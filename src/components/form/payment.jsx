import {
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";


function Payment({email}) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    expiryYear: "",
    cvv: "",
    price: 1,
  });
  const [formvalues, setFormValues] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const tempId = location?.state?.tempId;

  let map = {
    "eTourist Visa(for 30 Days)": "99",
    "eTourist Visa(for 1 Year)": "149",
    "eTourist Visa(for 5 Years)": "249",
    "eBUSINESS VISA": "0.1",
    "eMEDICAL ATTENDANT VISA": "249",
    "eMEDICAL VISA": "249",
    "eCONFERENCE VISA": "249",
    "G20 eConference VISA": "249",
  };

  useEffect(() => {
   

    fetch();
    async function fetch() {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
        );

        if (response.data.data?.length >= 1) {
          setFormValues(response.data.data[0]);
        } else {
        }
      } catch (error) {}
    }
  }, []);

  const years = Array.from(
    { length: new Date().getFullYear() - 1969 },
    (_, index) => 1970 + index
  );

  const dates = Array.from({ length: 12 }, (_, index) => index + 1);


  const paypal = useRef()
  useEffect(() => {
    const navdom = document.querySelector("#Step-payment");

    let response = []
    
    fetch();
    async function fetch() {
      try {
        response = await axios.get(
          process.env.REACT_APP_BASE_URL + `/getLeadbyId/${tempId}`
        );

        if (response.data.data?.length >= 1) {
          setFormValues(response.data.data[0]);
        } else {
        }
      } catch (error) {}
    }
    window.paypal?.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [ {
            description: "E-visa",
            amount: {
              currency_code:"USD",
              value:"0.1"
            }
          }]
        })
      },
      onApprove : async (data, actions) => {
        const order = await actions.order.capture()
        console.log( response.data.data[0])
        setLoading(true)
        const finalResponse = await axios.post(
          process.env.REACT_APP_BASE_URL + `/payment`,
          {
            tempId: tempId,
            transactionId: order?.purchase_units?.[0].payments.captures[0].id,
            email: response.data.data[0].email,
            name:response.data.data[0].firstName,
            sirName:response.data.data[0].name,
          })
          setLoading(false)
         navigate(`/application-form/details/${tempId}`, {
                state: { tempId: tempId },
              });
      },
      onError: (err) => {
        console.log(err)
      }
    }).render(paypal.current)
  },[])
  return (
  <>
     <div style={{marginTop:"5%", marginLeft:"20%"}} ref={paypal}></div>
   {loading && "loading"}
     </>
   
  
  );
}

export default Payment;