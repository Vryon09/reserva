import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function AllReservationsButton() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end">
      <Button
        type="primary"
        onClick={() => navigate("/admin/all-reservations")}
      >
        All Reservations
      </Button>
    </div>
  );
}

export default AllReservationsButton;
