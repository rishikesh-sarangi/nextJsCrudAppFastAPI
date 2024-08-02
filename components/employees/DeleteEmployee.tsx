import React from "react";
import { Button } from "react-bootstrap";

interface DeleteConfirmationContentProps {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const DeleteConfirmationContent: React.FC<DeleteConfirmationContentProps> = ({
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <>
      <p>{message}</p>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default DeleteConfirmationContent;
