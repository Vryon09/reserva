import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddReservation } from "../../services/apiReservation";
import { nanoid } from "nanoid";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useAddReservationInTable } from "../../services/apiTable";

function PersonalInformationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { dispatch, time, date, table } = useReservationForm();
  // const [time, setTime] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const [reservationCode, setReservationCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setReservationCode(nanoid(4));
  }, []);

  const { mutateAsync: handleAddReservation, isPending: isAddingPending } =
    useAddReservation();

  const {
    mutateAsync: handleAddReservationInTable,
    isPending: isAddingReservationInTablePending,
  } = useAddReservationInTable();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (table === undefined) {
      console.log("Table number not found");
      return;
    }

    try {
      await handleAddReservationInTable({
        tableName: table,
        time,
        date,
      });

      await handleAddReservation({
        tableNumber: table,
        name,
        phone,
        date,
        time,
        reservationCode,
      });

      setIsReserved(true);
      setName("");
      setPhone("");
      dispatch({ type: "resetForm" });
    } catch (error) {
      console.error(error);
      navigate("/reserve/tables");
    }
  }

  //there should be a new paramater caled reservationCode and it should be also passed in the useQuery key

  if (isAddingPending || isAddingReservationInTablePending)
    return <p>Wait for your Reservation Code...</p>;

  if (isReserved)
    return (
      <div>
        <p>Code: {reservationCode}</p>
        <p>Please remember your code to monitor your reservation</p>
        <button
          className="border-1"
          onClick={() => navigate(`/reserve/reservation/${reservationCode}`)}
        >
          Monitor your reservation
        </button>
      </div>
    );

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="border-1"
          />
        </div>

        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="border-1"
          />
        </div>

        {/* <div className="flex flex-col">
          <label>Date and Time</label>
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="datetime-local"
            className="border-1"
          />
        </div> */}

        <div className="col-span-2 flex justify-center">
          <button
            disabled={isReserved}
            className="cursor-pointer rounded-2xl border-1 px-5 py-2 font-semibold uppercase"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformationForm;
