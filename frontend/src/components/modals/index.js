import Add from './Add.jsx';
import Delete from './Delete.jsx';

const modals = {
  adding: Add,
  delete: Delete
};

const getModal = (modalName) => modals[modalName];
export default getModal;
