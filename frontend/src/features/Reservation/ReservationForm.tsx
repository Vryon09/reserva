import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../../contexts/useReservationForm";
import Button from "../../ui/Button";

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
      alert("Invalid date selection.");
      return;
    }

    if (partySize === "none" || date === "") {
      alert("Fill all.");
      return;
    }

    navigate("/reserve/tables");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Party Size</label>
        <select
          value={partySize}
          onChange={(e) =>
            dispatch({ type: "setPartySize", payload: e.target.value })
          }
          className="border-1"
        >
          <option value="none">No. of guests</option>
          {item.map((i) => (
            <option key={i} value={i + 1}>
              {i + 1} guests
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Date</label>
        <input
          value={date}
          onChange={(e) =>
            dispatch({ type: "setDate", payload: e.target.value })
          }
          className="border-1"
          type="date"
        />
      </div>

      <Button type="confirm">Submit</Button>
    </form>
  );
}

export default ReservationForm;
