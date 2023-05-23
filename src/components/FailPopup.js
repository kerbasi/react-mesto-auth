import MainPopup from "./MainPopup";

function FailPopup({ isOpen, onClose }) {
  return <MainPopup isSuccess={false} isOpen={isOpen} onClose={onClose} />;
}

export default FailPopup;
