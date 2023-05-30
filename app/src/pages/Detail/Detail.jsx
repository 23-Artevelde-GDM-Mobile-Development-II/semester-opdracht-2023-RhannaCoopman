import React, { useEffect, useState } from "react";
import { Link, useParams, Route, Routes } from "react-router-dom";
import Loading from "../../Components/Global/loading/loading.jsx";
import style from "./Detail.module.css";
import ROUTES from "../../consts/routes";

import useFetch from "../../hooks/useFetch";

const Detail = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    invalidate,
    data: house,
  } = useFetch(`/house/${id}`);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={style.card}>
      <h1 className={style.title}>Huis</h1>

      <h1 className={style.title}>{house.name}</h1>
      <h3 className={style.title}>{house.price}</h3>

      <section className={style.floating__contactbar}>
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
      </section>
    </section>
  );

  // if(!house)
  // return <Loading/>
  // else return (
  //
  // )
};

export default Detail;
