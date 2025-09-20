import { ScanQrCode } from "lucide-react";
import QRScanner from "./QRScanner";
import ReservationCountsByDay from "./ReservationCountsByDay";
import ResNextXHours from "./ResNextXHours";
import TableOccupancy from "./TableOccupancy";
import TodaysStats from "./TodaysStats";
import TopTables from "./TopTables";
import Modal from "../../../ui/Modal";
import { useState } from "react";

function AdminDashboard() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedId, setScannedId] = useState({
    _id: "",
    tableId: "",
  });

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <button
          className="cursor-pointer"
          onClick={() => setIsScannerOpen(true)}
        >
          <ScanQrCode size={30} />
        </button>
        {isScannerOpen && (
          <Modal
            additionalFunction={() => {
              setIsScannerOpen(false);
              setScannedId({
                _id: "",
                tableId: "",
              });
            }}
          >
            <div>
              <QRScanner
                result={scannedId}
                setResult={(res) => {
                  const resParsed = JSON.parse(res);
                  setScannedId(resParsed);
                }}
              />
            </div>
          </Modal>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TableOccupancy />
        <TopTables />
        <div className="space-y-4">
          <TodaysStats />
          <ReservationCountsByDay />
        </div>

        <ResNextXHours />
      </div>
    </div>
  );
}

export default AdminDashboard;
