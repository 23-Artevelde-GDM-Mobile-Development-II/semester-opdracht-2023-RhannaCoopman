import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContainer";
import Container from "../../Components/Containers/Container";
import Grid from "../../Components/Grids/Grid";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import HouseCard from "../../Components/houseCard/HouseCard";
import useMutation from "../../hooks/useMutation";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import Button from "../../Components/Global/Button/Button";
import Input from "../../Components/Global/Input/Input";

const Dashboard = () => {
  
  const userObject = useAuthContext();
  const id = userObject.user.id;
  const user_level = userObject.user.user_level;

  const { mutate } = useMutation();

  const [data, setdata] = useState({
    messagecontent: "",
    building_id: "",
    sender_id: "",
    receiver_id: "",
    conversation_id: "",
    send_time: new Date().toISOString(),
  });

  const [updatedUserData, setUpdateUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
  });

  // Async function which sets the values for userdata
  const handleUserDataChange = async (e) => {
    setUpdateUserData({
      ...updatedUserData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    console.log(updatedUserData);
  };

  const { data: userinfo } = useFetch(`/myprofile/${id}`);

  const { data: savedbuildings } = useFetch(`/mysavedbuildings/${id}`);

  const {
    IsLoading,
    error,
    data: conversations,
  } = useFetch(`/mymessages/${id}`);

  const { data: messages } = useFetch(`/getmessages/${id}`);

  const deleteBuilding = (building_id) => {

    let data = { id, building_id }
    console.log(data)

  
    mutate(`${process.env.REACT_APP_API_URL}/deletebuilding`, {
      method: "DELETE",
      data,
    });
  };
  

  // console.log(savedbuildings && userinfo);

  if (error) {
    return <p>{error}</p>;
  }

  if (IsLoading) {
    return <Loading />;
  }

  console.log(messages);

  // Async function which sets the values for search
  const handleChange = async (e) => {
    setdata({
      ...data,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    console.log(data);
  };

  const handleSend = (e) => {
    e.preventDefault();

    setdata({
      ...data,
      building_id: conversations.building_id,
      sender_id: conversations.sender_id,
      receiver_id: conversations.receiver_id,
      conversation_id: conversations.conversation_id,
      send_time: new Date().toISOString(),
    });

    console.log(data);

    mutate(`${process.env.REACT_APP_API_URL}/sendmessage`, {
      method: "POST",
      data,
    });
  };

  const handleGetMessages = (id) => {
    // e.preventDefault();
    console.log(id)


  };

  const handleUpdateUserData = (e) => {
    e.preventDefault();

    mutate(`${process.env.REACT_APP_API_URL}/updateUserData/${id}`, {
      method: "PATCH",
      data: updatedUserData,
    });
  };

  if (savedbuildings && userinfo && conversations) {
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
                <form>
                  <input
                    type={"text"}
                    onChange={handleUserDataChange}
                    value={updatedUserData.username}
                    name="username"
                    className={`${style.form__input} ${style.form__input__text}`}
                    id={"username"}
                    placeholder={userinfo.username}
                  />
                  <input
                    type={"text"}
                    onChange={handleUserDataChange}
                    value={updatedUserData.firstname}
                    name="firstname"
                    className={`${style.form__input} ${style.form__input__text}`}
                    id={"firstname"}
                    placeholder={userinfo.firstname}
                  />
                  <input
                    type={"text"}
                    onChange={handleUserDataChange}
                    value={updatedUserData.lastname}
                    name="lastname"
                    className={`${style.form__input} ${style.form__input__text}`}
                    id={"lastname"}
                    placeholder={userinfo.lastname}
                  />
                  <input
                    type={"text"}
                    onChange={handleUserDataChange}
                    value={updatedUserData.email}
                    name="email"
                    className={`${style.form__input} ${style.form__input__text}`}
                    id={"email"}
                    placeholder={userinfo.email}
                  />

                  <button
                    className="btn btn--primary"
                    onClick={handleUpdateUserData}
                  >
                    Ontdek onze panden
                  </button>
                </form>
              </Container>
            </Grid>
          </Container>
        </Container>

        <Container className="smallContainer" id="savedBuildings">
          <h1>Mijn opgeslagen panden</h1>

          <Grid>
            {savedbuildings.map((house, index) => {
              return <HouseCard house={house} key={index} saveButtonContent={"Verwijder uit opgeslagen panden"} ButtonOnClick={(e) => {deleteBuilding(house.id)}}/>;
            })}
          </Grid>
        </Container>

        <Container className="container" id="messages">
          <h1>Mijn berichten</h1>

          <section id="" className="">
            {conversations.map((conversation, index) => {
                return (
                  
                  <div className="card">
  
                      <div className={"card__text"}>
                          <h4 className={"card__text__title"}>{conversation.username} ({conversation.realestate_name})</h4>
  
                          <p className={"card__text__attributes"}>#{conversation.building_id}</p>
  
                          <p className={"card__text__location_place"}>{conversation.house_name}</p>

                          <hr></hr>

                          {messages.map((message, index) => {
                            if (message.conversation_id === conversation.id) {
                              return (
                                <article>
                                  <h4 className={"card__text__title"}>{conversation.username}</h4>
  
                                  <p className={"card__text__attributes"}>{message.content}</p>

                                  <p className={"card__text__location_place"}>{message.send_time}</p>
                                </article>
                              )
                            }

                          
                          })}

                        <Input name="send_message" labelname="Typ hier uw bericht"></Input>
                        <Button></Button>
                      </div>
                  </div>
                );
              })}
          </section>
        </Container>
      </main>
    );
  }
};

export default Dashboard;
