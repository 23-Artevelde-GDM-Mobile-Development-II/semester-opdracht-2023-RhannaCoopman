
import style from "./home.module.css";
import "../../styles/main.css";
import { useState } from "react";


const Home = () => {
    const [responses, setResponses] = useState();

    const handleGetDefault = async () => {
        //Een basis fetch op onze gemaakte API
        //De response die we terug krijgen is een gewone string, om dit om te zetten gebruiken we
        //de build in .json() functie
        const responses = await fetch('http://127.0.0.1:8081/test', {
            method: "GET"
        }).then(response => response.json())

        //De respons die ik krijg zet ik in mijn variabele. Ik vorm deze terug om naar een string
        // zodat ik die gewoon in mijn pagina kan plaatsen om eens te bekijken. Voor de meeste use-cases is dit niet nodig
        const value = responses[0]["name"];
        setResponses(value);
        console.log(value)
    }

    return (
        <main>
            <section className={style.dataSection}>
                <h2 className={style.dataTitle}>Get Data</h2>
                <button className={style.dataButton} onClick={handleGetDefault}>Fetch it</button>
                <p>Response:</p>
                <div className={style.dataOutput}>{responses}</div>

            </section>

            <h1 className={style.title}>Home</h1>
            <button className={"btn btn--primary"}>Primary button</button>
            <button className={"btn btn--secundairy"}>Secundairy button</button>

            <section className={"grid card__container"}>

                <div className={"card"}>
                    <div className={"card__image"}>

                    </div>

                    <div className={"card__text"}>

                    </div>
                </div>

                <div className={"card"}>
                    <div className={"card__image"}>

                    </div>

                    <div className={"card__text"}>

                    </div>
                </div>

                <div className={"card"}>
                    <div className={"card__savebutton"}>
                        <i></i>
                        <div className={"card__savebutton__icon"}>O</div>
                    </div>

                    <div className={"card__image"}>
                        <img className={"card__image__img"} src='https://picsum.photos/400/400' alt='logo'/>
                    </div>

                    <div className={"card__text"}>
                        <h4 className={"card__text__title"}>Woonst te koop</h4>

                        <p className={"card__text__attributes"}>160 m2 - 3 slaapkamers - 2 badkamers</p>

                        <p className={"card__text__location_place"}>Brugge</p>

                        <p className={"card__text__price"}>€ 152.900</p>
                    </div>
                </div>

                <div className={"card"}>
                    <div className={"card__image"}>

                    </div>

                    <div className={"card__text"}>

                    </div>
                </div>

            </section>

            <section className={"grid2"}>
            <table className={"table"}>
                    <tr className={"table__title"}>
                        <th className={"table__title__title"}>Gebouwinfo</th>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Bouwjaar</td>
                        <td className={"table__content__value"}>1987</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Oppervlakte</td>
                        <td className={"table__content__value"}>117 m2</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Zolder</td>
                        <td className={"table__content__value"}>Ja</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Kelder</td>
                        <td className={"table__content__value"}>Ja</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Zwembad</td>
                        <td className={"table__content__value"}>Nee</td>
                    </tr>

                    <tr className={"table__title"}>
                        <th className={"table__title__title"}>Energie</th>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Energielabel</td>
                        <td className={"table__content__value"}>C</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Zonnepanelen</td>
                        <td className={"table__content__value"}>Ja</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Verwarming</td>
                        <td className={"table__content__value"}>Centrale verwarming</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Beglazing</td>
                        <td className={"table__content__value"}>Dubbel</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Warmtepomp</td>
                        <td className={"table__content__value"}>Nee</td>
                    </tr>

                    <tr className={"table__title"}>
                        <th className={"table__title__title"}>Financieel</th>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Prijs</td>
                        <td className={"table__content__value"}>169.000</td>
                    </tr>

                    <tr className={"table__content"}>
                        <td className={"table__content__key"}>Kadastraal inkomen</td>
                        <td className={"table__content__value"}>400</td>
                    </tr>
                </table>
                
                {/* <table>
                    <tr>
                        <th>Energie</th>
                        <th></th>
                    </tr>

                    <tr>
                        <td>Beschrijving</td>
                        <td>Maria Anders</td>
                    </tr>

                    <tr>
                        <td>Beschrijving</td>
                        <td>Maria Anders</td>
                    </tr>

                    <tr>
                        <td>Beschrijving</td>
                        <td>Maria Anders</td>
                    </tr>

                    <tr>
                        <td>Beschrijving</td>
                        <td>Maria Anders</td>
                    </tr>

                    <tr>
                        <td>Beschrijving</td>
                        <td>Maria Anders</td>
                    </tr>
                </table> */}

            </section>

            <section className={"grid3"}>
                <div className={"card"}>
                    <div className={"card__image"}>
                        <img className={"card__image__img"} src='https://picsum.photos/400/400' alt='logo'/>
                    </div>

                    <div className={"card__text"}>
                        <p className={"card__text__label"}>Bouwjaar</p>
                    </div>
                </div>
                <div className={"testdiv"}></div>
                <div className={"testdiv"}></div>
                <div className={"testdiv"}></div>
            </section>

            <section className={"testcontainer"}>
            <form class="form">
                <div class="form__field form__field--small">
                    <div class="form__label"><label class="form__label" for="">Inputfield</label></div>
                    
                    <input class="form__input form__input__text" />
                </div>

                <div class="form__field form__field--small">
                    <div class="form__label"><label class="form__label" for="">Inputfield</label></div>
                    
                    <input class="form__input form__input__text" />
                </div>
                
                <div class="form__field form__field--big">
                    <div class="form__label"><label class="form__label" for="w3review">Review of W3Schools:</label></div>

                    <textarea class="form__input form__input__textarea" id="w3review" name="w3review" rows="3">
                    
                    </textarea>
                </div>
                <div class="form__field form__field--big">
                    <div class="form__label"><label class="form__label" for="cars">Choose a car:</label></div>

                    <select class="form__input form__input__select" name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <button class="btn btn--primary">Register</button>
            </form>
            </section>

        </main>
    );
};

export default Home;