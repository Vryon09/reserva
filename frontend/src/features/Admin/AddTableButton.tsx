import { useState } from "react";
import { useAddTable } from "../../services/apiTable";
import Modal from "../../ui/Modal";

function AddTableButton() {
  const [isAddTableOpen, setIsAddTableOpen] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(1);
  const [notes, setNotes] = useState<string>("");

  const { mutate: handleAddTable } = useAddTable();

  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={() => setIsAddTableOpen(true)}
        className="cursor-pointer rounded-md bg-orange-800 p-2 text-orange-50"
      >
        Add Table
      </button>

      {isAddTableOpen && (
        <Modal setIsOpen={setIsAddTableOpen}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTable({ tableNumber, capacity, notes });

              // getAllTables();

              setTableNumber("");
              setCapacity(0);
              setNotes("");
              setIsAddTableOpen(false);
            }}
          >
            <div>
              <label>Table Name: </label>
              <input
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                type="text"
                className="border-1"
              />
            </div>

            <div>
              <label>Notes: </label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                type="text"
                className="border-1"
              />
            </div>

            <div>
              <label>Capacity: </label>
              <select
                className="w-full border-1"
                value={capacity}
                onChange={(e) => setCapacity(+e.target.value)}
              >
                <option value="none">No. of seats</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>

            <button className="border-1">Add</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AddTableButton;
