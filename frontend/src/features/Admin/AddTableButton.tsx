import { useState } from "react";
import { useAddTable } from "../../services/apiTable";
import Modal from "../../ui/Modal";
import type { TableInfo } from "./ManageTables";
import TableForm from "./TableForm";
import Button from "../../ui/Button";

const initialTableInfo = {
  tableNumber: "",
  capacity: 0,
  notes: "",
};

function AddTableButton() {
  const [isAddTableOpen, setIsAddTableOpen] = useState<boolean>(false);
  const [tableInfo, setTableInfo] = useState<TableInfo>(initialTableInfo);

  const { mutate: handleAddTable } = useAddTable();

  function handleSubmit() {
    handleAddTable(tableInfo);

    setTableInfo(initialTableInfo);
    setIsAddTableOpen(false);
  }

  return (
    <div className="flex justify-end gap-2">
      <Button type="primary" onClick={() => setIsAddTableOpen(true)}>
        Add Table
      </Button>

      {isAddTableOpen && (
        <Modal setIsOpen={setIsAddTableOpen}>
          <TableForm
            handleSubmit={handleSubmit}
            tableInfo={tableInfo}
            setTableInfo={setTableInfo}
            action="Add"
            handleCloseModal={() => setIsAddTableOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddTableButton;
