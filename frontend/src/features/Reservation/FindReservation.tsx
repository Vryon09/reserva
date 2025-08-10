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
      className="card-form flex flex-col items-baseline gap-2"
    >
      <p className="text-2xl font-bold">View Reservation</p>
      <div className="mt-2 flex w-full items-center gap-4">
        <label>Enter code:</label>
        <input
          placeholder="Enter 4 character code."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          type="text"
          className="input-normal flex-1"
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
