import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";

function ForgotCode() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  function handleFindCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === "" || phoneNumber === "" || date === "") {
      toast.error("Please fill in all required fields.");
      return;
    }
    navigate(
      `/reserve/reservation/${name.trim()},${phoneNumber.trim()},${date}`,
    );
  }

  return (
    <div>
      <form className="card-form" onSubmit={handleFindCode}>
        <p className="mb-4 text-2xl font-bold">Find Your Reservation</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex w-full flex-col gap-2">
            <label>Name:</label>
            <input
              placeholder="Enter your name"
              required
              type="text"
              className="input-normal w-full"
              value={name}
              onChange={handleNameChange}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label>Phone Number:</label>
            <input
              placeholder="Enter your phone number"
              required
              type="text"
              pattern="^(09\d{9}|639\d{9})$"
              className="input-normal w-full"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label>Date:</label>
            <input
              className="input-normal w-full"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="confirm">Find</Button>
        </div>
      </form>
    </div>
  );
}

export default ForgotCode;
