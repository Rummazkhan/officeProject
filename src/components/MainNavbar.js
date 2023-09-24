import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/icons/home.png";
import Avatar from "./Avatar";
import { AppRoutes } from "../constants/RouteConstants";
import AppLogo from "../assets/icons/Roti Kha Lo Logo.png";
import "../App.css";

function MainNavbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(AppRoutes.HOMEPAGE_ROUTE);
  };
  return (
    <Navbar
      style={{
        backgroundColor: "#252B48",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
      }}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand onClick={handleClick} style={{ cursor: "pointer" }}>
          <img width={28} height={25} src={homeIcon} alt="homeicon" />
        </Navbar.Brand>
        <Navbar.Brand>
          <img
            className="AppIcon"
            // style={{ marginLeft: "7%", height: "3rem", width: "12rem" }}
            src={AppLogo}
            alt="homeicon"
          />
        </Navbar.Brand>
        <Avatar />
      </Container>
    </Navbar>
  );
}
export default MainNavbar;
