import { createAction, createReducer } from '@reduxjs/toolkit';

interface TableState {
  showTable: boolean;
  tables: ITables[];
  tableId: number;
  currentId: number | null;
}

const initialState: TableState = {
  showTable: false,
  tables: [],
  tableId: 0,
  currentId: null,
};

export const showTable = createAction<boolean>('table/Show table');
export const getTableId = createAction<number>('Table reducer / Get table id');
export const createTable = createAction<ITables>(
  'Table reducer / Creating a new table'
);
export const deleteTable = createAction<number>(
  'Table reducer / Table was deleted'
);

const tableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showTable, (state, action) => {
      state.showTable = action.payload;
    })
    .addCase(getTableId, (state, action) => {
      state.tableId = action.payload;
    })
    .addCase(createTable, (state, action) => {
      state.tableId += 1;
      action.payload.id = state.tableId;
      state.tables.push(action.payload);
    })
    .addCase(deleteTable, (state, action) => {
      state.tables = state.tables.filter(
        (table) => table.id !== action.payload
      );
    });
});

export default tableReducer;
