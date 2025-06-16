// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateUser } from "../../Rebux/Utilisateur";

// function EditUser({ user, token }) {
//   //dispatch pour pouvoir envoyer une action Redux
//   const dispatch = useDispatch();

//   //champ modifiable du nom d’utilisateur (editable dans un input)
//   const [userName, setUsername] = useState(user.userName || "");

//   const [isEditing, setIsEditing] = useState(false);

//   const handleSave = () => {
//     console.log("save userName:", userName);
//     //Envoie une action Redux
//     dispatch(updateUser({ userName, token }));
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       {!isEditing ? (
//         <button className="edit-button" onClick={() => setIsEditing(true)}>
//           Edit Name
//         </button>
//       ) : (
//         <form className="form">
//           <label className="form-label">
//             User name:
//             <input
//               className="form-input"
//               type="text"
//               defaultValue={user.userName}
//               onChange={(e) => setUsername(e.target.value)} // Modifiable
//             />
//           </label>
//           <label className="form-label">
//             First name:
//             <input
//               className="form-input disabled"
//               type="text"
//               value={user.firstName}
//               disabled
//             />{" "}
//             {/* Grisé */}
//           </label>
//           <label className="form-label">
//             Last name:
//             <input
//               className="form-input disabled"
//               type="text"
//               value={user.lastName}
//               disabled
//             />{" "}
//             {/* Grisé */}
//           </label>
//           <div>
//             <button className="form-button" type="button" onClick={handleSave}>
//               Save
//             </button>
//             <button
//               className="form-button"
//               type="button"
//               onClick={handleCancel}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }

// export default EditUser;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserProfileMutation } from "../../apislide/apiService";
import { setCredentials } from "../../Rebux/action";
import PropTypes from "prop-types";
import "./Edituser.css";

function Edituser({ onSave, onCancel }) {
  const dispatch = useDispatch();

  // Récupérer les informations utilisateur depuis Redux
  const { user } = useSelector((state) => state.auth);

  //je crée trois états locaux avec les hooks useState pour gérer les valeurs de username,
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //Ce useEffect se déclenche chaque fois que la variable user change
  useEffect(() => {
    if (user?.userName || user?.firstName) {
      setUsername(user?.userName || "");
      setFirstName(user?.firstName || "");
      setLastName(user?.lastName || "");
    }
  }, [user]);

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appeler l'API pour mettre à jour le userName
      const updatedUser = await updateUserProfile({
        userName: username,
      }).unwrap();

      // Conserver le token actuel dans localStorage et Redux
      const token = localStorage.getItem("token"); // Récupérer le token depuis localStorage

      dispatch(
        setCredentials({
          token: token, // Conserver le token inchangé
          user: {
            ...user, // Conserver les autres informations utilisateur
            userName: updatedUser.body.userName, // Mettre à jour uniquement le userName
          },
        })
      );

      onSave(); // Fermer le formulaire après la sauvegarde
    } catch (error) {
      console.error("Error updating user name:", error);
    }
  };

  return (
    <form className="edit-user-info-form" onSubmit={handleSubmit}>
      <h2>Edit user info</h2>

      <div className="input-wrapper">
        <label htmlFor="username">User Name :</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="firstName">First Name :</label>
        <input type="text" id="firstName" value={firstName} readOnly />
      </div>

      <div className="input-wrapper">
        <label htmlFor="lastName">Last Name :</label>
        <input type="text" id="lastName" value={lastName} readOnly />
      </div>

      <div className="div-button">
        <button type="submit" className="user-info-button">
          Save
        </button>
        <button type="button" className="user-info-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

Edituser.propTypes = {
  onSave: PropTypes.func.isRequired, // onSave est une fonction requise
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction requise
};

export default Edituser;
