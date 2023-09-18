import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ISession } from '../../../components/@types/session';

interface SessionState {
  sessions: [];
  isOpen: boolean;
  session: ISession | null;
}

const initialState: SessionState = {
  sessions: [],
  isOpen: false,
  session: null,
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

      localStorage.removeItem('card_id');

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const readOneSession = createAsyncThunk(
  'Session reducer / Get one session ', // nom de l'action
  async (sessionId: number) => {
    const response = await axiosInstance.get(
      `/user/${localStorage.getItem('id')}/session/${sessionId}`
    );
    localStorage.setItem('session_id', response.data.id);
    localStorage.setItem('tool_id', response.data.tool_id);
    return response.data;
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
  'Session reducer/updateSession', // nom de l'action
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    console.log('objData :', objData);
    const response = await axiosInstance.put(
      `/user/${localStorage.getItem('id')}/session/${localStorage.getItem(
        'session_id'
      )}`,
      objData
    );
    return response.data;
  }
);

export const openModal = createAction<boolean>('Session reducer/Modal toggled');

const sessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createSession.fulfilled, () => {})
    .addCase(deleteSession.fulfilled, () => {})
    .addCase(readOneSession.fulfilled, (state, action) => {
      state.session = action.payload;
    })
    .addCase(openModal, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default sessionReducer;
