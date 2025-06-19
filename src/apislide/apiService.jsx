import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Création d’un service API avec RTK Query
export const apiService = createApi({
  // Nom utilisé dans le store Redux pour cet API
  reducerPath: "api",

  // Configuration de base des requêtes (base URL + headers)
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1", // URL racine pour toutes les requêtes
    prepareHeaders: (headers) => {
      // Ajoute le token d’authentification si présent dans le localStorage
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // Définition des endpoints (requêtes API)
  endpoints: (builder) => ({
    // Endpoint de login (POST) → mutation car ça modifie le backend
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials, // données envoyées dans le body
      }),
    }),

    // Endpoint pour récupérer les infos du profil utilisateur (GET)
    fetchUserProfile: builder.query({
      query: () => "/user/profile",
      providesTags: ["UserProfile"], // tag utilisé pour le cache
    }),

    // Endpoint pour modifier les infos du profil utilisateur (PUT)
    updateUserProfile: builder.mutation({
      query: (updatedUserData) => ({
        url: "/user/profile",
        method: "PUT",
        body: updatedUserData,
      }),
      invalidatesTags: ["UserProfile"], // invalide le cache après mise à jour
    }),
  }),
});

// RTK Query génère automatiquement des hooks React pour chaque endpoint
export const {
  useLoginUserMutation, // Mutation	pour effectuer un login (POST)
  useFetchUserProfileQuery, // Query	pour récupérer le profil utilisateur (GET)
  useUpdateUserProfileMutation, // Pour modifier le profil utilisateur (PUT)
} = apiService;
