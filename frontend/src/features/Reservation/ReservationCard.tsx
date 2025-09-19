import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CancelReservation from "./CancelReservation";
import toast from "react-hot-toast";
import { useState } from "react";
import type { ReservationTypes } from "../Admin/types";
import Card from "../../ui/Card";
import { useQuery } from "@tanstack/react-query";
import { handleGetQRCode } from "../../services/apiReservation";

interface ReservationCardProps {
  isReservationPending: boolean;
  isError: boolean;
  reservation: ReservationTypes;
  handleUpdateReservation: () => void;
  handleDeleteReservationInTable: () => void;
}

function ReservationCard({
  isReservationPending,
  isError,
  reservation,
  handleUpdateReservation,
  handleDeleteReservationInTable,
}: ReservationCardProps) {
  const [cancelModal, setCancelModal] = useState(false);

  const navigate = useNavigate();

  const { data: qrCode, isPending: isQRCodePending } = useQuery<string>({
    queryKey: ["qrCode"],
    queryFn: () => handleGetQRCode(reservation.reservationCode),
  });

  if (isReservationPending) return <Loader />;

  if (isError)
    return (
      <Card additionalStyle="m-auto max-w-[400px] space-y-2">
        <p className="text-lg">No reservation found🥲</p>
        <div className="flex w-full justify-end">
          <Button onClick={() => navigate("/")} type="neutral">
            Go to home
          </Button>
        </div>
      </Card>
    );

  return (
    <div className="card-form m-auto flex min-h-54 w-full flex-col items-baseline md:max-w-[300px]">
      <p>
        <span className="font-semibold">Code: </span>
        {reservation.reservationCode}
      </p>
      <p>
        <span className="font-semibold">Name:</span> {reservation.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {reservation.email}
      </p>
      <p>
        <span className="font-semibold">Status:</span> {reservation.status}
      </p>
      {reservation.status === "pending" && (
        <p> (You can only cancel if the status is pending.)</p>
      )}
      {!isQRCodePending && reservation.status === "confirmed" && (
        <div className="flex w-full flex-col">
          <p className="font-semibold">QR Code:</p>
          <div className="flex w-full flex-col items-center">
            <img src={qrCode} alt="qr-code" className="w-full max-w-[250px]" />
            <p>(Show this QR Code to one of the staff.)</p>
          </div>
        </div>
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
              handleUpdateReservation();
              handleDeleteReservationInTable();
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

export default ReservationCard;
