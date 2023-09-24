import React from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DISABLED_BTN } from "../constants/Constants";
import { showErrorToast } from "../services/ToastService";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../validations/Validate";
import { signupRequest } from "../services/Services";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormIsValid(
        validateEmail(email) &&
          validatePassword(password) &&
          validateUsername(username) &&
          validateConfirmPassword(password, confirmPassword)
      );
    }, 200);

    return () => clearTimeout(delay);
  }, [email, password, username, confirmPassword]);

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const formData = {
    userName: username,
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupRequest(formData, navigate, dispatch);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        showErrorToast("Email already exists");
      }
      if (error.response && error.response.status === 400) {
        showErrorToast("Email Should be on Luminogics Domain");
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
            <Card.Body>
              <h2 className="text-center mb-4">Sign-Up</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="Name"
                    onChange={handleNameChange}
                    value={username}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={handleEmailChange}
                    value={email}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handlePasswordChange}
                    value={password}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Form.Group>

                <Button
                  style={formIsValid ? {} : DISABLED_BTN}
                  disabled={!formIsValid}
                  type="submit"
                  className="w-100 my-3"
                >
                  SignUp
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to={"/"}>sign in</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
