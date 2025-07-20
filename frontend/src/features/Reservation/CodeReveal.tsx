import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

interface CodeRevealProps {
  reservationCode: string;
}

function CodeReveal({ reservationCode }: CodeRevealProps) {
  const navigate = useNavigate();

  return (
    <div className="m-auto flex max-w-[400px] flex-col items-baseline">
      <p className="text-lg">
        <span className="font-semibold">Code:</span> {reservationCode}
      </p>
      <p>(Please remember your code)</p>
      <div className="mt-2 flex w-full justify-end">
        <Button
          type="confirm"
          onClick={() => navigate(`/reserve/reservation/${reservationCode}`)}
        >
          Monitor your reservation
        </Button>
      </div>
    </div>
  );
}

export default CodeReveal;
