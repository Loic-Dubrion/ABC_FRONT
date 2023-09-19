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
  alert: string | null;
  deleteSessionModal: boolean;
}

const initialState: SessionState = {
  sessions: [],
  isOpen: false,
  session: null,
  alert: null,
  deleteSessionModal: false,
};

export const createSession = createAsyncThunk(
  'Session reducer/createSession', // nom de l'action
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);
    const response = await axiosInstance.post(
      `/user/${localStorage.getItem('id')}/session`,
      objData
    );
    return response.data;
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
export const resetSessionAlert = createAction('Session reducer/Alert clear');
export const openDeleteSessionModal = createAction<boolean>(
  'Session reducer/Toggle delete session modal'
);

const sessionReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createSession.fulfilled, (state) => {
      state.alert = 'La session a été créée';
    })
    .addCase(deleteSession.fulfilled, (state) => {
      state.alert = 'La session a été supprimée';
    })
    .addCase(updateSession.fulfilled, (state) => {
      state.alert = 'La session a été mise à jour';
    })
    .addCase(readOneSession.fulfilled, (state, action) => {
      state.session = action.payload;
    })
    .addCase(openModal, (state) => {
      state.isOpen = !state.isOpen;
    })
    .addCase(resetSessionAlert, (state) => {
      state.alert = null;
    })
    .addCase(openDeleteSessionModal, (state) => {
      state.deleteSessionModal = !state.deleteSessionModal;
    });
});

export default sessionReducer;
