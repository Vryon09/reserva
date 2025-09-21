import { useZxing } from "react-zxing";
import { useEffect, useState } from "react";
import { useUpdateReservation } from "../../../services/apiReservation";
import { useUpdateReservationStatus } from "../../../services/apiTable";
import toast from "react-hot-toast";
import Loader from "../../../ui/Loader";

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
  const [isCameraReady, setIsCameraReady] = useState(false);

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
  }, [
    result,
    handleUpdateReservation,
    handleUpdateReservationStatus,
    setCloseModal,
  ]);

  return (
    <div>
      {result._id === "" && result.tableId === "" && (
        <div className="relative">
          {!isCameraReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader />
            </div>
          )}
          <video ref={ref} onPlay={() => setIsCameraReady(true)} />
        </div>
      )}
    </div>
  );
}

export default QRScanner;
