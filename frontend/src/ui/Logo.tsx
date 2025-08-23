import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Logo() {
  const navigate = useNavigate();

  return (
    <Button type="logo" onClick={() => navigate("/")}>
      reserva
    </Button>
  );
}

export default Logo;
