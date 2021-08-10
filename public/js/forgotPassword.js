/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
      data: {
        email,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Reset token sent successfully!');
    }
  } catch (err) {
    // our JSON code that we send from our server
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password updated!');
      window.setTimeout(() => {
        location.assign('/login');
      }, 2000);
    }
  } catch (err) {
    // our JSON code that we send from our server
    showAlert('error', err.response.data.message);
  }
};
