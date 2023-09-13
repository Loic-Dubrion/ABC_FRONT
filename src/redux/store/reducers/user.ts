import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../../components/@types/decodedToken';

interface UserState {
  isLogged: string | null;
  username: string | null;
  id: string | null;
  roles: string[] | null;
  permissions: string[] | null;
  accessToken: string;
  refreshToken: string | null;
  isOpen: boolean;
}

const initialState: UserState = {
  isLogged: localStorage.getItem('accessToken') || null,
  username: localStorage.getItem('username') || null,
  id: localStorage.getItem('userId') || null,
  roles:
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('roles') !== null
      ? localStorage.getItem('roles')!.split(',')
      : [],
  permissions:
    typeof localStorage !== 'undefined' &&
    localStorage.getItem('permission') !== null
      ? localStorage.getItem('permission')!.split(',')
      : [],
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || null,
  isOpen: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post('/log/in', formData);
      return response.data.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const logout = createAction('user/logout');
export const toggleDropDown = createAction<boolean>('Toggle Dropdown Menu');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLogged = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isOpen = false;
      state.isLogged = action.payload.accessToken;
      const accessToken: DecodedToken = jwt_decode(action.payload.accessToken);
      const { id, username, roles, permissions } = accessToken.data;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles as string);
      localStorage.setItem('permissions', permissions as string);
      state.username = username;
      state.roles = roles as string[];
    })
    .addCase(logout, (state) => {
      state.isOpen = false;
      state.isLogged = null;
      state.username = null;
      state.id = null;
      state.accessToken = '';
      state.refreshToken = '';
      state.permissions = null;
      state.roles = [];
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('roles');
      localStorage.removeItem('permissions');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
      localStorage.removeItem('tool_id');
      localStorage.removeItem('card_id');
    })
    .addCase(toggleDropDown, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default userReducer;
