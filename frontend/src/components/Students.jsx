import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../slices/modals';
import { ReactComponent as ChildIcon } from '../assets/child-icon.svg';
import ModalStudent from './Modal.jsx'
import { selectors } from '../slices/students';

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectors.selectAll);
  console.log(students);
  const setShowModal = (type, item = null, typeItem = null) => dispatch(showModal({ type, item, typeItem }));
  return (
    <div className="students my-3 overflow-auto rounded bg-light">
      <Button
        variant="light"
        type="button"
        className="border m-2 border-2"
        onClick={() => setShowModal('adding')}
      >
        <span>Добавить группу</span>
      </Button>
      {students.map((student) => {
        return (
          <div key={student.id} className="d-flex justify-content-between border rounded p-2 m-2">
            <div>
              <ChildIcon className="m-1" />
              <span className='text-bold'>{student.name}</span>
            </div>
            <div>
              <Button
                onClick={() => setShowModal('student', student)}
                variant='light'
                className='border mx-1'
              >
                Open
              </Button>
              <Button
                onClick={() => setShowModal('delete', student, 'student')}
                variant='light'
                className='border'
              >
                Delete
              </Button>
            </div>
          </div>
        )
      })}
      <ModalStudent />
    </div>
  );
}

export default Students;
