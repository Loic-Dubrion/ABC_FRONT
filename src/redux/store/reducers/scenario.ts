import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ScenarioState {
  scenarioName: string | null;
  scenarioId: number | null;
  scenarios: IScenarios[];
}

const initialState: ScenarioState = {
  scenarioName: null,
  scenarioId: null,
  scenarios: [],
};

export const createScenario = createAsyncThunk(
  'Scenario reducer / Creating a new sequence',
  async (scenarioData: { name: string; user_id: string }) => {
    try {
      const response = await axiosInstance.post(
        `/user/${localStorage.getItem('id')}/sequence`,
        scenarioData
      );
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

export const getOneScenarios = createAsyncThunk(
  'Scenario reducer / Read one scenario', // nom de l'action
  async (scenarioId) => {
    const { data } = await axiosInstance.get(
      `/user/${localStorage.getItem('id')}/sequence/${scenarioId}`
    );
    return data;
  }
);
const scenarioReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllScenarios.fulfilled, (state, action) => {
      state.scenarios = action.payload;
    })
    .addCase(createScenario.fulfilled, (state, action) => {
      state.scenarioId = action.payload[0].id;
      state.scenarioName = action.payload[0].name;
    });
});

export default scenarioReducer;
