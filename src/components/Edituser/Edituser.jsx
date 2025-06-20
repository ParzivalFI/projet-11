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
