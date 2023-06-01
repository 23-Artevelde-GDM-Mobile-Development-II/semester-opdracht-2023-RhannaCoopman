import React, { useState } from "react";
import Container from "../../../Components/Containers/Container";
import Grid from "../../../Components/Grids/Grid";
import Input from "../../../Components/Global/Input/Input";
import useMutation from "../../../hooks/useMutation";
import { useParams } from "react-router-dom";
import Button from "../../../Components/Global/Button/Button";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../Components/Global/loading/loading";

const EditUser = () => {

  const { id } = useParams();

  const { mutate } = useMutation();

  const [values, setValues] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    user_level_id: "",
  });

  const {
    isLoading,
    error,
    invalidate,
    data: userData,
  } = useFetch(`/admin/getuser/${id}`);

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const updateUser = (e) => {
    e.preventDefault();
  
    mutate(`${process.env.REACT_APP_API_URL}/admin/updateuser/${id}`, {
      method: "PATCH",
      data: values,
    });
  };

  const deleteUser = (e) => {
    e.preventDefault();
  
    mutate(`${process.env.REACT_APP_API_URL}/admin/deleteuser/${id}`, {
      method: "DELETE"
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(userData);

  return (
    <Container>
      <h1>Bewerk gebruiker {userData.firstname} {userData.lastname}</h1>

      <Grid className="TwoColumnGrid">
        <Container>
          <p>Gebruikersnaam</p>
          <p>Voornaam</p>
          <p>Achternaam</p>
          <p>Email</p>
          <p>Userlevel</p>
        </Container>

        <Container>
          <form>
            {/* username */}
            <Input
              type={"text"}
              id={"username"}
              name={"username"}
              value={values.username}
              onChange={handleChange}
              placeholder={userData.username}
            ></Input>

            {/* firstname */}
            <Input
              type={"text"}
              id={"firstname"}
              name={"firstname"}
              value={values.firstname}
              onChange={handleChange}
              placeholder={userData.firstname}
            ></Input>

            {/* lastname */}
            <Input
              type={"text"}
              id={"lastname"}
              name={"lastname"}
              value={values.lastname}
              onChange={handleChange}
              placeholder={userData.lastname}
            ></Input>

            {/* email */}
            <Input
              type={"email"}
              id={"email"}
              name={"email"}
              value={values.email}
              onChange={handleChange}
              placeholder={userData.email}
            ></Input>

            {/* user_level_id */}
            <Input
              type={"text"}
              id={"user_level_id"}
              name={"user_level_id"}
              value={values.user_level_id}
              onChange={handleChange}
              placeholder={userData.user_level_id}
            ></Input>

<Button onClick={updateUser}>Update gebruiker</Button>
<Button onClick={deleteUser}>Verwijder gebruiker</Button>

          </form>
        </Container>
      </Grid>
    </Container>
  );
};

export default EditUser;
