import React, { useEffect, useState } from 'react';
import style from "./home.module.css";
import HouseCard from '../../Components/houseCard/HouseCard';
import useMutation from "../../hooks/useMutation";
import useFetch from "../../hooks/useFetch";
import FullwidthContainer from '../../Components/Containers/FullwidthContainer.js';
import Container from '../../Components/Containers/Container.js';
import SmallContainer from '../../Components/Containers/SmallContainer.js';
import Grid from '../../Components/Grids/Grid';
import { useAuthContext } from '../../contexts/AuthContainer';
import Dropdown from '../../Components/Global/Dropdown/Dropdown';


const Home = () => {

    const user = useAuthContext();
    let user_id = user.user.id;


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
    const { mutate } = useMutation();

    const saveBuilding = (building_id, e) => {
        // e.preventDefault();

        let data = { user_id, building_id }
    
      
        mutate(`${process.env.REACT_APP_API_URL}/savebuilding`, {
          method: "POST",
          data,
        });
      };


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

                                {/* Status */}
                                <div className="form__field form__field--small">
                                    <Dropdown   name={"status"} onChange={handleChange}>
                                    <option key={'tekoop'} value={1}>
                                        Te koop
                                    </option>
                                    <option key={'tehuur'} value={2}>
                                        Te huur
                                    </option>
                                    </Dropdown>
                                    <div className="form__label"><label className="form__label" htmlFor='location'>Te koop of te huur</label></div>
    
                                    {/* <input type={'text'} onChange={handleChange} value={searchValues.status} name='status' 
                                    className={`${style.form__input} ${style.form__input__text}`} id={'filter_status'}
                                    placeholder={'Typ om op titel te zoeken'}  /> */}
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
    
                        <Grid id="HouseGrid" className="ThreeColumnGrid">
    
{                       houses.map((house, index) => {
                            return (
                                <HouseCard house={house} key={index} saveButtonContent={"Sla pand op"} ButtonOnClick={() => {saveBuilding(house.id)}}/>
                            )
                        })}
    
                        </Grid>
    
                    </Container>
                </FullwidthContainer>
            );
        }

    }
};

export default Home;