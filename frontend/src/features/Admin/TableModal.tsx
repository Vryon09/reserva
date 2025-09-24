import type { ReactNode } from "react";
import Modal from "../../ui/Modal";

type TableModalTypes = {
  children: ReactNode;
  modalCondition: boolean;
  setIsOpen: () => void;
  handleReset: () => void;
};

function TableModal({
  modalCondition,
  children,
  setIsOpen,
  handleReset,
}: TableModalTypes) {
  return (
    <>
      {modalCondition && (
        <Modal setIsOpenObject={setIsOpen} additionalFunction={handleReset}>
          {children}
        </Modal>
      )}
    </>
  );
}

export default TableModal;
