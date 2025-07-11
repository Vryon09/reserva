import { createPortal } from "react-dom";

const overlayStyles: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0, 0.5)",
  zIndex: 1000,
};

const modalStyles: React.CSSProperties = {
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: `translate(-50%, -50%)`,
  zIndex: 1000,
};

type ModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  addtionalFunction?: () => void;
};

function Modal({ setIsOpen, children, addtionalFunction }: ModalProps) {
  return createPortal(
    <>
      <div
        onClick={() => {
          setIsOpen(false);

          addtionalFunction?.();
        }}
        style={overlayStyles}
      ></div>

      <div
        style={modalStyles}
        className="flex flex-col gap-6 rounded-2xl bg-neutral-50 px-4 py-6"
      >
        {children}
      </div>
    </>,
    document.getElementById("portal")!,
  );
}

export default Modal;
