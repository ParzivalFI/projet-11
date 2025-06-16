import { useState } from "react";
import { useSelector } from "react-redux";
import Account from "../Account/Account";
import userDataBank from "../Account/listAccount.json";
import "./UserCompte.css";
import Edituser from "../Pages/Edituser";

function UserAccount() {
  // Récupérer les informations utilisateur depuis Redux
  const user = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);

  //cette fonction inverse la valeur de isEditing à chaque fois qu'elle est appelée.
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  // cette fonction définit isEditing à false lorsque l'on souhaite fermer le formulaire ou la vue en mode édition.
  const handleFormClose = () => {
    setIsEditing(false);
  };
  // similaire à la fonction précédente, handleCancelEdit est utilisée pour annuler l'édition et remettre isEditing à false.
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // cette ligne utilise l'opérateur de chaînage optionnel (?.) et l'opérateur OU (||) pour définir la variable userName.
  const userName = user?.userName || user?.firstName || "User"; // Utiliser le firstName s'il est disponible

  return (
    <>
      {!isEditing ? (
        <div className="div-title">
          <h2 className="main-title">
            Welcome back <br />
            {userName}!
          </h2>
          <button
            type="button"
            className="edit-button"
            onClick={toggleEditMode}
          >
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <Edituser onSave={handleFormClose} onCancel={handleCancelEdit} />
        </div>
      )}

      <h2 className="sr-only">Account</h2>
      {userDataBank.dataBank.map((data) => (
        <Account
          key={data.id}
          accTitle={data.accountTitle}
          accAmount={data.accountAmount}
          accAmountDescription={data.accountAmountDescription}
        />
      ))}
    </>
  );
}

export default UserAccount;
