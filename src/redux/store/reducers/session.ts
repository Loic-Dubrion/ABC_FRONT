import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface SessionState {
  sessions: [];
}

const initialState: SessionState = {
  sessions: [],
};

export const createSession = createAsyncThunk(
  'sessionReducer/createNewSession', // nom de l'action
  async (sessionData: {
    name: string;
    sequence_id: number;
    card_id: number;
    tool_id: number;
    comments: string;
    time: number;
    is_face_to_face: boolean;
    is_group_work: boolean;
    equipment: string;
  }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.getItem('id')}/session`,
        sessionData
      );

      console.log('response:', response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const sessionReducer = createReducer(initialState, (builder) => {
  builder.addCase(createSession.fulfilled, (state, action) => {
    console.log('state :', state);
    console.log('action :', action);
  });
});

export default sessionReducer;
