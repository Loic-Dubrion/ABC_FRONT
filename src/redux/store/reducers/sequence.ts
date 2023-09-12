import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ScenarioState {
  scenarioName: string | null;
  scenarioId: number | null;
  scenarios: IScenarios[];
  scenario: [];
  message: string | null;
}

const initialState: ScenarioState = {
  scenarioName: null,
  scenarioId: null,
  scenarios: [],
  scenario: [],
  message: null,
};

export const createScenario = createAsyncThunk(
  'Scenario reducer / Creating a new sequence',
  async (scenarioData: { name: string; user_id: string }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.getItem('id')}/sequence`,
        scenarioData
      );
      console.log('response :', response);
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const getAllScenarios = createAsyncThunk(
  'Scenario reducer /getAllScenarios', // nom de l'action
  async () => {
    const { data } = await axiosInstance.get(
      `/user/${localStorage.getItem('id')}/sequence/`
    );
    return data;
  }
);

export const getOneScenario = createAsyncThunk(
  'Scenario reducer / Read one scenario', // nom de l'action
  async (scenarioId: string) => {
    try {
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/${scenarioId}`
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const deleteScenario = createAsyncThunk(
  'Scenario reducer / The scenario was deleted', // nom de l'action
  async (scenarioId: number) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/${localStorage.getItem('id')}/sequence/${scenarioId}`
      );
      return data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const updateScenario = createAsyncThunk(
  'Scenario reducer / The scenario was updated',
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

const scenarioReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllScenarios.fulfilled, (state, action) => {
      state.scenarios = action.payload;
      state.message = null;
    })
    .addCase(getOneScenario.fulfilled, (state, action) => {
      state.scenario = action.payload;
    })
    .addCase(createScenario.fulfilled, (state, action) => {
      action.payload.map(
        (e: { id: number | null; name: string | null }) => (
          (state.scenarioId = e.id), (state.scenarioName = e.name)
        )
      );
    })
    .addCase(deleteScenario.fulfilled, (state, action) => {
      state.message = action.payload;
    })
    .addCase(updateScenario.fulfilled, (action) => {
      console.log('action :', action);
    });
});

export default scenarioReducer;
