import { Alert, Modal } from "antd";
import React from "react";

type TModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  id: string | null;
  title: string;
};

const BlockModal: React.FC<TModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  id,
  title,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes Block!"
        cancelText="No"
      >
        <Alert
          message="If you block this student, He will be blocked "
          type="warning"
          showIcon
        />
        {id}
      </Modal>
    </>
  );
};

export default BlockModal;
