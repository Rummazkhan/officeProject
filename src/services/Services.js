import axios from "axios";
import {
  BASE_URL,
  EVENING_TEA,
  LUNCH,
  MORNING_TEA,
} from "../constants/Constants";
import { AppRoutes } from "../constants/RouteConstants";
import { showSuccessToast } from "./ToastService";
import { StoreActions } from "../store";

const token = localStorage.token;
const headers = {
  Authorization: `Bearer ${token}`,
};

// sigin request
export const signinRequest = async (data, setIsLoading, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/log-in`, data);
    if (response.status === 200) {
      const token = response.data.payload.data.token;
      const username = response.data.payload.data.user.userName;
      localStorage.setItem("token", token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", username);
      navigate(AppRoutes.HOMEPAGE_ROUTE);
      setIsLoading(false);
      showSuccessToast(response.data.metadata.message);
    }
  } catch (error) {
    throw error;
  }
};

// signup request
export const signupRequest = async (data, navigate, dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/sign-up`, data);
    if (response.status === 200) {
      navigate(AppRoutes.SIGNIN_ROUTE);
      dispatch(StoreActions.employee(data.username));
      showSuccessToast("Your Account Has Been Created");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

// order request
export const orderRequest = async (data, setIsLoading, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-order`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setIsLoading(false);
      navigate(AppRoutes.SUMMARY_ROUTE);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// find employee order request
export const findEmployeeRequest = async (
  email,
  orderType,
  navigate,
  dispatch,
  setLoading,
  route
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-employee-order?email=${email}&orderType=${orderType}`,
      { headers: headers }
    );
    navigate(route);
    const haveData = response.data.payload.data[0];

    if (orderType === MORNING_TEA) {
      dispatch(StoreActions.morningTeaData(haveData));
    } else if (orderType === LUNCH) {
      dispatch(StoreActions.lunchTimeData(haveData));
    } else if (orderType === EVENING_TEA) {
      dispatch(StoreActions.eveningTeaData(haveData));
    }

    if (haveData.length === 0) {
      console.log("field is empty");
    } else {
      const id = response.data.payload.data[0]._id;
      localStorage.setItem("id", id);
    }
    setLoading(false);
    return response;
  } catch (error) {
    setLoading(false);
  }
};

// updateorder request
export const updateOrderRequest = async (data, id, navigate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update-order-by-id/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      showSuccessToast("Order Updated Successfully");
      navigate(AppRoutes.HOMEPAGE_ROUTE);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// delete order request
export const deleteOrderRequest = async (id, dispatch, navigate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/delete-order/${id}`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      localStorage.removeItem("id");
      showSuccessToast("Order Deleted Successfully");
      dispatch(StoreActions.lunchTimeData([]));
      dispatch(StoreActions.morningTeaData([]));
      dispatch(StoreActions.eveningTeaData([]));

      navigate(AppRoutes.HOMEPAGE_ROUTE);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// update password request
export const updatePasswordRequest = async (data, email, navigate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/updatePassword/${email}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      showSuccessToast("Password Changed Succesfully");

      navigate(AppRoutes.HOMEPAGE_ROUTE);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

//send code request
export const sendCodeRequest = async (email, navigate, dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/sendcode`, {
      email,
    });
    if (response.status === 200) {
      navigate(AppRoutes.VERIFY_CODE_ROUTE);
      showSuccessToast("Code Sent Succesfully");
      console.log(email);
      dispatch(StoreActions.resetMail(email));
    }

    return response;
  } catch (error) {
    throw error;
  }
};

//verify code request
export const verifyCodeRequest = async (email, code, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/verifyCode/${email}`, {
      code,
    });
    if (response.status === 200) {
      navigate(AppRoutes.RESET_PASSWORD_ROUTE);
      showSuccessToast("Code Verfied");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

//reset password request
export const resetPasswordRequest = async (email, code, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/resetPassword/${email}`, {
      code,
    });
    if (response.status === 200) {
      navigate(AppRoutes.SIGNIN_ROUTE);
      showSuccessToast("Your Password is Changed Succesfully");
    }

    return response;
  } catch (error) {
    throw error;
  }
};
