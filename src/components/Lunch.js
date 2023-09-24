import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Spinner } from "react-bootstrap";
import img3 from "../assets/images/img3.JPG";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import {
  CARD_STYLE,
  DISABLED_BTN,
  LUNCH,
  LUNCH_DESCRIPTION,
  ORDER,
} from "../constants/Constants";
import { AppRoutes } from "../constants/RouteConstants";
import { findEmployeeRequest } from "../services/Services";
import { ButtonEnabler } from "../common/ButtonEnabler";

function Lunch() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderType = LUNCH;
  const email = localStorage.email;
  const route = AppRoutes.LUNCH_ROUTE;

  ButtonEnabler(setIsButtonEnabled, 12, 14);

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
    <Col xs={12} sm={6} md={4} className="lunchCard mb-4">
      <Card style={CARD_STYLE} className="lBase text-center">
        <Card.Img height={180} variant="top" src={img3} alt="Card 1" />
        <Card.Body>
          <Card.Title>{LUNCH}</Card.Title>
          <h6>12 AM to 2 PM</h6>

          <Card.Text>{LUNCH_DESCRIPTION}</Card.Text>
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

export default Lunch;
