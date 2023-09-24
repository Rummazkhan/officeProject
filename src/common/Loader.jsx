import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "50vh" }}
    >
      <Spinner animation="grow" variant="secondary" />
    </div>
  );
}

export default Loader;
