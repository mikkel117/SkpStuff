import useModal from "./useModal";

interface ModalProps {
  modalClose: any;
}
export default function Modal({ modalClose }: ModalProps) {
  return (
    <>
      <div>Modal</div>
      <button onClick={modalClose}>close modal</button>
    </>
  );
}
