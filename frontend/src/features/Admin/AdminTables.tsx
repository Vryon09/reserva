import { useState } from "react";
import Modal from "../../ui/Modal";
import type { Table, TableInfo } from "./ManageTables";
import { useDeleteTable, useUpdateTable } from "../../services/apiTable";
import TableForm from "./TableForm";
import DeleteForm from "./DeleteForm";
import Button from "../../ui/Button";

interface AdminTablesProps {
  tables: Table[];
}

function AdminTables({ tables }: AdminTablesProps) {
  const [isModalOpen, setIsModalOpen] = useState({
    deleteModal: false,
    editModal: false,
  });

  const [selectedTable, setSelectedTable] = useState({
    deleteTable: "",
    editTable: "",
  });

  const [editDatas, setEditDatas] = useState<TableInfo>({
    tableNumber: "",
    capacity: 0,
    notes: "",
  });

  //do something about the status of the table

  const { mutate: handleDeleteTable } = useDeleteTable();
  const { mutate: handeUpdateTable } = useUpdateTable();

  function handleSubmit(id: string) {
    handeUpdateTable({
      id,
      updatedTable: editDatas,
    });

    setSelectedTable((prev) => {
      return { ...prev, editTable: "" };
    });

    setIsModalOpen((prev) => {
      return { ...prev, editModal: false };
    });
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {tables?.map((table, i: number) => (
        <div key={i} className="cursor-pointer border-1 p-2">
          <p>{table.tableNumber}</p>
          <p>{table.notes}</p>
          <p>Party Size: {table.capacity}</p>

          <div className="flex items-center justify-between gap-4">
            <Button
              type="confirm"
              onClick={() => {
                setIsModalOpen((prev) => {
                  return { ...prev, editModal: true };
                });

                setSelectedTable((prev) => {
                  return { ...prev, editTable: table._id };
                });

                setEditDatas({
                  tableNumber: table.tableNumber,
                  notes: table.notes,
                  capacity: table.capacity,
                });
              }}
            >
              Edit
            </Button>

            {isModalOpen.editModal && selectedTable.editTable === table._id && (
              <Modal
                setIsOpenObject={() =>
                  setIsModalOpen((prev) => {
                    return { ...prev, editModal: false };
                  })
                }
                addtionalFunction={() => {
                  setSelectedTable((prev) => {
                    return { ...prev, editTable: "" };
                  });
                  setEditDatas({
                    tableNumber: "",
                    notes: "",
                    capacity: 0,
                  });
                }}
              >
                <TableForm
                  handleSubmit={() => handleSubmit(table._id)}
                  tableInfo={editDatas}
                  setTableInfo={setEditDatas}
                  action="Update"
                  handleCloseModal={() =>
                    setIsModalOpen((prev) => {
                      return { ...prev, editModal: false };
                    })
                  }
                />
              </Modal>
            )}

            <Button
              type="reject"
              onClick={() => {
                setSelectedTable((prev) => {
                  return { ...prev, deleteTable: table._id };
                });
                setIsModalOpen((prev) => {
                  return { ...prev, deleteModal: true };
                });
              }}
            >
              Delete
            </Button>

            {isModalOpen.deleteModal &&
              selectedTable.deleteTable === table._id && (
                <Modal
                  isObjectState={true}
                  setIsOpenObject={() =>
                    setIsModalOpen((prev) => {
                      return { ...prev, deleteModal: false };
                    })
                  }
                  addtionalFunction={() => {
                    setSelectedTable((prev) => {
                      return { ...prev, deleteTable: "" };
                    });
                  }}
                >
                  <DeleteForm
                    dataName="table"
                    handleCloseModal={() =>
                      setIsModalOpen((prev) => {
                        return { ...prev, deleteModal: false };
                      })
                    }
                    handleSubmit={() => handleDeleteTable(table._id)}
                  />
                </Modal>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminTables;
