import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../consts/routes';
import style from './header.module.css';

const Header = () => {
    return (
        <header className={style.header}> 
            <img className={style.image} src='https://picsum.photos/100/100' alt='logo'/>
            <ol className={style.list}>
                <li className={style.list__item}><Link to={ROUTES.home}>Home</Link></li>
                <li className={style.list__item}><Link to={ROUTES.contact}>Contact</Link></li>
            </ol>




        </header>
    );
};

export default Header;