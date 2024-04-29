import Add from './Add.jsx';
import Delete from './Delete.jsx';
import Student from './Student.jsx';

const modals = {
  adding: Add,
  delete: Delete,
  student: Student
};

const getModal = (modalName) => modals[modalName];
export default getModal;
