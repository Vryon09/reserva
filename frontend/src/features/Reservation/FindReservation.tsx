import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

function FindReservation() {
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (code.trim().length !== 4) {
      toast.error("The code should be 4 characters.");
      return;
    }

    navigate(`/reserve/reservation/${code}`);
  }

  //Next feature will be the cancel reservation button in the monitoring page

  return (
    <form
      onSubmit={handleSubmit}
      className="m-auto flex max-w-[400px] flex-col items-baseline gap-4 rounded-3xl px-6 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
    >
      <p className="text-2xl font-bold">View Reservation</p>
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
        <label>Enter code:</label>
        <input
          placeholder="Enter 4 character code."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className="input-normal sm:flex-1"
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <p
          className="cursor-pointer text-sm hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/reserve/reservation/forgot`);
          }}
        >
          Forgot Code?
        </p>
        <Button type="confirm">Enter</Button>
      </div>
    </form>
  );
}

export default FindReservation;
