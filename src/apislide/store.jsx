import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Rebux/userSlice"; // Reducer personnalisé pour l’auth
import { apiService } from "../apislide/apiService"; // RTK Query service

export const store = configureStore({
  reducer: {
    // Slice de gestion de l’authentification
    auth: authReducer,

    // Reducer RTK Query (clé dynamique)
    [apiService.reducerPath]: apiService.reducer,
  },

  // Ajout du middleware RTK Query pour gérer les requêtes et le cache
  //Il permet à RTK Query de gérer les appels réseau, le cache, le polling, les erreurs, etc sans ce middleware, RTK Query ne fonctionnerait pas.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
