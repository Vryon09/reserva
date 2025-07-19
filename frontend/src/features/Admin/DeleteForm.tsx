import Button from "../../ui/Button";

interface DeleteFormProps {
  dataName: string;
  handleCloseModal: () => void;
  handleSubmit: () => void;
}

function DeleteForm({
  dataName,
  handleCloseModal,
  handleSubmit,
}: DeleteFormProps) {
  return (
    <form>
      <p>Are you sure you want to delele this {dataName}?</p>
      <div className="flex justify-between">
        <Button type="neutral" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          type="reject"
          onClick={() => {
            handleSubmit();
            handleCloseModal();
          }}
        >
          Confirm
        </Button>
      </div>
    </form>
  );
}

export default DeleteForm;
