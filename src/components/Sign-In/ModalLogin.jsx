// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleUser as faCircleUserSolid } from "@fortawesome/free-solid-svg-icons";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { login, fetchProfile } from "../../Rebux/Utilisateur";

// // Composant fonctionnel pour la page de connexion
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   // Utilisation du sélecteur Redux pour obtenir l'état d'erreur et de chargement lié à l'authentification
//   const { error, loading } = useSelector((state) => state.auth);

//   // Utilise `useDispatch` pour envoyer des actions Redux
//   const dispatch = useDispatch();

//   // Hook `useNavigate` pour rediriger l'utilisateur vers une autre page après connexion
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("rememberedEmail");
//     if (storedEmail) {
//       setEmail(storedEmail);
//       setRememberMe(true); // Active la case "Se souvenir de moi"
//     }
//   }, []); // le tableau vide signifie que cet effet ne s'exécute qu'une seule fois

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (rememberMe) {
//       localStorage.setItem("rememberedEmail", email); // Stocke l'email dans le localStorage
//     } else {
//       localStorage.removeItem("rememberedEmail"); // Sinon supprime l'email stocké
//     }

//     const result = await dispatch(login({ email, password }));
//     if (result.meta.requestStatus === "fulfilled") {
//       const user = await dispatch(fetchProfile(result.payload.token));
//       navigate("/user");
//     } else {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-full">
//       <main className="flex-grow flex items-center justify-center bg-cyan-950">
//         <div className="bg-white p-8 rounded-2xl shadow-md w-96 flex flex-col gap-5">
//           <div className="flex flex-col gap-2 items-center">
//             <FontAwesomeIcon icon={faCircleUserSolid} size="2x" />
//             <h1 className="text-2xl font-bold text-center">Sign In</h1>
//             {error && <p className="text-red-500">{error}</p>}
//           </div>
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="font-bold">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//                 required
//                 autoComplete="email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="font-bold">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 id="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//                 required
//                 autoComplete="current-password"
//               />
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="mr-2"
//               />

//               <label htmlFor="rememberMe" className="font-bold">
//                 Remember me
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-customGreen text-white py-2 px-4 rounded font-bold transition duration-150 ease-in-out transform hover:scale-[103%]"
//             >
//               {loading ? <p>loading...</p> : <p>Sign In</p>}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Rebux/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./ModalLogin.css";
import { useNavigate } from "react-router-dom";

function ModalLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // état pour gérer "Remember me"

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && token) {
      navigate("/Profil");
    }
  }, [user, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: username, password, rememberMe })); // Passer rememberMe
  };

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} className="svg-user-icon" />
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <div className="div-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div className="div-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe} // L'état du checkbox "Remember me"
            onChange={(e) => setRememberMe(e.target.checked)} // Met à jour l'état
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>

        <button className="sign-in-button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </section>
  );
}

export default ModalLogin;
