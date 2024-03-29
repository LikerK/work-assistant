import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ref, set, push, getDatabase, update, on } from "firebase/database";
import { useAuth } from '../../hooks/index.js';
import { useBd } from '../../hooks/index.js';
import { actions as studentsActions } from '../../slices/students';
import { actions as lessonsActions } from '../../slices/lessons';
import { closeModal } from '../../slices/modals';
import getSchedule from '../../util.js';
import { db } from '../../firebase.js';
import _  from 'lodash';

const AddLessonForm = ({ formik, id }) => {
  return (
    <div className="d-flex my-2 justify-content-around">
      <Form.Group className="w-100">
        <Form.Select
          size="sm"
          name={`lessons[${id}].day`}
          id="day"
          onChange={formik.handleChange}
          aria-label="День недели"
        >
          <option>Выбери день недели</option>
          <option value="1">Понедельник</option>
          <option value="2">Вторник</option>
          <option value="3">Среда</option>
          <option value="4">Четверг</option>
          <option value="5">Пятница</option>
          <option value="6">Суббота</option>
          <option value="0">Воскресенье</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mx-1">
        <Form.Control
          size="sm"
          type="time"
          name={`lessons[${id}].time`}
          placeholder="Часы"
          onChange={formik.handleChange}
          value={formik.values.hours}
        />
      </Form.Group>
    </div>
  )
};

const ModalStudent = () => {
  const auth = useAuth();
  const [countLessons, setCountLessons] = useState(1);
  const arrayLessons = [...Array(countLessons).keys()];
  const dispatch = useDispatch();
  const lastId = 0;
  const setCloseModal = () => dispatch(closeModal());

  const inputElement = useRef();

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Не должно быть пустым')
      .min(3, 'Минимальная длинна 3 символа')
      .max(20, 'Максимальна длинна 20 символов')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      startLessons: '',
      price: '',
      lessons: [{ id: 0, time: '', day: '', minutes: '', hours: '', type: '' }],
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      try {
        const lessonsRef = ref(db, `users/${auth.user.uid}/${values.name}/lessons`);
        const lessonsArray = getSchedule(values, lastId);
        const lessons = lessonsArray.map((lesson) => {
          const newLessonRef = push(lessonsRef);
          const newLesson = {
            id: newLessonRef.key,
            lessonDate: lesson.lessonDate,
            name: values.name,
            price: '',
            passed: true
          };
          set(newLessonRef, newLesson);
          return newLesson;
        });
        const student = { id:_.uniqueId(), name: values.name, lessons: lessons };
        dispatch(studentsActions.addStudent(student));
        dispatch(lessonsActions.addLessons(lessons));
      }
      catch (e) {
        console.log(e);
      }
    }
  });

  const handleLessons = (id, type) => {
    if (type === 'add') {
      setCountLessons(countLessons + 1);
      formik.values.lessons.push({ id: id, time: '', day: '', minutes: '', hours: '' });
    }
    else if (type === 'remove' && countLessons > 1) {
      setCountLessons(countLessons - 1);
      const newLessons = formik.values.lessons.filter((lesson) => lesson.id !== id);
      formik.values.lessons = newLessons;
    }
  }

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить группу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="my-1">
            <Form.Label htmlFor="name">Имя</Form.Label>
            <FormControl
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
              isInvalid={formik.touched.name && formik.errors.name}
            />
          </FormGroup>
          <FormGroup className="my-1">
            <Form.Label htmlFor="type">Тип группы</Form.Label>
            <Form.Select
              size="s"
              name="type"
              id="type"
              onChange={formik.handleChange}
              aria-label="День недели"
            >
              <option value="absentia">Заочно</option>
              <option value="group">Группа</option>
              <option value="one">Мастер класс</option>
            </Form.Select>
          </FormGroup>
          <hr />
          <span>Дата начала обучения</span>
          <Form.Group className="my-1">
            <Form.Control
              type="date"
              name="startLessons"
              onChange={formik.handleChange}
              value={formik.values.startLessons}
            />
          </Form.Group>
          <hr />
          <span>Количество уроков в неделю</span>
          {arrayLessons.map((i) => (<AddLessonForm key={i} id={i} formik={formik} />))}

          <div className="d-flex">
            <Button
              onClick={() => handleLessons(countLessons, 'add')}
              variant="dark"
              size="sm"
              className="mx-1"
            >
              <span>+</span>
            </Button>
            <Button
              onClick={() => handleLessons(countLessons, 'remove')}
              variant="light"
              size="sm"
              className="mx-1"
            >
              <span>-</span>
            </Button>
          </div>
          <div className="d-flex justify-content-end">
            <Button onClick={setCloseModal} variant="secondary" className="me-2">
              Закрыть
            </Button>
            <Button disabled={formik.isSubmitting} type="submit">Добавить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalStudent;
