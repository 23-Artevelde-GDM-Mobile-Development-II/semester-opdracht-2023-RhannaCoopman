import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, Route, Routes } from "react-router-dom";
import Loading from "../../Components/Global/loading/loading.jsx";
import style from "./Detail.module.css";
import "./Detail.module.css";
import ROUTES from "../../consts/routes";

import useFetch from "../../hooks/useFetch";
import Container from "../../Components/Containers/Container.js";
import Grid from "../../Components/Grids/Grid.js";
import useMutation from "../../hooks/useMutation.js";
import Input from "../../Components/Global/Input/Input.js";
import Button from "../../Components/Global/Button/Button";
import { useAuthContext } from "../../contexts/AuthContainer.js";


const Detail = () => {
  const { id } = useParams();

  const [data, setData] = useState({
    sender_id: '',
    house_id: id,
    message: '',
    receiver_id: '',
  })

  const {
    isLoading,
    error,
    invalidate,
    data: house,
  } = useFetch(`/house/${id}`);

  const { mutate } = useMutation();

  const user = useAuthContext();
  console.log(user.user.id);

  // Async function which sets the values for contact
const handleChange = async e => {
  setData({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value
  })
}



  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleSend = (e) => {
    e.preventDefault();
  
    setData({
      ...data,
      sender_id: user.user.id,
      receiver_id: house.realestate_agent_id
    })
  
    mutate(`${process.env.REACT_APP_API_URL}/contact`, {
      method: "POST",
      data,
    });
  };

  return (
    <main>
    <Container id="titleContainer" className="smallContainer">
      <h1 className={style.title}>{house.name}</h1>
      <h3 className={style.title}>{house.price}</h3>
      <p></p>

    </Container>

    <Container id="imageContainer" className="fullwidthContainer">

    </Container>

    <Container id="detailsContainer" className="smallContainer">
      <Grid id="imagesGrid" className="FourColumnGrid">
        <Container className="fullwidthContainer" >Test</Container>
        <Container className="fullwidthContainer" >Test</Container>
        <Container className="fullwidthContainer" >Test</Container>
        <Container className="fullwidthContainer" >Test</Container>
      </Grid>

      <Grid id="importantFeaturesGrid" className="FourColumnGrid">
        <Container className="fullwidthContainer" >
          <i></i>
          <p><b>{house.bedrooms}</b> slaapkamer(s)</p>
        </Container>

        <Container className="fullwidthContainer" >
          <i></i>
          <p><b>{house.bathrooms}</b> badkamer(s)</p>
        </Container>

        <Container className="fullwidthContainer" >
          <i></i>
          <p><b>{house.lot_surface}</b> m² grond</p>
        </Container>

        <Container className="fullwidthContainer" >
          <i></i>
          <p>Energielabel <b>{house.energylabel}</b> </p>
        </Container>

      </Grid>

      <Grid id="featuresTableGrid" className="TwoColumnGrid">
      <table className={style.table}>
                    <thead>
                      <tr className={style.table__title}>
                          <th className={style.table__title__title}>Gebouwinfo</th>
                      </tr>
                    </thead>

                    <tbody>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Bouwjaar</td>
                          <td className={style.table__content__value}>1987</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Oppervlakte</td>
                          <td className={style.table__content__value}>117 m2</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Zolder</td>
                          <td className={style.table__content__value}>Ja</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Kelder</td>
                          <td className={style.table__content__value}>Ja</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Zwembad</td>
                          <td className={style.table__content__value}>Nee</td>
                      </tr>

                      <tr className={style.table__title}>
                          <th className={style.table__title__title}>Energie</th>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Energielabel</td>
                          <td className={style.table__content__value}>C</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Zonnepanelen</td>
                          <td className={style.table__content__value}>Ja</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Verwarming</td>
                          <td className={style.table__content__value}>Centrale verwarming</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Beglazing</td>
                          <td className={style.table__content__value}>Dubbel</td>
                      </tr>

                      <tr className={style.table__content}>
                          <td className={style.table__content__key}>Warmtepomp</td>
                          <td className={style.table__content__value}>Nee</td>
                      </tr>
                    </tbody>

                    <tr className={style.table__title}>
                        <th className={style.table__title__title}>Financieel</th>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Prijs</td>
                        <td className={style.table__content__value}>169.000</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Kadastraal inkomen</td>
                        <td className={style.table__content__value}>400</td>
                    </tr>
            </table>

            <table className={style.table}>
                    <tr className={style.table__title}>
                        <th className={style.table__title__title}>Gebouwinfo</th>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Bouwjaar</td>
                        <td className={style.table__content__value}>1987</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Oppervlakte</td>
                        <td className={style.table__content__value}>117 m2</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Zolder</td>
                        <td className={style.table__content__value}>Ja</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Kelder</td>
                        <td className={style.table__content__value}>Ja</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Zwembad</td>
                        <td className={style.table__content__value}>Nee</td>
                    </tr>

                    <tr className={style.table__title}>
                        <th className={style.table__title__title}>Energie</th>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Energielabel</td>
                        <td className={style.table__content__value}>C</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Zonnepanelen</td>
                        <td className={style.table__content__value}>Ja</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Verwarming</td>
                        <td className={style.table__content__value}>Centrale verwarming</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Beglazing</td>
                        <td className={style.table__content__value}>Dubbel</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Warmtepomp</td>
                        <td className={style.table__content__value}>Nee</td>
                    </tr>

                    <tr className={style.table__title}>
                        <th className={style.table__title__title}>Financieel</th>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Prijs</td>
                        <td className={style.table__content__value}>169.000</td>
                    </tr>

                    <tr className={style.table__content}>
                        <td className={style.table__content__key}>Kadastraal inkomen</td>
                        <td className={style.table__content__value}>400</td>
                    </tr>
            </table>
      </Grid>

    </Container>

    <Container id="similarHousesContainer">

    </Container>

    <Container>
      <form onSubmit={handleSend}>
        {/* <label htmlFor="firstname">Firstname</label>
        <Input name="firstname" value={data.firstname} onChange={handleChange} />
        <label htmlFor="lastname">Lastname</label>
        <Input name="lastname" value={data.lastname} onChange={handleChange} /> */}
        <label htmlFor="message">Firstname</label>
        <Input name="message" value={data.message} onChange={handleChange} />

        <Button type="post" disabled={isLoading} onClick={handleSend}>Registreer</Button>
      </form>
    </Container>



      {/* <section className={style.floating__contactbar}>
        <Link to={`${ROUTES.contact.to}${house.id}`} key={house.id}>
          <button className={`${style.btn} ${style.btnPrimary}`}>
            Neem contact op
          </button>
        </Link>

        <div className={style.floating__contactbar__text}>
          <h3 className={style.contactbar__title}>Uw makelaar</h3>

          <div className={style.contactbar__textcontainer}>
            <div>
              <p className={style.contactbar__text}>Rhanna Coopman</p>
              <p className={style.contactbar__text}>Immo Dewaele</p>
            </div>

            <div>
              <p className={style.contactbar__text}>
                <i>o</i>0479 123 456
              </p>
              <p className={style.contactbar__text}>
                <i>o</i>rhanna.coopman@immodewaele.com
              </p>
            </div>
          </div>
        </div>

    </section> */}
    </main>
  );

  // if(!house)
  // return <Loading/>
  // else return (
  //
  // )
};

export default Detail;
