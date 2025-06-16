// createAction est une fonction qui permet de créer facilement des actions Redux sans avoir à écrire manuellement un objet { type: "...", payload: ... }.
import { createAction } from "@reduxjs/toolkit";

// crée une action nommée "auth/setCredentials".
// elle est utilisée pour enregistrer les informations de connexion dans le store Redux, comme le token et éventuellement les infos utilisateur.
export const setCredentials = createAction("auth/setCredentials");
// crée une action "auth/logoutUser".
// elle est déclenchée pour déconnecter l’utilisateur (vider le token et les infos du store).
export const logoutUser = createAction("auth/logoutUser");
