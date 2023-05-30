import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Global/loading/loading.jsx";
import style from "./Contact.module.css";
import ROUTES from "../../consts/routes";

const Contact = () => {
  const { houseId } = useParams();

  const [houseData, setHouseData] = useState();

  // Fetches data from database
  const handleGetDefault = async () => {
    const responses = await fetch("http://127.0.0.1:8081/houses", {
      method: "GET",
    }).then((response) => response.json());

    setHouseData(responses.filter((house) => house.id === 2)[0]);
  };

  useEffect(() => {
    //we maken een nieuwe variable aan om te kijken als deze component actief is
    let isActive = true;

    //Indien er nog geen data in de variabele zit gaan we die gaan ophalen door een fetch
    if (!houseData) {
      //Als deze component nog actief is updaten we de data van onze 2 variabelen
      if (isActive) {
        handleGetDefault();
      }
    }

    //Als we de component verlaten zetten we de isActive op false.
    //We doen dit zodat de code ook altijd stopt als we de component sluiten
    //In uitzonderlijke zou er zonder deze code een bug kunnen ontstaan waardoor we een memoryleak krijgen
    return () => (isActive = false);
  }, []);

  console.log(houseData);

  return (
    <section>
      <h2>Neem contact op</h2>
      <div>
        <p>Id: 2</p>
      </div>

      <form class="form">
        
      </form>
    </section>
  );
};

export default Contact;
