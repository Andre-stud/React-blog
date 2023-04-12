import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('regUser/fetchUser', async ({ userData, path }) => {
  try {
    const responseUser = await fetch(`https://blog.kata.academy/api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    });

    if (!responseUser.ok) {
      throw new Error('error');
    }

    const user = await responseUser.json();
    localStorage.setItem('user', JSON.stringify(user));

    return responseUser.ok;
  } catch (error) {
    return error.message;
  }
});

export const fetchUserPut = createAsyncThunk('regUser/fetchUserPut', async (userData) => {
  try {
    const userAuthorized = localStorage.getItem('user');
    const { token } = JSON.parse(userAuthorized).user;

    const responseUser = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,

        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(userData),
    });

    if (!responseUser.ok) {
      throw new Error('responseUser error');
    }

    const user = await responseUser.json();
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: null,
    status: null,
  },
  reducers: {
    addUserData(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUser.fulfilled]: (state, actions) => {
      state.status = 'resolved';
      state.userData = actions.payload;
    },
    [fetchUser.rejected]: (state) => {
      state.status = 'rejected';
    },
    [fetchUserPut.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUserPut.fulfilled]: (state, actions) => {
      state.status = 'resolved';
      state.userData = actions.payload;
    },
    [fetchUserPut.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export const { addUserData } = userSlice.actions;
export default userSlice.reducer;
