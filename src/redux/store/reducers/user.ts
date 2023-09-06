import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../../components/@types/decodedToken';

interface UserState {
  isLogged: boolean;
  username: string | null;
  id: string | null;
  roles: string[] | null;
  permissions: string[] | null;
  accessToken: string;
  refreshToken: string | null;
}

const initialState: UserState = {
  isLogged: false,
  username: null,
  id: null,
  roles: null,
  permissions: null,
  accessToken: '',
  refreshToken: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post('/log/in', formData);
      if (response.data.status === 'success') {
        const { accessToken, refreshToken } = response.data.data;

        // Décodage du token d'acces
        const decodedToken: DecodedToken = jwtDecode(accessToken);
        const { id, username, roles, permissions } = decodedToken.data;

        // Stockage des tokens et des données
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', id.toString());
        localStorage.setItem('username', username);
        localStorage.setItem('roles', JSON.stringify(roles));
        localStorage.setItem('permissions', JSON.stringify(permissions));
      }
      return response.data.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.isLogged = false;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLogged = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      const { data }: DecodedToken = jwtDecode(state.accessToken);
      state.id = data.id.toString();
      state.username = data.username;
      state.roles = data.roles;
      state.permissions = data.permissions;
    });
});

export default userReducer;
