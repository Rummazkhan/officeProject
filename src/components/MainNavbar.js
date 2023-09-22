import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.png";
import Avatar from "./Avatar";
import { AppRoutes } from "../constants/RouteConstants";
import AppLogo from "../assets/Roti Kha Lo Logo.png";

function MainNavbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(AppRoutes.HOMEPAGE_ROUTE);
  };
  return (
    <Navbar
      style={{ backgroundColor: "#252B48", textAlign: "center" }}
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand onClick={handleClick} style={{ cursor: "pointer" }}>
          <img width={28} height={25} src={homeIcon} alt="homeicon" />
        </Navbar.Brand>
        <Navbar.Brand>
          <img
            style={{ marginLeft: "4%", height: "3rem", width: "12rem" }}
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
