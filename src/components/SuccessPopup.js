import MainPopup from "./MainPopup";

function SuccessPopup({ isOpen, onClose }) {
  return <MainPopup isSuccess={true} isOpen={isOpen} onClose={onClose} />;
}

export default SuccessPopup;
