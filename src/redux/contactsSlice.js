import { createSlice } from '@reduxjs/toolkit';
import {fetchContacts, addContact, deleteContact} from './operations';

// const contactsInitialState = {
//   contacts: [],
//   isLoading: false,
//   error: null,
// };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
    extraReducers: {
      [fetchContacts.pending](state) {
        state.isLoading = true;
      },
      [fetchContacts.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      },
      [fetchContacts.rejected](state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },

      [addContact.pending](state) {
        state.isLoading = true;
      },
      [addContact.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      },
      [addContact.rejected](state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },

      [deleteContact.pending](state) {
        state.isLoading = true;
      },
      [deleteContact.fulfilled](state, action) {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      },
      [deleteContact.rejected](state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },


    },
    // fetchingInProgress(state) {
    //   state.isLoading = true;
    // },
    // fetchingSuccess(state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.contacts = action.payload;
    // },
    // fetchingError(state, action) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  

  // addContact(state, action) {
  //   state.items = [...state.items, action.payload];
  // },
  // onDelContact(state, action) {
  //   state.items = state.items.filter(({ id }) => id !== action.payload);
  // },
});

// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
//   contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
