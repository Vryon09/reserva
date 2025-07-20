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
    <form onSubmit={handleSubmit}>
      <label>Enter code:</label>
      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        type="text"
        className="border-1"
      />
      <Button type="confirm">Enter</Button>
    </form>
  );
}

export default FindReservation;
