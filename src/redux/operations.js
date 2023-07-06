import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from "./contactsSlice";

axios.defaults.baseURL = "https://64a68283096b3f0fcc7fee18.mockapi.io";

 export const fetchContacts = createAsyncThunk("contacts/fetchAll", 
 async (_, thunkAPI) => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async ({name, number}, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", { name, number });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// const fetchContacts = () => async dispatch => {
//   try {
//     dispatch(fetchingInProgress());
//     const response = await axios.get("/contacts");
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(fetchingError(e.message));
//   }
// };


