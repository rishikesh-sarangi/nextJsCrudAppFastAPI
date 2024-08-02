import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ReusableModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  footer?: React.ReactNode; // optional prop example
  children: React.ReactNode; // for body content
}
const ResuseableModal: React.FC<ReusableModalProps> = ({
  show,
  onHide,
  title,
  footer,
  children,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default ResuseableModal;
