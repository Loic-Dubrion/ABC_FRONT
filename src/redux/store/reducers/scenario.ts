import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface ScenarioState {
  scenarioName: string | null;
  scenarioId: number | null;
}

const initialState: ScenarioState = {
  scenarioName: null,
  scenarioId: null,
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

const scenarioReducer = createReducer(initialState, (builder) => {
  builder.addCase(createScenario.fulfilled, (state, action) => {
    state.scenarioId = action.payload[0].id;
    state.scenarioName = action.payload[0].name;
  });
});

export default scenarioReducer;
