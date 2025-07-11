import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <h1
      onClick={() => navigate("/")}
      className="w-fit cursor-pointer text-3xl font-bold tracking-wider uppercase"
    >
      Reserva
    </h1>
  );
}

export default Logo;
