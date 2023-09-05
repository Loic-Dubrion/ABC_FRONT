import { createAction, createReducer } from '@reduxjs/toolkit';

interface GlobalState {
  globalReducer: [];
}

const initialState: GlobalState = {
  globalReducer: [],
};

export const exemple = createAction<string>('global/exemple');

const globalReducer = createReducer(initialState, (builder) => {
  builder.addCase(exemple, (state) => {
    state.globalReducer;
  });
});

export default globalReducer;
