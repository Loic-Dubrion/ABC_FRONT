import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ISequence } from '../../../components/@types/sequence';

interface SequenceState {
  sequenceName: string | null;
  sequenceId: number | null;
  sequences: ISequences[];
  sequence: ISequence[];
  alert: string | null;
  toggle: boolean;
}

const initialState: SequenceState = {
  sequenceName: null,
  sequenceId: null,
  sequences: [],
  sequence: [],
  alert: null,
  toggle: false,
};

export const createSequence = createAsyncThunk(
  'sequence reducer / Creating a new sequence',
  async (sequenceData: { name: string; user_id: string }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.getItem('id')}/sequence`,
        sequenceData
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const getAllSequences = createAsyncThunk(
  'Sequence reducer/Get all sequences', // nom de l'action
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/`
      );
      return data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const getOneSequence = createAsyncThunk(
  'Sequence reducer / Get one sequence', // nom de l'action
  async (sequenceId: string) => {
    try {
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const deleteSequence = createAsyncThunk(
  'Sequence reducer / Sequence was deleted', // nom de l'action
  async (sequenceId: number) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`
      );
      return data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const updateSequence = createAsyncThunk(
  'Sequence reducer / Sequence was updated',
  async ({ name, sequenceId }: { name: string; sequenceId: string }) => {
    try {
      const response = await axiosInstance.put(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`,
        { name }
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const toggleUpdateSequenceMenu = createAction<boolean>(
  'Sequence reducer/Toggle modal state'
);

export const resetAlert = createAction('Sequence reducer/Reset alert state');

const sequenceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllSequences.fulfilled, (state, action) => {
      state.sequences = action.payload;
    })
    .addCase(getOneSequence.fulfilled, (state, action) => {
      state.sequence = action.payload;
    })
    .addCase(createSequence.fulfilled, (state, action) => {
      action.payload.map((e: { id: number; name: string }) => {
        state.sequenceId = e.id;
        localStorage.setItem('sequence_name', e.name);
      });
      state.alert = 'Le scénario a été crée';
    })
    .addCase(deleteSequence.fulfilled, (state) => {
      state.alert = 'Le scénario a été supprimé';
    })
    .addCase(updateSequence.fulfilled, (state, action) => {
      state.alert = 'Le scénario a été mis à jour';
      action.payload.map((element: { name: string; id: number }) => {
        state.sequenceId = element.id;
        localStorage.setItem('sequence_name', element.name);
      });
    })
    .addCase(toggleUpdateSequenceMenu, (state) => {
      state.toggle = !state.toggle;
    })
    .addCase(resetAlert, (state) => {
      state.alert = null;
    });
});

export default sequenceReducer;
