import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "./constants/RouteConstants";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import MorningTeaForm from "./forms/MorningTeaForm";
import EveningTeaForm from "./forms/EveningTeaForm";
import LunchForm from "./forms/LunchForm";
import Summary from "./common/Summary";
import UpdatePassword from "./passwordReset/UpdatePassword";
import SendCode from "./passwordReset/SendCode";
import VerifyCode from "./passwordReset/VerifyCode";
import SignUp from "./pages/SignUp";
import ResetPassword from "./passwordReset/ResetPassword";
import PrivateRoutes from "./privateRoute/PrivateRoutes";

function App() {
  return (
    <>
      {/* private routes */}

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={AppRoutes.HOMEPAGE_ROUTE} element={<HomePage />} />
          <Route path={AppRoutes.LUNCH_ROUTE} element={<LunchForm />} />
          <Route
            path={AppRoutes.MORNING_TEA_ROUTE}
            element={<MorningTeaForm />}
          />
          <Route
            path={AppRoutes.EVENING_TEA_ROUTE}
            element={<EveningTeaForm />}
          />
          <Route path={AppRoutes.SUMMARY_ROUTE} element={<Summary />} />
          <Route
            path={AppRoutes.UPDATE_PROFILE_ROUTE}
            element={<UpdatePassword />}
          />
        </Route>

        {/* public routes */}

        <Route path={AppRoutes.SIGNIN_ROUTE} element={<SignIn />} />
        <Route path={AppRoutes.SIGNUP_ROUTE} element={<SignUp />} />
        <Route path={AppRoutes.SEND_CODE_ROUTE} element={<SendCode />} />
        <Route path={AppRoutes.VERIFY_CODE_ROUTE} element={<VerifyCode />} />
        <Route
          path={AppRoutes.RESET_PASSWORD_ROUTE}
          element={<ResetPassword />}
        />
      </Routes>
    </>
  );
}

export default App;
