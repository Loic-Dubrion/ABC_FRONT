import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ScenarioState {
  scenarioName: string | null;
  scenarioId: number | null;
  scenarios: [];
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
    const response = await axiosInstance.get(
      `/user/${localStorage.getItem('id')}/sequence/`
    );
    console.log('response :', response);
    return response.data;
  }
);

const scenarioReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllScenarios.fulfilled, (state, action) => {
      console.log('action :', action);
      console.log('state :', state);
    })
    .addCase(createScenario.fulfilled, (state, action) => {
      state.scenarioId = action.payload[0].id;
      state.scenarioName = action.payload[0].name;
    });
});

export default scenarioReducer;
