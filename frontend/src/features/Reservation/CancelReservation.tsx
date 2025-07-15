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
      <div className="flex justify-between">
        <button className="border-1" onClick={handleCloseModal}>
          Cancel
        </button>
        <button className="border-1" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

export default CancelReservation;
