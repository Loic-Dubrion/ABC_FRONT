import { createAction, createReducer } from '@reduxjs/toolkit';

interface TableState {
  showTable: boolean;
  tool: string | null;
  tables: ITables[];
}

const initialState: TableState = {
  showTable: false,
  tool: '',
  tables: [],
};

export const showTable = createAction<boolean>('table/Show table');
export const getToolName = createAction<string>('tool/Get tool name');
export const createTable = createAction<ITables>(
  'Table reducer / Creating a new table'
);

const tableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showTable, (state, action) => {
      state.showTable = action.payload;
    })
    .addCase(getToolName, (state, action) => {
      state.tool = action.payload;
    })
    .addCase(createTable, (state, action) => {
      state.tables.push(action.payload);
    });
});

export default tableReducer;
