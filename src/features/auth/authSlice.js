import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";
import { clientId, clientSecret, grantType } from "./config";

export const login = createAsyncThunk("auth/login", async userCredential => {
  const body = new FormData();
  body.append("grant_type", grantType);
  body.append("username", userCredential.username);
  body.append("password", userCredential.password);

  const config = {
    auth: {
      username: clientId,
      password: clientSecret
    },
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  const res = await Axios.post("/oauth/token", body, config);
  return res.data;
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async ({userId, accessToken}) => {
  console.log(accessToken);
  const res = await Axios.get(`/user/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  return res.data;
});

const initialState = {
  user: {
    id: null,
    username: null,
    name: null,
    gender: null,
    phone: null,
    address: null,
    role: null,
    avatar: null,
    accessToken: null,
    refreshToken: null
  },
  loginStatus: "idle"
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
     logout(state, action) {
        state = initialState
     }
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.loginStatus = "loading";
    })
    .addCase(login.fulfilled, (state, {payload}) => {
      state.loginStatus = "succeeded";
      state.user.id = payload.user_id;
      state.user.accessToken = payload.access_token;
      state.user.refreshToken = payload.refresh_token;
    })
    .addCase(login.rejected, (state) => {
      state.loginStatus = "failed"
    })
    .addCase(fetchUser.fulfilled, (state, {payload}) => {
      const user = payload.data;
      Object.keys(user)
      .filter(key => !["createdAt", "modifiedAt", "active"].includes(key))
      .forEach(key => state.user[key] = user[key]);
    });
  }
});

export const {logout} = authSlice.actions;

export default authSlice.reducer;