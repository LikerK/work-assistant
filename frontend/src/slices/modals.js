import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  item: null,
  typeItem: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      state.type = payload.type;
      state.item = payload.item;
      state.typeItem = payload.typeItem;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
      state.typeItem = null;
    },
  },
});

export const { showModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;