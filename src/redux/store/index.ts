import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import cardReducer from './reducers/card';
import tableReducer from './reducers/table';
import scenarioReducer from './reducers/scenario';
import sessionReducer from './reducers/session';

const store = configureStore({
  reducer: {
    user: userReducer,
    card: cardReducer,
    table: tableReducer,
    scenario: scenarioReducer,
    session: sessionReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
