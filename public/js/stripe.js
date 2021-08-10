/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51JM8jZSJq82n5S79pIga39FtfnJuf7I8Q2NCLhT4RFUI0ySF3tDgOOzp1mseyGgJTIR3Kdv65Mw3u4zvd86ebR0u00j9nEEesk'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    // Default 'GET'. Just pass url
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
