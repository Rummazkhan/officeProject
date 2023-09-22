import React from "react";
import settings from "../assets/setting.png";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LogOut from "../pages/LogOut";
import { AppRoutes } from "../constants/RouteConstants";

export default function Avatar() {
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate(AppRoutes.UPDATE_PROFILE_ROUTE);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          id="profile-dropdown"
          style={{ background: "transparent", border: "none" }}
        >
          <img
            height={25}
            width={25}
            src={settings}
            alt="loading"
            style={{ cursor: "pointer" }}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleUpdateProfile}>
            Update Password
          </Dropdown.Item>
          <Dropdown.Item>
            <LogOut />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
