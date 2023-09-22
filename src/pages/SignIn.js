import React from "react";
import { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinnerr from "../common/Spinnerr";
import { DISABLED_BTN } from "../constants/Constants";
import { validateEmail, validatePassword } from "../authentication/Auth";
import { signinRequest } from "../services/Services";
import { showErrorToast } from "../services/ToastService";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormIsValid(validateEmail(email) && validatePassword(password));
    }, 200);

    return () => clearTimeout(delay);
  }, [email, password]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const formData = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signinRequest(formData, setIsLoading, navigate);
    } catch (error) {
      showErrorToast("Incorrect email or password");
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Sign-In</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={handleEmailChange} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      autoComplete="current-password"
                      type="password"
                      onChange={handlePasswordChange}
                    />
                  </Form.Group>

                  <Link to={"/sendcode"}>forgot Password</Link>

                  <Button
                    style={formIsValid ? {} : DISABLED_BTN}
                    disabled={!formIsValid}
                    type="submit"
                    className="w-100 my-3"
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Don't have an account? <Link to={"/signup"}>sign up</Link>
            </div>
          </div>
        </Container>
      )}
      {isLoading && <Spinnerr />}
    </>
  );
}

export default SignIn;
