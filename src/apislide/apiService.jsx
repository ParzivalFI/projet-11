// createApi fonction qui crée un "service" pour gérer les appels API.
// fetchBaseQuery : une fonction de base qui fait les appels fetch, avec des options personnalisables (comme les headers).
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1",
    prepareHeaders: (headers) => {
      // Récupérer le token depuis le localStorage à chaque requête
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // endpoints : permet de définir les différentes requêtes (endpoints)
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      // le query le fetch standard de RTK
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    fetchUserProfile: builder.query({
      query: () => "/user/profile", // Endpoint pour récupérer le profil utilisateur
      providesTags: ["UserProfile"], // c'est pour définir les entrées du cache
    }),
    updateUserProfile: builder.mutation({
      query: (updatedUserData) => ({
        url: "/user/profile",
        method: "PUT",
        body: updatedUserData,
      }),
      invalidatesTags: ["UserProfile"], // Invalide le cache après mise à jour
    }),
  }),
});

// RTK Query génère automatiquement des hooks React
export const {
  useLoginUserMutation, // Mutation	pour effectuer un login (POST)
  useFetchUserProfileQuery, // Query	pour récupérer le profil utilisateur (GET)
  useUpdateUserProfileMutation, // Pour modifier le profil utilisateur (PUT)
} = apiService;
