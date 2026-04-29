import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUsersAPI } from '../../services/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsersAPI();
      await AsyncStorage.setItem('users', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      const cached = await AsyncStorage.getItem('users');
      if (cached){
        return JSON.parse(cached);
      } 
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    filtered: [],
    visibleCount: 5,
    status: 'idle',
  },
  reducers: {
    searchUsers: (state, action) => {
      const query = action.payload.toLowerCase();

      state.filtered = state.list.filter(user =>
        user.name.toLowerCase().includes(query)
      );
    },
    loadMore: (state) => {
      state.visibleCount += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { searchUsers, loadMore } = userSlice.actions;
export default userSlice.reducer;