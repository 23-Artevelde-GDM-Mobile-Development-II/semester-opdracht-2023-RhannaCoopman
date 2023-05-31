import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContainer";
import Container from "../../Components/Containers/Container";
import Grid from "../../Components/Grids/Grid";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import HouseCard from "../../Components/houseCard/HouseCard";
import useMutation from "../../hooks/useMutation";
import style from "./PrivateProfile.module.css";

const PrivateProfile = () => {
  
  const userObject = useAuthContext();
  const id = userObject.user.id;

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

  // console.log(savedbuildings && userinfo);

  if (error) {
    return <p>{error}</p>;
  }

  if (IsLoading) {
    return <Loading />;
  }

  console.log(conversations);

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

  const handleUpdateUserData = (e) => {
    e.preventDefault();

    console.log(updatedUserData);


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
              return <HouseCard house={house} key={index} />;
            })}
          </Grid>
        </Container>

        <Container className="container" id="messages">
          <h1>Mijn berichten</h1>

          <section id="" className="">
            <div>
              {conversations.map((message, index) => {
                const previousMessage =
                  index > 0 ? conversations[index - 1] : null;
                const isDifferentConversation =
                  previousMessage &&
                  message.conversation_id !== previousMessage.conversation_id;

                if (isDifferentConversation) {
                  return (
                    <React.Fragment key={message.id}>
                      <Container>
                        <form className="form">
                          {/* Location */}
                          <div className="form__field form__field--small">
                            <div className="form__label">
                              <label
                                className="form__label"
                                htmlFor="messagecontent"
                              >
                                Typ uw bericht...
                              </label>
                            </div>

                            <input
                              type={"text"}
                              onChange={handleChange}
                              value={data.messagecontent}
                              name="messagecontent"
                              id={"messagecontent"}
                              placeholder={"Typ om op titel te zoeken"}
                            />
                          </div>

                          <button
                            className="btn btn--primary"
                            onClick={handleSend}
                          >
                            Ontdek onze panden
                          </button>
                        </form>
                      </Container>
                      <hr></hr>
                      <div>{message.content}</div>
                    </React.Fragment>
                  );
                }

                return <div key={message.id}>{message.content}</div>;
              })}
            </div>
          </section>
        </Container>
      </main>
    );
  }
};

export default PrivateProfile;
