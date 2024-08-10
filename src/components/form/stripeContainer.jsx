import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import Payment from './payment';

const stripePromise = loadStripe('pk_live_PM4TARrlbJpqFPib3jtn3eGWlGLTembPNqxjk41P7AwJE8sxpQjeJjzQhb7WW1kQitSgUIhBXz3EIyGGRnnMBbo00V1CNDbGo')


function StripeContainer(props) {
 
    return (
        <Elements stripe={stripePromise}  options={{ mode: 'setup', currency: 'usd' }}>
            <Payment/>
        </Elements>
    );
}

export default StripeContainer;