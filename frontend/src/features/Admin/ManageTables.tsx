import AddTableButton from "./AddTableButton";
import AdminTables from "./AdminTables";
// import Loader from "../../ui/Loader";

function ManageTables() {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold">Tables</h2>

      <div className="space-y-4">
        <AddTableButton />

        <AdminTables />
      </div>
    </div>
  );
}

export default ManageTables;
