import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-2">
      <div className="mb-8 flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">BOOK A TABLE</h1>
        <p className="text-justify text-lg">
          Reserve your place at Restaurant Name and treat yourself to a
          flavorful experience you won’t forget! Booking your table online is
          fast, simple, and ensures a smooth dining experience. A reservation
          fee is required to confirm your booking—this amount will be fully
          credited to your final bill.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          className="cursor-pointer bg-neutral-800 px-4 py-3 font-semibold tracking-wide text-neutral-50 uppercase"
          onClick={() => navigate("/reserve")}
        >
          Book a Table
        </button>

        <button
          className="cursor-pointer bg-neutral-800 px-4 py-3 font-semibold tracking-wide text-neutral-50 uppercase"
          onClick={() => navigate("/reserve/findReservation")}
        >
          Monitor Reservation
        </button>
      </div>
    </div>
  );
}

export default Home;
