import DoneIcon from "@assets/icons/Done.svg";
import { Button } from "@shared/ui/button/button.tsx";
import { Modal } from "@shared/ui/modal/modal.tsx";
import { useNavigate } from "react-router-dom";

export const RegistrationSuccessModal = () => {
  const navigate = useNavigate();
  return (
    <Modal
      onClose={() => navigate("/")}
      title="Важе предложение создано"
      description="Теперь вы можете предложить обмен"
      image={DoneIcon}
      imageAlt="Готово"
    >
      <Button onClick={() => navigate("/")}>Готово</Button>
    </Modal>
  );
};
