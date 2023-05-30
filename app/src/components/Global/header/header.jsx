import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import style from './header.module.css';

const Header = () => {
    return (
        <header className={style.header}> 
            <h2>Immosite</h2>
            <ol className={style.list}>
                <li className={`${style.list__item} ${style.btn__secundairy}`}><Link to={ROUTES.home}>Alle panden</Link></li>
                <li className={`${style.list__item} ${style.btn__secundairy}`}><Link to={ROUTES.home}>Te koop</Link></li>
                <li className={`${style.list__item} ${style.btn__secundairy}`}><Link to={ROUTES.contact}>Te huur</Link></li>

                <li className={`${style.list__item} ${style.btn__primary}`}><Link to={ROUTES.login}>Mijn account</Link></li>

            </ol>
        </header>
    );
};

export default Header;