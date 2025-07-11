import { Route, Routes } from "react-router-dom";
import AdminMode from "./pages/AdminMode";
import AppLayout from "./ui/AppLayout";
import GuestMode from "./pages/GuestMode";
import ReservationForm from "./features/Reservation/ReservationForm";
import Home from "./pages/Home";
import Tables from "./features/Reservation/Tables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MonitorReservation from "./features/Reservation/MonitorReservation";
import FindReservation from "./features/Reservation/FindReservation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="reserve" element={<GuestMode />}>
            <Route index element={<Tables />} />
            <Route path="tables" element={<Tables />} />
            <Route path="form/:tableNumber" element={<ReservationForm />} />
            <Route
              path="reservation/:reservationCode"
              element={<MonitorReservation />}
            />
            <Route path="findReservation" element={<FindReservation />} />
          </Route>
          <Route path="admin" element={<AdminMode />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
