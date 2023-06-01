import React, { useState } from "react";
import Container from "../../../Components/Containers/Container";
import Grid from "../../../Components/Grids/Grid";
import Input from "../../../Components/Global/Input/Input";
import useMutation from "../../../hooks/useMutation";
import { useParams } from "react-router-dom";
import Button from "../../../Components/Global/Button/Button";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../Components/Global/loading/loading";

const EditAgencies = () => {
  const { id } = useParams();

  const { mutate } = useMutation();

  const [values, setValues] = useState({
    name: "",
    description: "",
    images: "",
  });

  const {
    isLoading,
    error,
    invalidate,
    data: agenciesData,
  } = useFetch(`/admin/getagency/${id}`);

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const updateAgency = (e) => {
    e.preventDefault();

    mutate(`${process.env.REACT_APP_API_URL}/admin/updateagency/${id}`, {
      method: "PATCH",
      data: values,
    });
  };

  const deleteAgency = (e) => {
    e.preventDefault();

    mutate(`${process.env.REACT_APP_API_URL}/admin/deleteagency/${id}`, {
      method: "DELETE",
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Bewerk kantoor {agenciesData.name}</h1>

      <Grid className="TwoColumnGrid">
        <Container>
          <p>Naam</p>
          <p>Beschrijving</p>
        </Container>

        <Container>
          <form>
            {/* name */}
            <Input
              type={"text"}
              id={"name"}
              name={"name"}
              value={values.name}
              onChange={handleChange}
              placeholder={agenciesData.name}
            ></Input>

            {/* description */}
            <Input
              type={"text"}
              id={"description"}
              name={"description"}
              value={values.description}
              onChange={handleChange}
              placeholder={agenciesData.description}
            ></Input>

            <Button onClick={updateAgency}>Update kantoor</Button>
            <Button onClick={deleteAgency}>Verwijder kantoor</Button>
          </form>
        </Container>
      </Grid>
    </Container>
  );
};

export default EditAgencies;
