import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Spinner } from "react-bootstrap";
import img1 from "../assets/img1.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch } from "react-redux";
import {
  CARD_STYLE,
  DISABLED_BTN,
  MORNING_TEA,
  MORNING_TEA_DESCRIPTION,
  ORDER,
} from "../constants/Constants";
import { findEmployeeRequest } from "../services/Services";
import { AppRoutes } from "../constants/RouteConstants";
import { ButtonEnabler } from "../common/ButtonEnabler";

function MorningTea() {
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderType = MORNING_TEA;
  const email = localStorage.email;
  const route = AppRoutes.MORNING_TEA_ROUTE;

  ButtonEnabler(setIsButtonEnabled, 11, 12);

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
    <>
      <Col xs={12} sm={6} md={4} className="mtCard mb-4">
        <Card style={CARD_STYLE} className="mtBase text-center">
          <Card.Img height={180} variant="top" src={img1} alt="Card 2" />
          <Card.Body>
            <Card.Title>{MORNING_TEA}</Card.Title>
            <h6>11 AM to 12 PM</h6>
            <Card.Text>{MORNING_TEA_DESCRIPTION}</Card.Text>
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
    </>
  );
}

export default MorningTea;
