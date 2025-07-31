import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { Search } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-[80dvh] flex-col items-center justify-center gap-2">
      <div className="mb-4 flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-bold md:text-5xl">
          Book Your Table <span className="text-brand-500">Now</span>
        </h1>
        <p className="text-center text-lg md:text-2xl">
          Enjoy a memorable dining experience at Restaurant Name! Booking online
          is quick, easy, and guarantees your table. A small reservation fee
          confirms your spot and will be fully credited to your bill.
        </p>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
        <Button type="primary" onClick={() => navigate("/reserve")}>
          Book a Table
        </Button>

        <Button
          type="secondary"
          onClick={() => navigate("/reserve/findReservation")}
        >
          <span className="flex items-center gap-1">
            <Search size={20} /> View Reservation
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Home;
