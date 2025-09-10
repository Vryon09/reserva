import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { Copy } from "lucide-react";
import { copyCode } from "../../services/helperFunctions";
import Card from "../../ui/Card";

interface CodeRevealProps {
  reservationCode: string;
}

function CodeReveal({ reservationCode }: CodeRevealProps) {
  const navigate = useNavigate();

  return (
    <Card additionalStyle="m-auto flex max-w-[450px] flex-col items-baseline">
      <div className="flex gap-2">
        <p className="text-lg">
          <span className="font-semibold">Code:</span> {reservationCode}
        </p>
        <button
          className="cursor-pointer"
          onClick={() => copyCode({ code: reservationCode })}
        >
          <Copy size={18} />
        </button>
      </div>
      <p>(Please remember your code)</p>
      <div className="mt-2 flex w-full justify-end">
        <Button
          type="confirm"
          onClick={() => navigate(`/reserve/reservation/${reservationCode}`)}
        >
          Monitor your reservation
        </Button>
      </div>
    </Card>
  );
}

export default CodeReveal;
