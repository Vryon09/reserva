import { useZxing } from "react-zxing";
import { useEffect } from "react";
import { useUpdateReservation } from "../../../services/apiReservation";
import { useUpdateReservationStatus } from "../../../services/apiTable";
import toast from "react-hot-toast";

type ResultTypes = {
  reservationId: string;
  tableId: string;
};

type QRScannerTypes = {
  result: ResultTypes;
  setResult: (result: string) => void;
};

function QRScanner({ result, setResult }: QRScannerTypes) {
  const { mutate: handleUpdateReservation } = useUpdateReservation();
  const { mutate: handleUpdateReservationStatus } =
    useUpdateReservationStatus();

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
    paused: result.reservationId !== "" || result.tableId !== "",
  });

  useEffect(() => {
    async function runUpdates() {
      if (result.reservationId !== "" || result.tableId !== "") {
        try {
          const [update1, update2] = await Promise.all([
            handleUpdateReservation({
              id: result.reservationId,
              updatedReservation: { status: "seated" },
            }),
            handleUpdateReservationStatus({
              tableId: result.tableId,
              reservationId: result.reservationId,
              status: "seated",
            }),
          ]);

          toast.success("Successfully updated: " + update1 + update2);
        } catch (error) {
          toast.error("Failed to update: " + error);
        }
      }
    }

    runUpdates();
  }, [result, handleUpdateReservation, handleUpdateReservationStatus]);

  return (
    <div>
      {result.reservationId === "" && result.tableId === "" && (
        <video ref={ref} className="scale-x-[-1] transform" />
      )}
    </div>
  );
}

export default QRScanner;
