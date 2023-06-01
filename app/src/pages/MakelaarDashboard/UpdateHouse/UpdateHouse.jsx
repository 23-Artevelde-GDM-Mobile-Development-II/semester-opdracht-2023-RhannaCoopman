import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../../Components/Global/loading/loading';
import useMutation from '../../../hooks/useMutation';
import Input from '../../../Components/Global/Input/Input';
import Dropdown from "../../../Components/Global/Dropdown/Dropdown";
import Container from '../../../Components/Containers/Container';
import Button from "../../../Components/Global/Button/Button";
import Grid from "../../../Components/Grids/Grid";


const UpdateHouse = () => {

  const { id } = useParams();

  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    house_type_id: null,
    housenumber: null,
    streetname: null,
    city_id: null,
    status_id: null,
    bedrooms: null,
    bathrooms: null,
    toilets: null,
    attic: null,
    basement: null,
    garage: null,
    swimmingspool: null,
    parkingspots: null,
    habitable_surface: null,
    garden_surface: null,
    lot_surface: null,
    construction_year: null,
    buildings_id: null,
    cadastral_income: null,
    solar_panels: null,
    windowtype_id: null,
    elevator: null,
    available: null,
    online_since: null,
    state_id: null,
    latest_renovation: null,
    facades: null,
    price: null,
    energylabel_id: null,
    realestate_agent_id: '',
  });

  const {
    isLoading,
    error,
    invalidate,
    data: houseOptions,
  } = useFetch("/makelaar/gethouseoptions");

  const { mutate } = useMutation();

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading/>;
  }

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const updateHouse = (e) => {
    e.preventDefault();
  
    mutate(`${process.env.REACT_APP_API_URL}/makelaar/updatehouse/${id}`, {
      method: "PATCH",
      data: values,
    });
  };

  if (houseOptions) {
    return (
      <Container>
        <h1>Update pand #{id}</h1>
        <form>
          <Grid>
            {/* name */}
            <Input
              type={"text"}
              id={"createhouse_name"}
              name={"name"}
              value={values.name}
              onChange={handleChange}
            ></Input>

            {/* description */}
            <Input
              type={"text"}
              id={"createhouse_description"}
              name={"description"}
              value={values.description}
              onChange={handleChange}
            ></Input>

            {/* images */}
            <Input
              type={"text"}
              id={"createhouse_image"}
              name={"image"}
              value={values.image}
              onChange={handleChange}
            ></Input>

            {/* housenumber */}
            <Input
              type={"number"}
              id={"createhouse_housenumber"}
              name={"housenumber"}
              value={values.housenumber}
              onChange={handleChange}
            ></Input>

            {/* street */}
            <Input
              type={"text"}
              id={"createhouse_streetname"}
              name={"streetname"}
              value={values.streetname}
              onChange={handleChange}
            ></Input>

            {/* city */}
            <Dropdown
              options={houseOptions.city}
              name="city"
              onChange={handleChange}
            ></Dropdown>

            {/* building type */}
            <Dropdown
              options={houseOptions.building_type}
              name="building_type"
              onChange={handleChange}
            ></Dropdown>

            {/* house type */}
            <Dropdown
              options={houseOptions.house_type}
              name="house_type"
              onChange={handleChange}
            ></Dropdown>

            {/* house status */}
            <Dropdown
              options={houseOptions.status}
              name="status"
              onChange={handleChange}
            ></Dropdown>

            {/* house windows */}
            <Dropdown
              options={houseOptions.windowtypes}
              name="windowtypes"
              onChange={handleChange}
            ></Dropdown>

            {/* house state */}
            <Dropdown
              options={houseOptions.state}
              name="state"
              onChange={handleChange}
            ></Dropdown>

            {/* house energylabel */}
            <Dropdown
              options={houseOptions.energylabel}
              name="energylabel"
              onChange={handleChange}
            ></Dropdown>

            {/* number of bedrooms */}
            <Input
              type={"number"}
              id={"createhouse_bedrooms"}
              name={"bedrooms"}
              value={values.bedrooms}
              onChange={handleChange}
            ></Input>

            {/* number of bathrooms */}
            <Input
              type={"number"}
              id={"createhouse_bathrooms"}
              name={"bathrooms"}
              value={values.bathrooms}
              onChange={handleChange}
            ></Input>

            {/* number of toilets */}
            <Input
              type={"number"}
              id={"createhouse_toilets"}
              name={"toilets"}
              value={values.toilets}
              onChange={handleChange}
            ></Input>

            {/* attic */}
            <Dropdown
              name="attic"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* basement */}
            <Dropdown
              name="basement"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* garage */}
            <Dropdown
              name="garage"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* swimmingpool */}
            <Dropdown
              name="swimmingpool"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* elevator */}
            <Dropdown
              name="elevator"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* solar_panels */}
            <Dropdown
              name="solar_panels"
              onChange={handleChange}
              truefalsecomponent="true"
            ></Dropdown>

            {/* number of parkingspots */}
            <Input
              type={"number"}
              id={"createhouse_parkingspots"}
              name={"parkingspots"}
              value={values.parkingspots}
              onChange={handleChange}
            ></Input>

            {/* habitable_surface */}
            <Input
              type={"number"}
              id={"createhouse_habitable_surface"}
              name={"habitable_surface"}
              value={values.habitable_surface}
              onChange={handleChange}
            ></Input>

            {/* garden_surface */}
            <Input
              type={"number"}
              id={"createhouse_garden_surface"}
              name={"garden_surface"}
              value={values.garden_surface}
              onChange={handleChange}
            ></Input>

            {/* lot_surface */}
            <Input
              type={"number"}
              id={"createhouse_lot_surface"}
              name={"lot_surface"}
              value={values.lot_surface}
              onChange={handleChange}
            ></Input>

            {/* construction_year */}
            <Input
              type={"number"}
              id={"createhouse_construction_year"}
              name={"construction_year"}
              value={values.construction_year}
              onChange={handleChange}
            ></Input>

            {/* latest renovation */}
            <Input
              type={"number"}
              id={"createhouse_latest_renovation"}
              name={"latest_renovation"}
              value={values.latest_renovation}
              onChange={handleChange}
            ></Input>

            {/* facades */}
            <Input
              type={"number"}
              id={"createhouse_facades"}
              name={"facades"}
              value={values.facades}
              onChange={handleChange}
            ></Input>

            {/* price */}
            <Input
              type={"number"}
              id={"createhouse_price"}
              name={"price"}
              value={values.price}
              onChange={handleChange}
            ></Input>

            {/* cadastral_income */}
            <Input
              type={"number"}
              id={"createhouse_cadastral_income"}
              name={"cadastral_income"}
              value={values.cadastral_income}
              onChange={handleChange}
            ></Input>

            {/* available at */}
            <Input
              type={"date"}
              id={"createhouse_available"}
              name={"available"}
              value={values.available}
              onChange={handleChange}
            ></Input>

            {/* online since */}
            <Input
              type={"date"}
              id={"createhouse_online_since"}
              name={"online_since"}
              value={values.online_since}
              onChange={handleChange}
            ></Input>
          </Grid>

          <Button type="post" disabled={isLoading} onClick={updateHouse}>Registreer</Button>
        </form>
      </Container>
    );
  }
};

export default UpdateHouse;