import React from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { showSuccessToast } from "../services/ToastService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendCodeRequest } from "../services/Services";
import CancelButton from "../common/CancelButton";

export default function SendCode() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendCodeRequest(email, navigate, dispatch);
    } catch (error) {
      console.error("Axios error:", error);
      showSuccessToast("email does'nt exist");
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <CancelButton route="/" />
            <h2 className="text-center mb-4">Send Code</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter your email to send the code"
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Button type="submit" className="w-100 my-3">
                Send Code
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
