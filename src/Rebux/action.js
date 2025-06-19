// createAction est une fonction qui permet de créer facilement des actions Redux sans avoir à écrire manuellement un objet { type: "...", payload: ... }. Grace a  Redux Toolkit
import { createAction } from "@reduxjs/toolkit";

// Action Redux pour enregistrer les identifiants (token, user)
export const setCredentials = createAction("auth/setCredentials");

// Action Redux pour déconnecter l’utilisateur
export const logoutUser = createAction("auth/logoutUser");
