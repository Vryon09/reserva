import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleGetReservationByCode,
  // useDeleteReservation,
  useUpdateReservation,
} from "../../services/apiReservation";
import Modal from "../../ui/Modal";
import { useState } from "react";
import CancelReservation from "./CancelReservation";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import { useDeleteReservationInTable } from "../../services/apiTable";

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

  const { mutate: handleUpdateReservation } = useUpdateReservation();

  // const { mutate: handleDeleteReservation } = useDeleteReservation();
  const { mutate: handleDeleteReservationInTable } =
    useDeleteReservationInTable();

  console.log(reservation);

  if (isReservationPending) return <Loader />;

  if (isError)
    return (
      <div className="m-auto max-w-[400px] space-y-2">
        <p className="text-lg">No reservation found🥲</p>
        <div className="flex w-full justify-end">
          <Button onClick={() => navigate("/")} type="neutral">
            Go to home
          </Button>
        </div>
      </div>
    );

  return (
    <div className="m-auto flex max-w-[400px] flex-col items-baseline">
      <p>
        <span className="font-semibold">Code: </span>
        {reservation.reservationCode}
      </p>
      <p>
        <span className="font-semibold">Name:</span> {reservation.name}
      </p>
      <p>
        <span className="font-semibold">Phone:</span> {reservation.phone}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {reservation.status}
      </p>
      {reservation.status === "pending" && (
        <p> (You can only cancel if the status is pending.)</p>
      )}
      <div className="mt-2 flex w-full justify-end">
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
      </div>
      {cancelModal && (
        <Modal setIsOpen={setCancelModal}>
          <CancelReservation
            handleCloseModal={() => setCancelModal(false)}
            handleConfirm={() => {
              handleUpdateReservation({
                id: reservation._id,
                updatedReservation: { status: "cancelled" },
              });
              // handleDeleteReservation(reservation._id);
              handleDeleteReservationInTable({
                tableName: reservation.tableNumber,
                date: reservation.date.split("T")[0],
                time: reservation.time,
              });
              toast.success("Reservation cancelled successfully!");
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
