import { createAction, createReducer } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios'; // Importez AxiosError depuis axios

interface ErrorState {
  error: AxiosError | null; // Définissez error comme étant de type AxiosError | null
  message: AxiosResponse | null;
}

const initialState: ErrorState = { error: null, message: null };

export const setError = createAction<AxiosError>(
  'Error reducer/Catch the error'
);

export const setMessage = createAction<AxiosResponse | null>(
  'Error reducer/Catch the response'
);

const errorReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setMessage, (state, action) => {
      state.message = action.payload;
    });
});

export default errorReducer;
