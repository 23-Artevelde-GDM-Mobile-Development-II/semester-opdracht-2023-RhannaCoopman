import React from "react";
import { useAuthContext } from "../../contexts/AuthContainer";
import Container from "../../Components/Containers/Container";
import Grid from "../../Components/Grids/Grid";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import HouseCard from "../../Components/houseCard/HouseCard";

const PrivateProfile = () => {
  const userObject = useAuthContext();
  const id = userObject.user.id;

  const {
    data: userinfo,
  } = useFetch(`/myprofile/${id}`);

  const {
    IsLoading,
    error,
    data: savedbuildings,
  } = useFetch(`/mysavedbuildings/${id}`);

  const { data: messages } = useFetch(`/mymessages/${id}`);

  // console.log(userinfo)
  // console.log(savedbuildings)
  console.log(savedbuildings && messages && userinfo);

  if (error) {
    return <p>{error}</p>;
  }

  if (IsLoading) {
    return <Loading />;
  }

  if (savedbuildings && messages && userinfo) {
    return (
      <main>
        <Container id="profileHeader"></Container>
        <Container className="smallContainer" id="userinfo">
          <h1>Mijn gegevens</h1>
          <Container className="">
            <Grid className="TwoColumnGrid">
              <Container>
                <p>Gebruikersnaam</p>
                <p>Voornaam</p>
                <p>Achternaam</p>
                <p>Email</p>
              </Container>

              <Container>
                <p>{userinfo.username}</p>
                <p>{userinfo.firstname}</p>
                <p>{userinfo.lastname}</p>
                <p>{userinfo.email}</p>
              </Container>
            </Grid>
          </Container>
        </Container>

        <Container className="smallContainer" id="savedBuildings">
          <h1>Mijn opgeslagen panden</h1>

          <Grid>

              {
                savedbuildings.map((house, index) => {
                    return (
                      <HouseCard house={house} key={index}/>
                    )
                })
              }
          </Grid>
        </Container>

        <Container className="container" id="messages">
          <h1>Mijn berichten</h1>

          <section id="" className="">
            {
              messages.map(message => {
                return (
                  <article>
                    <h3>{message.building_id}</h3>
                    <h3>{message.content}</h3>
                    <h3>{message.username}</h3>
                  </article>
              )
              })
            }
          </section>
        </Container>
      </main>
    );
  }
};

export default PrivateProfile;
