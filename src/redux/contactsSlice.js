import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const actionCases = [fetchContacts, addContact, deleteContact];
const getActionType = type => actionCases.map(actionCase => actionCase[type]);
const handleFetchContactsSuccess = (state, action) => {
  state.contacts = action.payload;
};
const handleAddContactSuccess = (state, action) => {
  state.contacts.push(action.payload);
};
const deleteContactSuccess = (state, action) => {
  const index = state.contacts.findIndex(
    contact => contact.id === action.payload.id
  );
  state.contacts.splice(index, 1);
};

const anySuccsessCase = state => {
  state.isLoading = false;
  state.error = null;
};
const anyPendingCase = state => {
  state.isLoading = true;
};
const anyRejectedCase = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, handleFetchContactsSuccess)
      .addCase(addContact.fulfilled, handleAddContactSuccess)
      .addCase(deleteContact.fulfilled, deleteContactSuccess)
      .addMatcher(isAnyOf(...getActionType('fulfilled')), anySuccsessCase)
      .addMatcher(isAnyOf(...getActionType('pending')), anyPendingCase)
      .addMatcher(isAnyOf(...getActionType('rejected')), anyRejectedCase),
});
export const contactsReducer = contactsSlice.reducer;
