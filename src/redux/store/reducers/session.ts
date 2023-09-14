import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface SessionState {
  sessions: [];
  isOpen: boolean;
}

const initialState: SessionState = {
  sessions: [],
  isOpen: false,
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

export const deleteSession = createAsyncThunk(
  'Session reducer/The session was deleted ', // nom de l'action
  async (sessionId: number) => {
    const response = await axiosInstance.delete(
      `/user/${localStorage.getItem('id')}/session/${sessionId}`
    );
    console.log('response :', response);
    return response.data;
  }
);

export const updateSession = createAsyncThunk(
  'Session reducer / The session was updated', // nom de l'action
  async (sessionData: {
    name: string;
    activity_id: number;
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

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const openModal = createAction<boolean>('Session reducer/Modal toggled');

const sessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createSession.fulfilled, (state, action) => {
      console.log('state :', state);
      console.log('action :', action);
    })
    .addCase(deleteSession.fulfilled, () => {})
    .addCase(openModal, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default sessionReducer;
