import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import style from './footer.module.css';

const Footer = () => {
    return (
        <footer className={style.footer}> 
            <ol className={style.list}>
                <li className={style.list__item}><Link to={ROUTES.home}>Home</Link></li>
                <li className={style.list__item}><Link to={ROUTES.contact}>Contact</Link></li>
            </ol>
        </footer>
    );
};

export default Footer;