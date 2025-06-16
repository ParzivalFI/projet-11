import React from "react";
// import Header from "./components/Header/Header";
// import AccountCard from "./components/AccountCard/AccountCard";
// import Footer from "./components/Footer/Footer";
// import Login from "./components/Sign_In/Login";
// import Home from "./components/Pages/Home";
// import SignIn from "./components/Sign-In/SignIn";
// import Login from "./components/Pages/Connexion";
// import "./style/main.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";
import { store } from "./apislide/store";
import Connexion from "./components/Pages/Connexion";
import Home from "./components/Pages/Home";
import Profil from "./components/Pages/Profil";
import ProtegeRoute from "./components/protegeRoute/ProtegeRoute";
import { setCredentials } from "./Rebux/action";
import { apiService } from "./apislide/apiService";

function AppContent() {
  // un hook de Redux qui permet d’envoyer des actions au store Redux. Tu vas t’en servir pour :
  // enregistrer les infos de connexion (setCredentials)
  // déclencher un appel API (apiService.endpoints.fetchUserProfile.initiate())
  const dispatch = useDispatch();

  useEffect(() => {
    // Récupération du token
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // si le token existe on envoie une action Redux setCredentials pour enregistrer le token dans le store
    if (token) {
      dispatch(setCredentials({ token, user: null }));
      // permet de lancer manuellement une requête RTK Query.
      dispatch(apiService.endpoints.fetchUserProfile.initiate())
        .unwrap() // transforme la promesse RTK Query en une promesse classique JS
        .then((response) => {
          // Si la requête réussit, on met à jour les credentials avec le profil utilisateur complet
          dispatch(setCredentials({ token, user: response.body }));
        })
        .catch((err) => {
          console.error("Erreur de chargement du profil:", err);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<Home />} />
        <Route path="/login" element={<Connexion />} />
        <Route
          path="/Profil"
          element={
            <ProtegeRoute>
              <Profil />
            </ProtegeRoute>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

// import React from "react";
// // import Header from "./components/Header/Header";
// // import AccountCard from "./components/AccountCard/AccountCard";
// // import Footer from "./components/Footer/Footer";
// // import Login from "./components/Sign-In/Login";
// import SignIn from "./components/Sign-In/SignIn";
// import { Routes, Route } from "react-router";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="sign-in" element={<SignIn />} />
//     </Routes>
//   );
// };

// export default App;
