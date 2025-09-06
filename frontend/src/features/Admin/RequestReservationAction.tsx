import { useSyncTableStatus } from "../../services/apiTable";
import Button from "../../ui/Button";
import type { ReservationActionProps } from "./types";

function RequestReservationAction({
  reservation,
  handleUpdate,
}: ReservationActionProps) {
  const { mutate: handleSyncTableStatus } = useSyncTableStatus();
  // const { mutate: handeUpdateTable } = useUpdateTable();
  // const { data: table, isPending: isTablePending } = useQuery<Table>({
  //   queryKey: ["table", reservation.tableName],
  //   queryFn: () => handleGetTableByName(reservation.tableName),
  // });

  // function onUpdateTable(status: string) {
  //   if (!table || isTablePending) return;

  //   const updatedTable = {
  //     ...table,
  //     reservations: table.reservations.map((res) =>
  //       res?._id === reservation._id ? { ...res, status } : res,
  //     ),
  //   };

  //   handeUpdateTable({
  //     id: table._id,
  //     updatedTable: { reservations: updatedTable.reservations },
  //   });
  // }

  return (
    <>
      <Button
        type="reject"
        onClick={() => {
          handleUpdate(reservation._id, { status: "rejected" });
          handleSyncTableStatus({
            tableName: reservation.tableName,
            reservationId: reservation._id,
            status: "rejected",
          });
          // onUpdateTable("rejected");
        }}
      >
        Reject
      </Button>

      <Button
        type="confirm"
        onClick={() => {
          handleUpdate(reservation._id, { status: "confirmed" });
          handleSyncTableStatus({
            tableName: reservation.tableName,
            reservationId: reservation._id,
            status: "confirmed",
          });
          // onUpdateTable("confirmed");
        }}
      >
        Confirm
      </Button>
    </>
  );
}

export default RequestReservationAction;
