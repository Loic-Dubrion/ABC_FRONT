import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';

interface CardState {
  cards: [];
}

const initialState: CardState = {
  cards: [],
};

export const getAllCards = createAsyncThunk(
  'card/fetch all cards', // nom de l'action
  async () => {
    const response = await axiosInstance.get('/storyBoard/cards');
    return response.data.data;
  }
);

const cardReducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllCards.pending, (state, action) => {
    state.cards = action.payload;
  });
});

export default cardReducer;
