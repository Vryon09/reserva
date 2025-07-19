import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

interface CodeRevealProps {
  reservationCode: string;
}

function CodeReveal({ reservationCode }: CodeRevealProps) {
  const navigate = useNavigate();

  return (
    <div>
      <p>Code: {reservationCode}</p>
      <p>Please remember your code to monitor your reservation</p>
      <Button
        type="confirm"
        onClick={() => navigate(`/reserve/reservation/${reservationCode}`)}
      >
        Monitor your reservation
      </Button>
    </div>
  );
}

export default CodeReveal;
