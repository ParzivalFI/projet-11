import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice : permet de créer un slice Redux (état + reducers) et createAsyncThunk pour créer une action asynchrone
import { setCredentials, logoutUser } from "./action";
import { apiService } from "../apislide/apiService"; // service RTK Query pour les appels API

// Thunk async : effectue le login + récupération du profil
export const loginUser = createAsyncThunk(
  "auth/loginUser", // nom de l'action
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      // Appel du endpoint login (POST) avec les credentials
      const {
        body: { token },
      } = await dispatch(
        apiService.endpoints.loginUser.initiate(credentials)
      ).unwrap();

      // sert à vérifier que le backend a bien renvoyé un token après l'appel à l'API de login. et ell protège le reste du code contre un cas où le token serait undefined ou null
      if (!token) throw new Error("No token received");

      // On stocke le token dans Redux via l’action personnalisée
      dispatch(setCredentials({ token, user: null }));

      // Appel pour récupérer les infos du profil utilisateur (GET)
      const { body: user } = await dispatch(
        apiService.endpoints.fetchUserProfile.initiate()
      ).unwrap(); //.unwrap() permet d'obtenir directement les données ou une erreur, pour pouvoir les traiter avec try/catch

      // Si profil récupéré → stocké dans Redux
      if (user) {
        dispatch(setCredentials({ token, user }));
      }

      return { token, user };
    } catch (err) {
      // En cas d’erreur → rejeté avec message
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// État initial du slice d’auth
const initialState = {
  token: localStorage.getItem("token") ?? null, // token : récupéré depuis le localStorage si présent.
  user: null, // user : utilisateur connecté.
  loading: false, // loading : indique si une requête est en cours.
  error: null, // error : contient un éventuel message d’erreur.
};

// Création du slice Redux pour l’authentification
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // Actions classiques déplacées dans un autre fichier (voir plus bas)

  // Gestion des actions asynchrones et personnalisées
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials, (state, { payload }) => {
        const { token, user } = payload;
        state.token = token;
        state.user = user;
        localStorage.setItem("token", token); // Persistance du token
      })
      .addCase(logoutUser, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("token"); // Suppression du token local
      })
      .addCase(loginUser.pending, (state) => {
        // pending : démarre le chargement.
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        // fulfilled : login réussi, on met à jour token et user.
        state.loading = false;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        // rejected : login échoué, on met l’erreur.
        state.loading = false;
        state.error = payload || "Login failed";
      });
  },
});

// Action personnalisée de logout + réinitialisation du cache RTK Query
export const logoutWithReset = () => (dispatch) => {
  dispatch(logoutUser()); // Réinitialise le slice auth
  dispatch(apiService.util.resetApiState()); // Réinitialise le cache API
};

// on exporte le reducer du slice, à utiliser dans le store Redux.
export default authSlice.reducer;
