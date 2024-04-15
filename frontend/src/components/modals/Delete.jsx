import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { db } from '../../firebase.js';
import { ref, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/index.js';
import { closeModal } from '../../slices/modals';

const Delete = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const setCloseModal = () => dispatch(closeModal());
  const item = useSelector(({ modalsSlice }) => modalsSlice.item);
  const deleteGroup = () => {
    const studentRef = ref(db, `users/${auth.user.uid}/${item}`);
    set(studentRef, null);
    setCloseModal();
  };

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span>Вы уверены?</span>
        <div className="d-flex justify-content-end">
          <Button variant="light" className="mx-1" onClick={() => setCloseModal()}>Отменить</Button>
          <Button variant="danger" className="mx-1" onClick={() => deleteGroup()}>Удалить</Button>
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default Delete;