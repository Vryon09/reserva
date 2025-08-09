import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../../contexts/useReservationForm";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

function ReservationForm() {
  const { dispatch, partySize, date } = useReservationForm();

  //use useReducer and useContext for handling these states
  const item = Array.from({ length: 30 }, (_, i) => i);

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const selectedDate = new Date(date);
    const now = new Date();

    if (selectedDate < now) {
      toast.error("Reservation date should not be on the same day.");
      return;
    }

    if (partySize === "none" || date === "") {
      toast.error("Fill all.");
      return;
    }

    navigate("/reserve/tables");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-6 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
    >
      <p className="mb-4 text-2xl font-bold">Reservation Form</p>

      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-2 md:w-[50%]">
          <label className="font-semibold">Party Size:</label>
          <select
            value={partySize}
            onChange={(e) =>
              dispatch({ type: "setPartySize", payload: e.target.value })
            }
            className="input-normal"
          >
            <option value="none">No. of guests</option>
            {item.map((i) => (
              <option key={i} value={i + 1}>
                {i + 1} guests
              </option>
            ))}
          </select>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-[50%]">
          <label className="font-semibold">Date:</label>
          <input
            value={date}
            onChange={(e) =>
              dispatch({ type: "setDate", payload: e.target.value })
            }
            className="input-normal w-full"
            type="date"
          />
        </div>
      </div>

      <div className="mt-2 flex w-full justify-end">
        <Button type="confirm">Submit</Button>
      </div>
    </form>
  );
}

export default ReservationForm;
