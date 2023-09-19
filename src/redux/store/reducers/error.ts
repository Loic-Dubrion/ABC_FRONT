import { createAction, createReducer } from '@reduxjs/toolkit';
import { AxiosError } from 'axios'; // Importez AxiosError depuis axios

interface ErrorState {
  error: AxiosError | null; // Définissez error comme étant de type AxiosError | null
}

const initialState: ErrorState = { error: null };

export const setError = createAction<AxiosError>(
  'Error reducer/Catch the error'
);

const errorReducer = createReducer(initialState, (builder) => {
  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });
});

export default errorReducer;
