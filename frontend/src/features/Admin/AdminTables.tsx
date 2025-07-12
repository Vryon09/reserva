import { useState } from "react";
import Modal from "../../ui/Modal";
import type { Table } from "./ManageTables";
import { useDeleteTable, useUpdateTable } from "../../services/apiTable";

interface AdminTablesProps {
  tables: Table[];
}

function AdminTables({ tables }: AdminTablesProps) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [selectedDeleteTable, setSelectedDeleteTable] = useState<string>("");
  const [selectedEditTable, setSelectedEditTable] = useState<string>("");
  const [editDatas, setEditDatas] = useState({
    tableNumber: "",
    notes: "",
    capacity: 0,
  });

  //do something about the status of the table

  const { mutate: handleDeleteTable } = useDeleteTable();
  const { mutate: handeUpdateTable } = useUpdateTable();

  return (
    <div className="grid grid-cols-2 gap-2">
      {tables?.map((table, i: number) => (
        <div key={i} className="cursor-pointer border-1 p-2">
          <p>{table.tableNumber}</p>
          <p>{table.notes}</p>
          <p>Party Size: {table.capacity}</p>

          <div className="flex justify-end gap-2">
            <button
              className="cursor-pointer border-1"
              onClick={() => {
                setEditModal(true);
                setSelectedEditTable(table._id);

                setEditDatas({
                  tableNumber: table.tableNumber,
                  notes: table.notes,
                  capacity: table.capacity,
                });
              }}
            >
              Edit
            </button>

            {editModal && selectedEditTable === table._id && (
              <Modal
                setIsOpen={setEditModal}
                addtionalFunction={() => {
                  setSelectedEditTable("");
                  setEditDatas({
                    tableNumber: "",
                    notes: "",
                    capacity: 0,
                  });
                }}
              >
                <div>
                  <div>
                    <label>Table Number: </label>
                    <input
                      className="border-1"
                      type="text"
                      value={editDatas.tableNumber}
                      onChange={(e) =>
                        setEditDatas((prev) => {
                          return { ...prev, tableNumber: e.target.value };
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>Description: </label>
                    <input
                      className="border-1"
                      type="text"
                      value={editDatas.notes}
                      onChange={(e) =>
                        setEditDatas((prev) => {
                          return { ...prev, notes: e.target.value };
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>Capacity: </label>
                    <input
                      className="border-1"
                      type="text"
                      value={editDatas.capacity}
                      onChange={(e) =>
                        setEditDatas((prev) => {
                          return { ...prev, capacity: +e.target.value };
                        })
                      }
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      className="border-1"
                      onClick={() => setEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="border-1"
                      onClick={() => {
                        handeUpdateTable({
                          id: table._id,
                          updatedTable: editDatas,
                        });

                        setSelectedEditTable("");
                        setEditModal(false);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </Modal>
            )}

            <button
              className="cursor-pointer border-1"
              onClick={() => {
                setSelectedDeleteTable(table._id);
                setDeleteModal(true);
              }}
            >
              Delete
            </button>

            {deleteModal && selectedDeleteTable === table._id && (
              <Modal
                setIsOpen={setDeleteModal}
                addtionalFunction={() => {
                  setSelectedDeleteTable("");
                }}
              >
                <div>
                  <p>Are you sure you want to delele this table?</p>
                  <div className="flex justify-between">
                    <button
                      className="border-1"
                      onClick={() => setDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="border-1"
                      onClick={() => {
                        handleDeleteTable(table._id);
                        setDeleteModal(false);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminTables;
