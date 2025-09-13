import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddReservation } from "../../services/apiReservation";
import { nanoid } from "nanoid";
import { useReservationForm } from "../../contexts/useReservationForm";
import { useAddReservationInTable } from "../../services/apiTable";
import CodeReveal from "./CodeReveal";
import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import Modal from "../../ui/Modal";

dayjs.extend(utc);
dayjs.extend(timezone);

function PersonalInformationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch, time, date, tableName, tableId } = useReservationForm();
  const [isReserved, setIsReserved] = useState(false);
  const [reservationCode, setReservationCode] = useState("");
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const navigate = useNavigate();

  const combinedDateTime = dayjs(`${date} ${time}`, "YYYY-MM-DD HH:mm").tz(
    "Asia/Manila",
  );

  useEffect(() => {
    setReservationCode(nanoid(4));
  }, []);

  const { mutateAsync: handleAddReservation, isPending: isAddingPending } =
    useAddReservation();

  const {
    mutateAsync: handleAddReservationInTable,
    isPending: isAddingReservationInTablePending,
  } = useAddReservationInTable();

  async function handleSubmit() {
    if (tableName === undefined) {
      console.log("Table number not found");
      return;
    }

    try {
      const createdReservation = await handleAddReservation({
        tableId,
        tableName,
        name,
        email,
        reservationDate: combinedDateTime.format(),
        reservationCode,
      });

      await handleAddReservationInTable({
        tableId,
        name,
        email,
        reservationDate: combinedDateTime.format(),
        _id: createdReservation._id,
      });

      toast.success("Reservation Successfull!");
      setIsReserved(true);
      setName("");
      setEmail("");
      dispatch({ type: "resetForm" });
    } catch (error) {
      console.error(error);
      toast.error("Reservation Unsuccessfull!");
      navigate("/reserve/tables");
    }
  }

  //there should be a new paramater caled reservationCode and it should be also passed in the useQuery key

  if (isAddingPending || isAddingReservationInTablePending) return <Loader />;

  if (isReserved) return <CodeReveal reservationCode={reservationCode} />;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsConfirming(true);
        }}
        className="card-form"
      >
        <p className="mb-4 text-2xl font-bold">Personal Information Form</p>

        <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
          <div className="flex w-full flex-col gap-2 md:w-[50%]">
            <label>Name:</label>
            <input
              placeholder="Enter your name"
              required
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="input-normal"
            />
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[50%]">
            <label>Email:</label>
            <input
              placeholder="Enter your email number"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              // pattern="^(09\d{9}|639\d{9})$"
              className="input-normal"
            />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="confirm" disabled={isReserved}>
            Reserve
          </Button>
        </div>
      </form>
      {isConfirming && (
        <Modal setIsOpen={setIsConfirming}>
          <form>
            <p>Are you sure you want to reserve a table?</p>
            <div className="mt-4 flex justify-between">
              <Button type="neutral" onClick={() => setIsConfirming(false)}>
                Cancel
              </Button>
              <Button
                type="confirm"
                onClick={() => {
                  handleSubmit();
                  setIsConfirming(false);
                }}
              >
                Confirm
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default PersonalInformationForm;
