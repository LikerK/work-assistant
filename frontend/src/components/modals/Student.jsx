import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, showModal } from '../../slices/modals';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';


const Student = () => {
  const dispatch = useDispatch();
  const student = useSelector(({ modalsSlice }) => modalsSlice.item);
  const { name, lessons } = student;
  const setCloseModal = () => dispatch(closeModal());
  const setShowModal = (type, item = null, typeItem = null) => dispatch(showModal({ type, item, typeItem }));
  const openDeleteModal = (lesson) => {
    setCloseModal();
    setShowModal('delete', { student, lesson }, 'lessons');
  };
  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column'>
        {lessons.map((lesson) => {
          const today = new Date();
          const date = new Date(lesson.lessonDate);
          const isCompleted = date.getTime() < today.getTime();
          const classes = cn(
            'd-flex',
            'justify-content-between',
            'align-items-center',
            'p-1',
            'm-1',
            'border',
            'rounded',
            isCompleted ? ['bg-light', 'text-muted'] : ['bg-pass', 'fw-bold'],
          );
          const time = date.toLocaleTimeString().slice(0, -3);
          const day = date.toLocaleDateString('ru-RU');
          return (
            <div key={lesson.id} className={classes}>
              <div>
                <span>{lesson.name}</span>
                <br />
                <span>{day} | {time}</span>
              </div>
              <Button
                type="button"
                className="p-0 bg-transparent border-0"
                onClick={() => openDeleteModal(lesson)}
              >
                <DeleteIcon />
              </Button>
            </div>
          )})}
      </Modal.Body>
    </Modal>
  )
};

export default Student;