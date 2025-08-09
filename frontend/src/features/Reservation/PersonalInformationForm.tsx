import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddReservation } from "../../services/apiReservation";
import { nanoid } from "nanoid";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useAddReservationInTable } from "../../services/apiTable";
import CodeReveal from "./CodeReveal";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";

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

      toast.success("Reservation Successfull!");
      setIsReserved(true);
      setName("");
      setPhone("");
      dispatch({ type: "resetForm" });
    } catch (error) {
      console.error(error);
      toast.error("Reservation Unsuccessfull!");
      navigate("/reserve/tables");
    }
  }

  //there should be a new paramater caled reservationCode and it should be also passed in the useQuery key

  if (isAddingPending || isAddingReservationInTablePending) return <Loader />;

  if (isReserved) return <CodeReveal reservationCode={reservationCode} />;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="px-6 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
      >
        <p className="mb-4 text-2xl font-bold">Personal Information Form</p>

        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
          <div className="flex w-full flex-col gap-2 md:w-[50%]">
            <label>Name:</label>
            <input
              placeholder="Enter your name"
              required
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="input-normal"
            />
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[50%]">
            <label>Phone Number:</label>
            <input
              placeholder="Enter your phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              pattern="^(09\d{9}|639\d{9})$"
              className="input-normal"
            />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="confirm" disabled={isReserved}>
            Reserve
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInformationForm;
