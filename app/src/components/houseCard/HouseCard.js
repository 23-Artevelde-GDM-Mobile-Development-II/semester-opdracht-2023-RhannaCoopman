import React from 'react';
import { Link } from 'react-router-dom';
import "./HouseCard.css"
import ROUTES from '../../consts/routes';
import Button from '../Global/Button/Button';

const HouseCard = ({house, index, ButtonOnClick, saveButtonContent}) => {
return (
  <article key={house.id} className="link">
                <div className="card">

                    <Button className={"card__savebutton"} onClick={ButtonOnClick}>
                    <i></i>
                        <p className={"card__savebutton__icon"}>{saveButtonContent}</p>
                    </Button>

                    <div className={"card__image"}>
                        <img className={"card__image__img"} src='https://picsum.photos/400/400' alt='logo'/>
                    </div>

                    <Link to={`/house/${house.id}`} key={house.id} className="link">
                        <h4 className={"card__text__title"}>{house.name}</h4>

                        <p className={"card__text__attributes"}>{house.habitable_surface} m2 - {house.bedrooms} slaapkamer(s) - {house.bathrooms} badkamer(s)</p>

                        <p className={"card__text__location_place"}>{house.city_id}</p>

                        <p className={"card__text__price"}>€ {house.price}</p>
                    </Link>
                </div>   
</article>
);
};

export default HouseCard;