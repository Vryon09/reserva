import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-2 py-8">
      <div className="mb-4 flex flex-col items-center gap-1 md:gap-2 lg:gap-4">
        <h1 className="w-90 text-center text-3xl font-semibold md:w-xl md:text-5xl lg:w-2xl lg:text-6xl">
          Book your table <span className="text-brand-500">now</span>
        </h1>
        <p className="w-76 text-center text-sm md:w-lg md:text-base lg:w-xl lg:text-lg">
          Reserva makes reservations effortless, giving your business the tools
          to stay organized and grow.
        </p>
      </div>
      <div className="flex items-center gap-4 md:flex-row">
        <Button type="primary" onClick={() => navigate("/reserve")}>
          Book a Table
        </Button>

        <Button
          type="secondary"
          onClick={() => navigate("/reserve/findReservation")}
        >
          View Reservation
        </Button>
      </div>
    </div>
  );
}

export default Home;
