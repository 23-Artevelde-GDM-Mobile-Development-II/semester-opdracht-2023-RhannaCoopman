import React, { useState } from "react";
import Container from "../../Components/Containers/Container";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import { Link } from "react-router-dom";
import Grid from "../../Components/Grids/Grid";
import { useAuthContext } from "../../contexts/AuthContainer";
import HouseCard from "../../Components/houseCard/HouseCard";
import Input from "../../Components/Global/Input/Input";
import useMutation from "../../hooks/useMutation";
import Button from "../../Components/Global/Button/Button";

const MakelaarDashboard = () => {
  const userObject = useAuthContext();
  const agency_id = userObject.user.agency_id;
  const user_id = userObject.user.id;

  console.log(userObject.user.agency_id);

  // get all houses from this agency from database
  const {
    isLoading,
    error,
    invalidate,
    data: agencyHouses,
  } = useFetch(`/makelaar/housesoverview/1`);

  const { mutate } = useMutation();

  const [values, setValues] = useState({
    name: "",
    description: "",
    images: "",
  });

  const {
    isLoading: conversationsLoading,
    error: conversationsError,
    data: conversations,
  } = useFetch(`/mymessages/33`);

  const { data: messages } = useFetch(`/getmessages/33`);

  const { isLoading: agencyIsLoading, data: agenciesData } =
    useFetch(`/admin/getagency/1`);

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const updateAgency = (e) => {
    e.preventDefault();

    mutate(`${process.env.REACT_APP_API_URL}/admin/updateagency/1`, {
      method: "PATCH",
      data: values,
    });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (agencyIsLoading) {
    return <Loading />;
  }

  if (conversationsError) {
    return <p>{conversationsError}</p>;
  }

  if (conversationsLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h2>Huizen door uw agency gemaakt</h2>
      <Grid>
        {agencyHouses.map((house, index) => {
          return (
            <Container>
              <HouseCard house={house} key={index} />
              <Link
                to={`/admin/editbuilding/${house.id}`}
                key={"edit_" + house.id}
                className="link"
              >
              <Button>Bewerk huis</Button>
              </Link>
            </Container>
          );
        })}
      </Grid>

      <h2>Maak een nieuw pand aan</h2>
      <Link to={`/makelaar/createhouse`} className="link">
        <Button>Creeër nieuwe woning</Button>
      </Link>

      <h2>Bewerk uw kantoor</h2>
      <Container>
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
            </form>
          </Container>
        </Grid>
      </Container>

      <h2>Berichten</h2>
      <Container className="container" id="messages">
          <h1>Mijn berichten</h1>

          <section id="" className="">
            {conversations.map((conversation, index) => {
                return (
                  
                  <div className="card">
  
                      <div className={"card__text"}>
                          <h4 className={"card__text__title"}>{conversation.username}</h4>
  
                          <p className={"card__text__attributes"}>#{conversation.building_id}</p>
  
                          <p className={"card__text__location_place"}>{conversation.house_name}</p>

                          <p className={"card__text__location_place"}>{conversation.message}</p>


                          <hr></hr>
                      </div>
                  </div>
                );
              })}
          </section>
        </Container>

      <h2>Voeg een niewe makelaar toe</h2>

    </Container>
  );
};

export default MakelaarDashboard;
