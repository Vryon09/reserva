import { useNavigate, useParams } from "react-router-dom";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import type { ReservationTypes } from "../Admin/types";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../ui/Loader";
import ReservationCard from "./ReservationCard";
import {
  handleGetReservationByCredentials,
  useUpdateReservation,
} from "../../services/apiReservation";
import { useDeleteReservation } from "../../services/apiTable";

function ForgotCodeResults() {
  const { name, email, reservationDate } = useParams();
  const navigate = useNavigate();

  const {
    data: reservations = { name: "", email: "", reservationDate: "" },
    isPending,
    isError,
  } = useQuery({
    queryKey: ["forgotCodeResults", name, email, reservationDate],
    queryFn: () =>
      handleGetReservationByCredentials({
        name: name || "",
        email: email || "",
        reservationDate: reservationDate || "",
      }),
  });

  const { mutate: handleUpdateReservation, isPending: isUpdatePending } =
    useUpdateReservation();

  const { mutate: handleDeleteReservation, isPending: isDeletePending } =
    useDeleteReservation();

  if (isPending || isUpdatePending || isDeletePending) return <Loader />;

  if (!reservations.length)
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
    <div className="space-y-4 sm:px-4">
      <p className="mb-4 text-2xl font-bold">Search Results</p>
      <div className="mx-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reservations?.map((res: ReservationTypes) => (
          <ReservationCard
            key={res._id}
            isReservationPending={isPending}
            isError={isError}
            reservation={res}
            handleUpdateReservation={() => {
              handleUpdateReservation({
                id: res._id,
                updatedReservation: { status: "cancelled" },
              });
            }}
            handleDeleteReservationInTable={() => {
              handleDeleteReservation({
                tableId: res.tableId,
                reservationId: res._id,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ForgotCodeResults;
