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
  toolId: string | number;
}

const initialState: CardState = {
  cards: null,
  card: null,
  isChecked: false,
  toolId: '',
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

export const getOneTool = createAsyncThunk(
  'Card reducer / Get one tool', // nom de l'action
  async (toolId: number) => {
    const response = await axiosInstance.get(`/user/tool/${toolId}/`);
    localStorage.setItem('tool_id', response.data.id);
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
    .addCase(getOneTool.fulfilled, (state, action) => {
      state.toolId = action.payload.id;
    })
    .addCase(togglerCheckbox, (state) => {
      state.isChecked = !state.isChecked;
    });
});

export default cardReducer;
