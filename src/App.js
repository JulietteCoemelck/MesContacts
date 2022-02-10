import "./App.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone, faSquareXmark, faArrowDownAZ, faClock } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactsList, setContactsList] = useState([]);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("");

  // Ajout du contact au tableau contactsList //
  const addContact = (name, firstname, phone) => {
    if(name === ""){
      setError("Merci de renseigner au moins un nom")
    } else {
      setContactsList([
        ...contactsList,
        {
          id: contactsList.length,
          name: name,
          firstname: firstname,
          phone: phone
        }
      ])
      
      // Réinitialisation des inputs et de l'erreur //
      setName("");
      setFirstName("");
      setPhone("");
      setError(null);
      setSort("");
    }
  };

  // Suppression d'un contact du tableau contactsList //
  const deleteContact = (i) => {
    setContactsList(contactsList.filter(e => contactsList.indexOf(e) !== i))
  }

  // Switch //
  const styles = {
    Active: {
      backgroundColor: "#ff8056", color: "white"
    },
    Inactive: {
    }
  }

  // Tri alphabétique //
  const alphabeticalSort = () => {
    setSort("alphabet");
    let sortList = contactsList.sort((a, b) => a.name > b.name)
    setContactsList(sortList)
  }

  // Tri chronologique par id //
  const timeSort = () => {
    setSort("time")
    let sortList = contactsList.sort((a, b) => a.id > b.id)
    setContactsList(sortList)
  }

 
  

  return (
    <div className="App">

      <h1>Mes contacts</h1>

      <h2>Ajouter un contact</h2>

      <form>
        <label for="Nom">
          Nom
          <input
          type="text"
          name="name"
          placeholder="Dupont"
          onChange={(e) => setName(e.target.value)}
          value={name}
          title="Nom du contact"  
        />
        </label>
      </form>

      <form>
        <label for="Prénom">
          Prénom
          <input
          type="text"
          name="firstname"
          placeholder="Pierre"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          title="Prénom du contact"
        />
        </label>
      </form>

      <form>
        <label for="Téléphone">
          Téléphone
          <input
          type="text"
          name="phone"
          placeholder="0102030405"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          title="Téléphone du contact"
        />
        </label>
      </form>

      <input
        className="button"
        type="submit"
        onClick={() => addContact(name, firstName, phone)}
        value="Ajouter"
        title="Ajouter le contact"
      />

      {error}

      <h2>Liste de contacts</h2>
      {contactsList.length === 0 ? (
        null
      ) : (
        <div className="switch">
          <button 
            title="Ordre alphabétique"
            style={sort === "alphabet" ? styles.Active : styles.Inactive } 
            onClick={() => alphabeticalSort()}>
            <FontAwesomeIcon 
            icon={faArrowDownAZ} 
            className="icon switcher" 
            style={sort === "alphabet" ? styles.Active : styles.Inactive }
            title="Ordre alphabétique"
            aria-hidden="true"
            aria-label="Ordre alphabétique"/>
          </button>
          <button 
            title="Ordre chronologique" 
            style={sort === "time" ? styles.Active : styles.Inactive } 
            onClick={() => timeSort()}>
            <FontAwesomeIcon 
            icon={faClock} 
            className="icon switcher"
            style={sort === "time" ? styles.Active : styles.Inactive }  
            title="Ordre chronologique"
            aria-hidden="true"
            aria-label="Ordre chronologique"/>
          </button>
      </div>
      )}
      

      {contactsList.length === 0 ? (
        <h3>Aucun contact</h3>
      ) : (
        contactsList.map((contact, i) => (
          <div key={i} className="contactcard">
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <FontAwesomeIcon 
                  icon={faUserCircle} 
                  className="icon" />
                <FontAwesomeIcon 
                  icon={faPhone} 
                  className="icon"/>
              </div>

            <div className="contactInfos">
                <h3>
                  {contact.name} {contact.firstname}
                </h3>
                <p>
                  {contact.phone ? (
                    contact.phone
                    ) : (
                      "Pas de numéro de téléphone renseigné"
                      )}
                </p>
            </div>
            
              <button className="deleteContact" onClick={() => deleteContact(i)} title="Supprimer le contact">
                <FontAwesomeIcon 
                icon={faSquareXmark} 
                style={{cursor: "pointer"}} 
                className="icon" 
                aria-hidden="true"
                aria-label="Supprimer le contact"/>
              </button>
            
          </div>
        ))
      )}
    </div>
  );
}
