import React from "react";
import { useState, useEffect } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../services/ToastService";
import { DISABLED_BTN } from "../constants/Constants";
import CancelButton from "../common/CancelButton";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../authentication/Auth";
import { updatePasswordRequest } from "../services/Services";
import { AppRoutes } from "../constants/RouteConstants";

export default function UpdateProfile() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmOldPass] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const email = localStorage.email;

  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormIsValid(
        validateEmail(email) &&
          validatePassword(newPass) &&
          validateConfirmPassword(newPass, confirmNewPass)
      );
    }, 200);

    return () => clearTimeout(delay);
  }, [email, newPass, confirmNewPass]);

  const handleOldPassword = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmOldPass(e.target.value);
  };

  const formData = {
    password: oldPass,
    newPassword: newPass,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePasswordRequest(formData, email, navigate);
    } catch (error) {
      console.error("Axios error:", error);
      if (error && error.response.status === 400) {
        showErrorToast("Old password password is not correct");
      }
    }
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <CancelButton route={AppRoutes.HOMEPAGE_ROUTE} />
            <Card.Body>
              <h2 className="text-center mb-4">Update Password</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleOldPassword}
                    value={oldPass}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPass}
                    onChange={handleNewPassword}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPass}
                    onChange={handleConfirmNewPassword}
                  />
                </Form.Group>

                <div className="d-flex w-100 my-3">
                  <div className="w-100 text-center">
                    <Button
                      style={formIsValid ? {} : DISABLED_BTN}
                      disabled={!formIsValid}
                      type="submit"
                      className=" mt-3"
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
