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
        <button className="border-1" onClick={handleCloseModal}>
          Cancel
        </button>
        <button
          className="border-1"
          onClick={() => {
            handleSubmit();
            handleCloseModal();
          }}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default DeleteForm;
