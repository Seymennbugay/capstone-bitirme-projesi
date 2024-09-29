import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useModal } from '../contexts/ModalContext';

function ErrorModal() {
  const { errorMessage, hideModal } = useModal();

  return (
    <Modal show={!!errorMessage} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Hata</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={hideModal}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;







