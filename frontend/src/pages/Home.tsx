import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[90dvh] flex-col items-center justify-center gap-2">
      <div className="mb-4 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">
          Book Your <span className="text-brand-500"> Table Now</span>
        </h1>
        <p className="text-justify text-xl">
          Enjoy a memorable dining experience at Restaurant Name! Booking online
          is quick, easy, and guarantees your table. A small reservation fee
          confirms your spot and will be fully credited to your bill.
        </p>
      </div>
      <div className="flex gap-4">
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
