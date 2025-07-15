import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <button className="border-1">Enter</button>
    </form>
  );
}

export default FindReservation;
