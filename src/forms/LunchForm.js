import React from "react";
import { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateFormatter } from "../common/DateFomatter";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { DISABLED_BTN, LUNCH } from "../constants/Constants";
import MainNavbar from "../components/MainNavbar";
import Loader from "../common/Loader";
import UpdateOrder from "../components/UpdateOrder";
import DeleteOrder from "../components/DeleteOrder";
import CancelButton from "../common/CancelButton";
import { validateExtras, validateItem } from "../validations/Validate";
import { orderRequest } from "../services/Services";
import { AppRoutes } from "../constants/RouteConstants";
import { showErrorToast } from "../services/ToastService";

export default function LunchForm() {
  const haveData = useSelector((state) => state.auth.lunchData);

  const username = localStorage.username;
  const [roti, setRoti] = useState(
    haveData.length !== 0 ? haveData.rotiQuantity : ""
  );
  const [extra, setExtra] = useState(
    haveData.length !== 0 ? haveData.extras : ""
  );
  const [amount, setAmount] = useState(
    haveData.length !== 0 ? haveData.amount : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFormIsValid(
        validateItem(roti) && validateItem(amount) && validateExtras(extra)
      );
    }, 200);

    return () => clearTimeout(delay);
  }, [roti, amount, extra]);

  const navigate = useNavigate();
  const currentDate = new Date();
  const orderDate = DateFormatter(currentDate);
  const orderType = LUNCH;
  const extras = extra;
  const email = localStorage.email;

  const handleRotiAmount = (e) => {
    setRoti(e.target.value);
  };

  const handleExtra = (e) => {
    setExtra(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const formData = {
    email,
    orderDate,
    orderType,
    amount,
    rotiQuantity: roti,
    extras,
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
            Order Your {orderType}
          </h1>
          <div
            className="d-flex justify-content-center align-items-center "
            style={{ minHeight: "70vh" }}
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
                  <Form.Group controlId="roti">
                    <h6>Roti</h6>
                    <Form.Control
                      type="number"
                      placeholder="Enter the amount of roti"
                      min={0}
                      value={roti}
                      onChange={handleRotiAmount}
                    />
                  </Form.Group>

                  <Form.Group controlId="amount">
                    <h6>Amount</h6>
                    <Form.Control
                      type="number"
                      placeholder="Enter the amount given"
                      min={0}
                      value={amount}
                      onChange={handleAmount}
                    />
                  </Form.Group>

                  <Form.Group controlId="comment" className="mb-3">
                    <h6 className="mt-2">
                      Write any description or detail for your order
                    </h6>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Type your comment here..."
                      value={extra}
                      onChange={handleExtra}
                    />
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
                    <>
                      <div className="text-center">
                        <UpdateOrder formData={formData} />
                        <DeleteOrder />
                      </div>
                    </>
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
