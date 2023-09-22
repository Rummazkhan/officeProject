import React from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { resetPasswordRequest } from "../services/Services";
import CancelButton from "../common/CancelButton";

export default function ResetPassword() {
  const [code, setCode] = useState();

  const email = useSelector((state) => state.auth.resetMail);

  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordRequest(email, code, navigate);
    } catch (error) {
      console.error("Axios error:", error);
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
            <CancelButton route="/verifycode" />
            <h2 className="text-center mb-4">Reset Password</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={code}
                  onChange={handleCodeChange}
                />
              </Form.Group>
              <Button type="submit" className="w-100 my-3">
                Confirm
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
