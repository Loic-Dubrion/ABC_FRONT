import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ICards } from '../../../components/@types/cards';
import { ICard } from '../../../components/@types/card';

interface CardState {
  cards: ICards[] | null;
  card: ICard[] | null;
}

const initialState: CardState = {
  cards: null,
  card: null,
};

export const getAllCards = createAsyncThunk(
  'cards/fetch all cards',
  async () => {
    const response = await axiosInstance.get('/storyBoard/cards');
    return response.data;
  }
);

export const getOneCard = createAsyncThunk(
  'card/fetch a specific card',
  async (cardId: string) => {
    const response = await axiosInstance.get(`storyBoard/cards/${cardId}`);
    return response.data;
  }
);

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(getOneCard.fulfilled, (state, action) => {
      state.card = action.payload;
      console.log('state.card :', state.card);
    });
});

export default cardReducer;
