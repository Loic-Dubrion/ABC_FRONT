import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import cardReducer from './reducers/card';
import scenarioReducer from './reducers/sequence';
import sessionReducer from './reducers/session';
import convertReducer from './reducers/convert';

const store = configureStore({
  reducer: {
    user: userReducer,
    card: cardReducer,
    sequence: scenarioReducer,
    session: sessionReducer,
    convert: convertReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
