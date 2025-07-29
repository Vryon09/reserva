import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddReservation } from "../../services/apiReservation";
import { nanoid } from "nanoid";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useAddReservationInTable } from "../../services/apiTable";
import CodeReveal from "./CodeReveal";
import Button from "../../ui/Button";

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

  if (isReserved) return <CodeReveal reservationCode={reservationCode} />;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-2xl font-bold">Personal Information Form</p>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <label>Name:</label>
            <input
              required
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="input-normal"
            />
          </div>

          <div className="flex flex-col">
            <label>Phone Number:</label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              pattern="^\d{11,12}$"
              className="input-normal"
            />
          </div>

          <div className="col-span-2 flex justify-end">
            <Button type="confirm" disabled={isReserved}>
              Reserve
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformationForm;
