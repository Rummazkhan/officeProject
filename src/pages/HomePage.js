import React from "react";
import { Container } from "react-bootstrap";
import MorningTea from "../components/MorningTea";
import Lunch from "../components/Lunch";
import EveningTea from "../components/EveningTea";
import { Row } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";
import "../App.css";

export default function HomePage() {
  const username = localStorage.username;
  const capitalUsername = username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <>
      <MainNavbar />
      <Container>
        <h3
          className="text-center mt-4 mb-4 "
          style={{ fontFamily: "sans-serif", color: "#445069" }}
        >
          {`Welcome ${capitalUsername}`}
        </h3>

        <Row>
          <MorningTea />
          <Lunch />
          <EveningTea />
        </Row>
      </Container>
    </>
  );
}
