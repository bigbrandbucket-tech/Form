import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import Payment from './payment';

const stripePromise = loadStripe('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')


function StripeContainer(props) {
 
    return (
        <Elements stripe={stripePromise}  options={{ mode: 'setup', currency: 'usd' }}>
            <Payment/>
        </Elements>
    );
}

export default StripeContainer;