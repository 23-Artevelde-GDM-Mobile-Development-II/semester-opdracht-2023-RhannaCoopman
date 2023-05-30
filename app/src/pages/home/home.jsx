import React, { useEffect, useState } from 'react';
import style from "./home.module.css";
import HouseCard from '../../Components/houseCard/HouseCard';
import useMutation from "../../hooks/useMutation";
import useFetch from "../../hooks/useFetch";
import FullwidthContainer from '../../Components/Containers/FullwidthContainer.js';
import Container from '../../Components/Containers/Container.js';
import SmallContainer from '../../Components/Containers/SmallContainer.js';
import ThreeColumnGrid from '../../Components/Grids/ThreeColumns';


const Home = () => {

    // const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();

    const [searchValues, setSearchValues] = useState({
        location: '',
        min_price: '',
        max_price: '',
        min_surface: '',
        max_surface: '',
        min_rooms: '',
        max_rooms: '',
    })

    // Async function which sets the values for search
    const handleChange = async e => {
        setSearchValues({
            ...searchValues,
            [e.currentTarget.name]: e.currentTarget.value
        })

        console.log(searchValues);
    }


    const {
        isLoading,
        error,
        invalidate,
        data: houses,
      } = useFetch("/houses");

      if (error) {
        return <p>{error}</p>;
      }


  if (isLoading) {
    return <p>loading...</p>;
  }

    

    // const handleGetDefault = async () => {
    //     //Een basis fetch op onze gemaakte API
    //     //De response die we terug krijgen is een gewone string, om dit om te zetten gebruiken we
    //     //de build in .json() functie
    //     const responses = await fetch('http://127.0.0.1:5000/houses', {
    //         method: "GET"
    //     }).then(response => response.json())

    //     //De respons die ik krijg zet ik in mijn variabele. Ik vorm deze terug om naar een string
    //     // zodat ik die gewoon in mijn pagina kan plaatsen om eens te bekijken. Voor de meeste use-cases is dit niet nodig
    //     const value = responses;
    //     setData(value);
    //     console.log(value)
    // }


  // Function that filters the blogpost on the searchValues
    const filterHouses = (e) => {

        e.preventDefault()

        let dataCopy = structuredClone(houses);

        dataCopy = dataCopy.filter(dataItem =>
            // dataItem.city_id.includes(searchValues.location) 
            // && 
            dataItem.price > (searchValues.min_price)
            &&
            dataItem.price < (searchValues.max_price)
            && 
            dataItem.habitable_surface > (searchValues.min_surface)
            &&
            dataItem.habitable_surface < (searchValues.max_surface)
            && 
            dataItem.bedrooms > (searchValues.min_rooms)
            &&
            dataItem.bedrooms < (searchValues.max_rooms)
        );

        setFilteredData(dataCopy)

        console.log(filteredData)
}

//   // Stores fetched data
//     useEffect(() => {
//         let isActive = true;

//         if(!data){
//             if(isActive) {
//                 handleGetDefault()
//             }
//         }
//         return () => isActive = false;
//     }, [])

    
    // Renders
        // If there is  no data (yet), shows loading screen
    if(!houses) {
        return (
            <p>Loading ...</p>
        )
    } else {
        // If there is data but none matched all searchvalues
        if(houses.length < 1) {


            console.log(houses);

            return (
                <SmallContainer>
                                <p>Geen woningen die aan uw wensen voldoen.</p>

                                <form className="form">
                                <h2>Vertel ons uw wensen</h2>
    
                                {/* Location */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor='location'>Locatie</label></div>
    
                                    <input type={'text'} onChange={handleChange} value={searchValues.location} name='location' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_location'}
                                    placeholder={'Typ om op titel te zoeken'}  />
                                </div>
    
                                {/* Price */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Prijs</label></div>
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.min_price | null} name='min_price' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_price'}
                                    placeholder={'Minimum prijs'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_price | null} name='max_price' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_price'}
                                    placeholder={'Maximum prijs'}  />
    
                                </div>
    
                                {/* Habitable surface */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Bewoonbaar oppervlak</label></div>
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.min_surface} name='min_surface' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_surface'}
                                    placeholder={'Minimum bewoonbaar oppervlak'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_surface} name='max_surface' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_surface'}
                                    placeholder={'Maximum bewoonbaar oppervlak'}  />
    
                                </div>
    
                                {/* Bedrooms */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Slaapkamers</label></div>

                                    <input type={'number'} onChange={handleChange} value={searchValues.min_rooms} name='min_rooms' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_rooms'}
                                    placeholder={'Minimum aantal kamers'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_rooms} name='max_rooms' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_rooms'}
                                    placeholder={'Maximum aantal kamers'}  />
    
                                </div>
                                    
                                <button className="btn btn--primary" onClick={filterHouses}>Ontdek onze panden</button>
                            </form>
                </SmallContainer>
                
            )
        // If there is data
        } else {
            console.log(houses);
            return (
                <FullwidthContainer>
                    {/* Hero */}
                    <section id="hero" className="container--full">
                        <div className={style.container}>
                            <h1>Immowebsite</h1>
                            <h6>Vind de woning van uw dromen</h6>
                            <br></br>
    
                            <form className="form">
                                <h2>Vertel ons uw wensen</h2>
    
                                {/* Location */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor='location'>Locatie</label></div>
    
                                    <input type={'text'} onChange={handleChange} value={searchValues.location} name='location' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_location'}
                                    placeholder={'Typ om op titel te zoeken'}  />
                                </div>
    
                                {/* Price */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Prijs</label></div>
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.min_price} name='min_price' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_price'}
                                    placeholder={'Minimum prijs'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_price} name='max_price' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_price'}
                                    placeholder={'Maximum prijs'}  />
    
                                </div>
    
                                {/* Habitable surface */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Bewoonbaar oppervlak</label></div>
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.min_surface} name='min_surface' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_surface'}
                                    placeholder={'Minimum bewoonbaar oppervlak'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_surface} name='max_surface' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_surface'}
                                    placeholder={'Maximum bewoonbaar oppervlak'}  />
    
                                </div>
    
                                {/* Bedrooms */}
                                <div className="form__field form__field--small">
                                    <div className="form__label"><label className="form__label" htmlFor="">Slaapkamers</label></div>

                                    <input type={'number'} onChange={handleChange} value={searchValues.min_rooms} name='min_rooms' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_min_rooms'}
                                    placeholder={'Minimum aantal kamers'}  />
    
                                    <input type={'number'} onChange={handleChange} value={searchValues.max_rooms} name='max_rooms' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_max_rooms'}
                                    placeholder={'Maximum aantal kamers'}  />
    
                                </div>
                                    
                                <button className="btn btn--primary" onClick={filterHouses}>Ontdek onze panden</button>
                            </form>
                        </div>
                    </section>
    
                    {/* Houses */}
                    <Container id="house_section">
                        <h2>Onze nieuwste panden</h2>
    
                        <ThreeColumnGrid id="HouseGrid">
    
{                       houses.map((house, index) => {
                            return (
                                <HouseCard house={house} key={index}/>
                            )
                        })}
    
                        </ThreeColumnGrid>
    
                    </Container>
                </FullwidthContainer>
            );
        }

    }
};

export default Home;