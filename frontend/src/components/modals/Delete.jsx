import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { db } from '../../firebase.js';
import { ref, set } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/index.js';
import { closeModal } from '../../slices/modals';
import { actions as studentsActions } from '../../slices/students';
import { actions as lessonsActions } from '../../slices/lessons';

const Delete = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  const setCloseModal = () => dispatch(closeModal());
  const student = useSelector(({ modalsSlice }) => modalsSlice.item);
  const deleteGroup = () => {
    console.log(student);
    const studentRef = ref(db, `users/${auth.user.uid}/${student.id}`);
    set(studentRef, null);
    dispatch(studentsActions.removeStudent(student));
    dispatch(lessonsActions.removeLessons(student.lessons));
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