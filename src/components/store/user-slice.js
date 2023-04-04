import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "regUser/fetchUser",
  async ({ userData, path }, { rejectWithValue }) => {
    try {
      const responseUser = await fetch(
        `https://blog.kata.academy/api/${path}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!responseUser.ok) {
        throw new Error("responseUser error");
      }

      const user = await responseUser.json();
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPut = createAsyncThunk(
  "regUser/fetchUserPut",
  async (userData, { rejectWithValue }) => {
    try {
      const userAuthorized = localStorage.getItem("user");
      const token = JSON.parse(userAuthorized).user.token;

      const responseUser = await fetch(`https://blog.kata.academy/api/user`, {
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,

          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(userData),
      });

      if (!responseUser.ok) {
        throw new Error("responseUser error");
      }

      const user = await responseUser.json();
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData: null,
    status: null,
    error: null,
  },
  reducers: {
    addUserData(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUser.fulfilled]: (state, actions) => {
      state.status = "resolved";
      state.userData = actions.payload;
      // console.log(actions.payload)
    },
    [fetchUser.rejected]: (state, actions) => {
      state.status = "rejected";
      state.error = actions.payload;
    },
    [fetchUserPut.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchUserPut.fulfilled]: (state, actions) => {
      state.status = "resolved";
      state.userData = actions.payload;
      // console.log(actions.payload)
    },
    [fetchUserPut.rejected]: (state, actions) => {
      state.status = "rejected";
      state.error = actions.payload;
    },
  },
});

export const { addUserData } = userSlice.actions;
export default userSlice.reducer;
