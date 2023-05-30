import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Components/Global/loading/loading.jsx';
import style from "./Detail.module.css"
import ROUTES from '../../consts/routes';

const Detail = () => {
  const { houseId } = useParams();

  const [houseData, setHouseData] = useState();

    const handleGetById = async () => {
      const response = await fetch(`http://127.0.0.1:8081/detail/${houseId}`, {
          method: "GET"
      }).then(response => response.json())

      setHouseData(response)

      console.log(response[0])

      console.log(houseData)
      

  }

  useEffect(() => {
    //we maken een nieuwe variable aan om te kijken als deze component actief is
    let isActive = true;

      //Indien er nog geen data in de variabele zit gaan we die gaan ophalen door een fetch
      if(!houseData){
          //Als deze component nog actief is updaten we de data van onze 2 variabelen
          if(isActive) {
            handleGetById();
          }
      }

      //Als we de component verlaten zetten we de isActive op false.
      //We doen dit zodat de code ook altijd stopt als we de component sluiten
      //In uitzonderlijke zou er zonder deze code een bug kunnen ontstaan waardoor we een memoryleak krijgen
      return () => isActive = false;
  }, [])

    if(!houseData)
    return <Loading/>
    else return (
      <section className={style.card}>

          <h1 className={style.title}>Huis</h1>

          <h1 className={style.title}>{houseData.name}</h1>
          <h3 className={style.title}>{houseData.price}</h3>

          <section className={style.floating__contactbar}>
            <Link to={`${ROUTES.contact.to}${houseData.id}`} key={houseData.id}>
              <button className={`${style.btn} ${style.btnPrimary}`}>Neem contact op</button>
            </Link>

            <div className={style.floating__contactbar__text}>
              <h3 className={style.contactbar__title}>Uw makelaar</h3>

              <div className={style.contactbar__textcontainer}>
                <div >
                  <p className={style.contactbar__text}>Rhanna Coopman</p>
                  <p className={style.contactbar__text}>Immo Dewaele</p>
                </div>

                <div>
                  <p className={style.contactbar__text}><i>o</i>0479 123 456</p>
                  <p className={style.contactbar__text}><i>o</i>rhanna.coopman@immodewaele.com</p>
                </div>
              </div>

            </div>

          </section>

          
      </section>
    )
  
};

export default Detail;