import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useApi } from '../../hooks/index.js';
import { closeModal } from '../../slices/modals';

const Delete = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const setCloseModal = () => dispatch(closeModal());
  const { item, typeItem } = useSelector(({ modalsSlice }) => modalsSlice);
  console.log(useSelector(({ modalsSlice }) => modalsSlice));
  const deleteItem = () => {
    typeItem === 'student' ? api.removeStudent(item) : api.removeLesson(item);
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
          <Button variant="danger" className="mx-1" onClick={() => deleteItem()}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Delete;