import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

//Contexts
import { ReservationFormProvider } from "./contexts/ReservationFormContext";
import { ForgotCodeProvider } from "./contexts/ForgotCodeContext";

//Layout
import AppLayout from "./ui/AppLayout";

//Pages
import AdminMode from "./pages/AdminMode";
import GuestMode from "./pages/GuestMode";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";

//Reservation
import ReservationForm from "./features/Reservation/ReservationForm";
import Tables from "./features/Reservation/Tables";
import PersonalInformationForm from "./features/Reservation/PersonalInformationForm";

//Code
import MonitorReservation from "./features/Reservation/MonitorReservation";
import FindReservation from "./features/Reservation/FindReservation";
import ForgotCode from "./features/Reservation/ForgotCode";
import ForgotCodeResults from "./features/Reservation/ForgotCodeResults";

//Admin
import AdminDashboard from "./features/Admin/Dashboard/AdminDashboard";
import ManageReservations from "./features/Admin/ManageReservations";
import ManageTables from "./features/Admin/ManageTables";
import AllReservations from "./features/Admin/AllReservations";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <ForgotCodeProvider>
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
                <Route
                  path="reservation/:name/:email/:reservationDate"
                  element={<ForgotCodeResults />}
                />
                <Route path="reservation/forgot" element={<ForgotCode />} />
                <Route path="findReservation" element={<FindReservation />} />
              </Route>

              <Route path="admin-login" element={<AdminLogin />} />

              <Route path="admin" element={<AdminMode />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="reservations" element={<ManageReservations />} />
                <Route path="all-reservations" element={<AllReservations />} />
                <Route path="tables" element={<ManageTables />} />
              </Route>
            </Route>
          </Routes>

          <Toaster
            toastOptions={{
              success: { duration: 3000 },
            }}
            position="top-center"
          />
        </QueryClientProvider>
      </ReservationFormProvider>
    </ForgotCodeProvider>
  );
}

export default App;
