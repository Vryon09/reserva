import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleGetReservationByCode,
  useDeleteReservation,
} from "../../services/apiReservation";
import Modal from "../../ui/Modal";
import { useState } from "react";
import CancelReservation from "./CancelReservation";
import Button from "../../ui/Button";

//NEXT IS CODE THE RESERVATION STATUS MECHANICS

function MonitorReservation() {
  const [cancelModal, setCancelModal] = useState(false);

  const { reservationCode } = useParams();
  const navigate = useNavigate();

  const {
    data: reservation,
    isPending: isReservationPending,
    isError,
  } = useQuery({
    queryKey: ["data", reservationCode],
    queryFn: handleGetReservationByCode,
  });

  const { mutate: handleDeleteReservation } = useDeleteReservation();

  if (isReservationPending) return <p>Loading...</p>;

  if (isError)
    return (
      <div>
        <p>No reservation found.</p>
        <button onClick={() => navigate("/")} className="border-1">
          Go to home
        </button>
      </div>
    );

  return (
    <div>
      <p>Code: {reservation.reservationCode}</p>
      <p>Name: {reservation.name}</p>
      <p>Phone: {reservation.phone}</p>
      <p>Status: {reservation.status}</p>
      <p>(You can only cancel if the status is pending.)</p>
      {reservation.status === "pending" && (
        <Button
          type="reject"
          onClick={() => {
            setCancelModal(true);
          }}
        >
          Cancel Reservation
        </Button>
      )}

      {cancelModal && (
        <Modal setIsOpen={setCancelModal}>
          <CancelReservation
            handleCloseModal={() => setCancelModal(false)}
            handleConfirm={() => {
              handleDeleteReservation(reservation._id);
              navigate("/");
              setCancelModal(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default MonitorReservation;
