import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ICards } from '../../../components/@types/cards';
import { ICard } from '../../../components/@types/card';

interface CardState {
  cards: ICards[] | null;
  card: ICard[] | null;
  isChecked: boolean;
}

const initialState: CardState = {
  cards: null,
  card: null,
  isChecked: false,
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

export const togglerCheckbox = createAction<boolean>(
  'card/Toggle checkbox bouton'
);

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(getOneCard.fulfilled, (state, action) => {
      state.card = action.payload;
    })
    .addCase(togglerCheckbox, (state) => {
      state.isChecked = !state.isChecked;
    });
});

export default cardReducer;
