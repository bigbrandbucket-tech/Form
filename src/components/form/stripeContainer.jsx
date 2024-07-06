import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import Payment from './payment';

const stripePromise = loadStripe('pk_test_51PM4TARrlbJpqFPihltucW2sXB2OT4UXFO8AVQup8BqhcXLUe9or4LNgG5TiYSmJAO6mCkNTq2U94s46w8zH35wi00rTeFPe14')
function StripeContainer(props) {
    return (
        <Elements stripe={stripePromise}>
            <Payment/>
        </Elements>
    );
}

export default StripeContainer;