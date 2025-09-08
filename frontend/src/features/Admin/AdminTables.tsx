import { useState } from "react";
import Modal from "../../ui/Modal";
import {
  getAllTables,
  useDeleteTable,
  useUpdateTable,
} from "../../services/apiTable";
import TableForm from "./TableForm";
import DeleteForm from "./DeleteForm";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import type { Table } from "./types";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// interface AdminTablesProps {
//   tables: Table[];
// }

function AdminTables() {
  const [isModalOpen, setIsModalOpen] = useState({
    deleteModal: false,
    editModal: false,
  });

  const [selectedTable, setSelectedTable] = useState({
    deleteTable: "",
    editTable: "",
  });

  const [editDatas, setEditDatas] = useState<Partial<Table>>({
    tableName: "",
    capacity: 0,
    notes: "",
  });

  const { data: tables, isPending: isTablesPending } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: () => getAllTables({ queryString: "partySize", value: "0" }),
  });

  //do something about the status of the table

  const { mutate: handleDeleteTable, isPending: isDeletingTable } =
    useDeleteTable();
  const { mutate: handeUpdateTable, isPending: isUpdatingTable } =
    useUpdateTable();

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

  if (!tables?.length && !isTablesPending)
    return <p>No tables yet. Maybe create a new one?</p>;

  return (
    <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3">
      {isTablesPending || isDeletingTable || isUpdatingTable
        ? Array.from({ length: 6 }, (_, i) => (
            <div key={i}>
              <Skeleton height={160} borderRadius={12} />
            </div>
          ))
        : tables?.map((table) => (
            <Card
              key={table._id}
              additionalStyle="cursor-pointer gap-1 flex flex-col items-baseline min-h-40 justify-between"
            >
              <div className="gap-1">
                <p className="text-sm font-semibold">{table.tableName}</p>
                <p className="text-sm">{table.notes}</p>
                <p className="text-sm">Capacity: {table.capacity}</p>
              </div>

              <div className="mt-2 flex w-full items-center justify-between gap-4">
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
                      tableName: table.tableName,
                      notes: table.notes,
                      capacity: table.capacity,
                    });
                  }}
                >
                  Edit
                </Button>

                {isModalOpen.editModal &&
                  selectedTable.editTable === table._id && (
                    <Modal
                      setIsOpenObject={() =>
                        setIsModalOpen((prev) => {
                          return { ...prev, editModal: false };
                        })
                      }
                      additionalFunction={() => {
                        setSelectedTable((prev) => {
                          return { ...prev, editTable: "" };
                        });

                        setEditDatas({
                          tableName: "",
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
                      additionalFunction={() => {
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
            </Card>
          ))}
    </div>
  );
}

export default AdminTables;
