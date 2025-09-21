import { useZxing } from "react-zxing";
import { useEffect } from "react";
import { useUpdateReservation } from "../../../services/apiReservation";
import { useUpdateReservationStatus } from "../../../services/apiTable";
import toast from "react-hot-toast";

type ResultTypes = {
  _id: string;
  tableId: string;
  name: string;
};

type QRScannerTypes = {
  result: ResultTypes;
  setResult: (result: string) => void;
  setCloseModal: () => void;
};

function QRScanner({ result, setResult, setCloseModal }: QRScannerTypes) {
  const { mutate: handleUpdateReservation } = useUpdateReservation();
  const { mutate: handleUpdateReservationStatus } =
    useUpdateReservationStatus();

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
    paused: result._id !== "" || result.tableId !== "" || result.name !== "",
  });

  useEffect(() => {
    console.log(result);
    async function runUpdates() {
      if (result._id !== "" || result.tableId !== "" || result.name !== "") {
        try {
          await Promise.all([
            handleUpdateReservation({
              id: result._id,
              updatedReservation: { status: "seated" },
            }),
            handleUpdateReservationStatus({
              tableId: result.tableId,
              reservationId: result._id,
              status: "seated",
            }),
          ]);

          toast.success(`${result.name}'s reservation is marked as seated.`);
          setCloseModal();
        } catch (error) {
          toast.error("Failed to update: " + error);
        }
      }
    }

    runUpdates();
  }, [result, handleUpdateReservation, handleUpdateReservationStatus]);

  return (
    <div>
      {result._id === "" && result.tableId === "" && <video ref={ref} />}
    </div>
  );
}

export default QRScanner;
