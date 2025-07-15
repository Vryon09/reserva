import { useNavigate } from "react-router-dom";

interface CodeRevealProps {
  reservationCode: string;
}

function CodeReveal({ reservationCode }: CodeRevealProps) {
  const navigate = useNavigate();

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
}

export default CodeReveal;
