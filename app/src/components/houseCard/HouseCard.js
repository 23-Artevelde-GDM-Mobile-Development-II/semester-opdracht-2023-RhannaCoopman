import React from 'react';
import { Link } from 'react-router-dom';
import "./HouseCard.css"
import ROUTES from '../../consts/routes';

const HouseCard = ({house, index}) => {
return (
  <Link to={`/house/${house.id}`} key={house.id} className="link">
                <div className="card">
                    <div className={"card__savebutton"}>
                        <i></i>
                        <div className={"card__savebutton__icon"}>O</div>
                    </div>

                    <div className={"card__image"}>
                        <img className={"card__image__img"} src='https://picsum.photos/400/400' alt='logo'/>
                    </div>

                    <div className={"card__text"}>
                        <h4 className={"card__text__title"}>{house.name}</h4>

                        <p className={"card__text__attributes"}>{house.habitable_surface} m2 - {house.bedrooms} slaapkamer(s) - {house.bathrooms} badkamer(s)</p>

                        <p className={"card__text__location_place"}>{house.city_id}</p>

                        <p className={"card__text__price"}>€ {house.price}</p>
                    </div>
                </div>   
</Link>
);
};

export default HouseCard;