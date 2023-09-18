import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ConvertState {}

const initialState: ConvertState = {};

export const convertToExcel = createAsyncThunk(
  'Convert reducer/Converting file to excel',
  async (sequenceId: string) => {
    try {
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/excel/${sequenceId}`
      );
      console.log('response :', response);
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

const convertReducer = createReducer(initialState, (builder) => {
  builder.addCase(convertToExcel.fulfilled, (state, action) => {
    console.log('state :', state);
    console.log('action :', action);
  });
});

export default convertReducer;
