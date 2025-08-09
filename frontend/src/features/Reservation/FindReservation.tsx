import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function FindReservation() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (code.trim().length !== 4) {
      return;
    }

    navigate(`/reserve/reservation/${code}`);
  }

  //Next feature will be the cancel reservation button in the monitoring page

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex max-w-[430px] flex-col items-baseline gap-2 px-6 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
    >
      <p className="text-2xl font-bold">View Reservation</p>
      <div className="mt-2 flex w-full items-center gap-4">
        <label>Enter code:</label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className="input-normal flex-1"
        />
      </div>
      <div className="flex w-full justify-end">
        <Button type="confirm">Enter</Button>
      </div>
    </form>
  );
}

export default FindReservation;
