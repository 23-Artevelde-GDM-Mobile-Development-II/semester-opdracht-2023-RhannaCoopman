import React from 'react';
import style from "./notFound.module.css";

const NotFound = () => {
    return (
        <div className={style.container}>
            <h1 className={style.title}>404</h1>
            <p className={style.description}>Page was not found</p>
        </div>
    );
};

export default NotFound;