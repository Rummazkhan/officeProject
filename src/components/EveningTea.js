import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Spinner } from "react-bootstrap";
import img2 from "../assets/img2.JPG";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import {
  CARD_STYLE,
  DISABLED_BTN,
  EVENING_TEA,
  EVENING_TEA_DESCRIPTION,
  ORDER,
} from "../constants/Constants";
import { AppRoutes } from "../constants/RouteConstants";
import { findEmployeeRequest } from "../services/Services";
import { ButtonEnabler } from "../common/ButtonEnabler";

function EveningTea() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderType = EVENING_TEA;
  const email = localStorage.email;
  const route = AppRoutes.EVENING_TEA_ROUTE;

  ButtonEnabler(setIsButtonEnabled, 0, 24);

  const handleClick = async () => {
    setLoading(true);
    try {
      await findEmployeeRequest(
        email,
        orderType,
        navigate,
        dispatch,
        setLoading,
        route
      );
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Col xs={12} sm={6} md={4} className="etCard">
      <Card style={CARD_STYLE} className="etBase text-center">
        <Card.Img height={180} variant="top" src={img2} alt="Card 3" />
        <Card.Body>
          <Card.Title>{EVENING_TEA}</Card.Title>
          <h6>3 PM to 5 PM</h6>
          <Card.Text>{EVENING_TEA_DESCRIPTION}</Card.Text>
          <Button
            style={isButtonEnabled ? {} : DISABLED_BTN}
            disabled={!isButtonEnabled}
            variant="primary"
            onClick={handleClick}
            className="w-100"
          >
            {Loading && <Spinner size="sm" />}
            {!Loading && ORDER}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default EveningTea;
