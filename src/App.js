import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import MorningTeaForm from "./components/MorningTeaForm";
import EveningTeaForm from "./components/EveningTeaForm";
import LunchForm from "./components/LunchForm";
import Summary from "./common/Summary";
import UpdatePassword from "./components/UpdatePassword";
import SendCode from "./components/SendCode";
import VerifyCode from "./components/VerifyCode";
import SignUp from "./pages/SignUp";
import { AppRoutes } from "./constants/RouteConstants";
import ResetPassword from "./components/ResetPassword";
import PrivateRoutes from "./privateroute/PrivateRoutes";

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
