import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ICards } from '../../../components/@types/cards';

interface CardState {
  cards: ICards[] | null;
}

const initialState: CardState = {
  cards: null,
};

export const getAllCards = createAsyncThunk(
  'card/fetch all cards',
  async () => {
    const response = await axiosInstance.get('/storyBoard/cards');
    console.log('response :', response);
    return response.data;
  }
);

const cardReducer = createReducer(initialState, (builder) => {
  builder.addCase(getAllCards.fulfilled, (state, action) => {
    state.cards = action.payload;
  });
});

export default cardReducer;
