import Button from "../../ui/Button";

interface CancelReservationProps {
  handleCloseModal: () => void;
  handleConfirm: () => void;
}

function CancelReservation({
  handleCloseModal,
  handleConfirm,
}: CancelReservationProps) {
  return (
    <div>
      <p>Are you sure you want to cancel your reservation?</p>
      <div className="mt-2 flex justify-between">
        <Button type="neutral" onClick={handleCloseModal}>
          Return
        </Button>
        <Button type="reject" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default CancelReservation;
