import { Route, Routes } from "react-router-dom";
import AdminMode from "./pages/AdminMode";
import AppLayout from "./ui/AppLayout";
import GuestMode from "./pages/GuestMode";
import Home from "./pages/Home";
import Tables from "./features/Reservation/Tables";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MonitorReservation from "./features/Reservation/MonitorReservation";
import FindReservation from "./features/Reservation/FindReservation";
import ReservationForm from "./features/Reservation/ReservationForm";
import { ReservationFormProvider } from "./contexts/ReservationFormContext";
import PersonalInformationForm from "./features/Reservation/PersonalInformationForm";
import AdminLogin from "./pages/AdminLogin";
import AllReservations from "./features/Admin/AllReservations";

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
    <ReservationFormProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="reserve" element={<GuestMode />}>
              <Route index element={<ReservationForm />} />
              <Route path="tables" element={<Tables />} />
              <Route
                path="personal-information"
                element={<PersonalInformationForm />}
              />
              <Route
                path="reservation/:reservationCode"
                element={<MonitorReservation />}
              />
              <Route path="findReservation" element={<FindReservation />} />
            </Route>
            <Route path="admin">
              <Route path="login" element={<AdminLogin />} />
              <Route path="dashboard" element={<AdminMode />} />
              <Route path="reservations" element={<AllReservations />} />
            </Route>
          </Route>
        </Routes>
      </QueryClientProvider>
    </ReservationFormProvider>
  );
}

export default App;
