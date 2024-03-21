import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../slices/modals';
import ModalStudent from './Modal.jsx'
import { selectors } from '../slices/students';

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }

const Students = () => {
  const dispatch = useDispatch();
  const students = useSelector(selectors.selectAll);
  const setShowModal = (type, item = null) => dispatch(showModal({ type, item }));
  return (
    <div className="container">
      {students.map((student) => {
        return (
          <div key={student.id} className="border rounded p-2 my-2">
            <span>{student.name}</span>
          </div>
        )
      })}
      <Button
        variant="primary"
        type="button"
        className="mt-auto"
        onClick={() => setShowModal('adding')}
      >
        <span>Добавить ученика</span>
      </Button>
      <ModalStudent />
    </div>
  );
}

export default Students;