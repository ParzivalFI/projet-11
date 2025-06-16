import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setCredentials, logoutUser } from "./action";
import { apiService } from "../apislide/apiService";

// Thunk pour le login utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const {
        body: { token },
      } = await dispatch(
        apiService.endpoints.loginUser.initiate(credentials)
      ).unwrap();

      if (!token) throw new Error("No token received");

      dispatch(setCredentials({ token, user: null }));

      const { body: user } = await dispatch(
        apiService.endpoints.fetchUserProfile.initiate()
      ).unwrap();

      if (user) {
        dispatch(setCredentials({ token, user }));
      }

      return { token, user };
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") ?? null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials, (state, { payload }) => {
        const { token, user } = payload;
        state.token = token;
        state.user = user;
        localStorage.setItem("token", token);
      })
      .addCase(logoutUser, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Login failed";
      });
  },
});

// Action de déconnexion avec reset du cache API
export const logoutWithReset = () => (dispatch) => {
  dispatch(logoutUser());
  dispatch(apiService.util.resetApiState());
};

export default authSlice.reducer;
