import React from "react";
import { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import MainNavbar from "../components/MainNavbar";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { DateFormatter } from "../common/DateFomatter";
import { useSelector } from "react-redux/es/hooks/useSelector";
import UpdateOrder from "../components/UpdateOrder";
import DeleteOrder from "../components/DeleteOrder";
import { DISABLED_BTN, EVENING_TEA } from "../constants/Constants";
import CancelButton from "../common/CancelButton";
import { validateExtras, validateItem } from "../validations/Validate";
import { orderRequest } from "../services/Services";
import { AppRoutes } from "../constants/RouteConstants";
import { showErrorToast } from "../services/ToastService";

export default function EveningTeaForm() {
  const haveData = useSelector((state) => state.auth.eveningData);
  const username = localStorage.username;
  const [sugarQuantity, setSugarQuantity] = useState(
    haveData.length !== 0 ? haveData.sugerQuantity : ""
  );
  const [selectedCup, setSelectedCup] = useState(
    haveData.length !== 0 ? haveData.teaVolume : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormIsValid(
        validateExtras(selectedCup) && validateItem(sugarQuantity)
      );
    }, 200);

    return () => clearTimeout(delay);
  }, [selectedCup, sugarQuantity]);

  const handleRadioChange = (event) => {
    setSelectedCup(event.target.value);
  };

  const email = localStorage.email;
  const navigate = useNavigate();
  const currentDate = new Date();
  const orderDate = DateFormatter(currentDate);
  const orderType = EVENING_TEA;
  const teaVolume = selectedCup;

  const formData = {
    email,
    orderDate,
    orderType,
    sugerQuantity: sugarQuantity,
    teaVolume,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await orderRequest(formData, setIsLoading, navigate);
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 409) {
        showErrorToast("Invalid Time");
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <MainNavbar />
          <h1
            className="text-center mt-4"
            style={{ fontFamily: "sans-serif", color: "#445069" }}
          >
            {orderType}
          </h1>
          <div
            className="d-flex justify-content-center mt-4"
            style={{ minHeight: "50vh" }}
          >
            <Card className="w-100" style={{ maxWidth: "400px" }}>
              <CancelButton route={AppRoutes.HOMEPAGE_ROUTE} />
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <h6>Name</h6>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={username}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="sugarQuantity" className="mt-3">
                    <h6>Sugar Quantity (spoon)</h6>
                    <Form.Control
                      type="number"
                      min="0"
                      value={sugarQuantity}
                      onChange={(e) => setSugarQuantity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="cupSize" className="mb-3 mt-3">
                    <h6>Tea Quantity</h6>
                    <div className="d-flex">
                      <label>
                        <input
                          type="radio"
                          value="Half Cup"
                          checked={selectedCup === "Half Cup"}
                          onChange={handleRadioChange}
                        />
                        Half Cup
                      </label>
                      <label style={{ marginLeft: "4%" }}>
                        <input
                          type="radio"
                          value="Full Cup"
                          checked={selectedCup === "Full Cup"}
                          onChange={handleRadioChange}
                        />
                        Full Cup
                      </label>
                    </div>
                  </Form.Group>
                  {haveData.length === 0 ? (
                    <div className="text-center">
                      <button
                        style={formIsValid ? {} : DISABLED_BTN}
                        disabled={!formIsValid}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UpdateOrder formData={formData} />
                      <DeleteOrder />
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
