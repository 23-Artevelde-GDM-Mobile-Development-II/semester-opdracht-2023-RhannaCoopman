import React, { useState } from "react";
import Input from "../../../Components/Global/Input/Input";

const CreateHouse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    house_type_id: "",
    housenumber: "",
    streetname: "",
    city_id: "",
    status_id: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    attic: "",
    basement: "",
    garage: "",
    swimmingspool: "",
    parkingspots: "",
    habitable_surface: "",
    garden_surface: "",
    lot_surface: "",
    construction_year: "",
    buildings_id: "",
    cadastral_income: "",
    solar_panels: "",
    windowtype_id: "",
    elevator: "",
    available: "",
    online_since: "",
    state_id: "",
    latest_renovation: "",
    facades: "",
    price: "",
    energylabel_id: "",
    realestate_agency_id: "",
    realestate_agent_id: "",
  });

  const handleChange = async e => {
    setValues({
        ...values,
        [e.currentTarget.name]: e.currentTarget.value
    })
}

  return (
    <div>
      <form>
        <Input
          type={"text"}
          id={"createhouse_name"}
          name={"name"}
          value={values.name}
          onChange={handleChange}
        ></Input>

<Input
          type={"text"}
          id={"createhouse_description"}
          name={"description"}
          value={values.description}
          onChange={handleChange}
        ></Input>
                <Input
          type={"text"}
          id={"createhouse_image"}
          name={"image"}
          value={values.image}
          onChange={handleChange}
        ></Input>
      </form>
    </div>
  );
};

export default CreateHouse;
