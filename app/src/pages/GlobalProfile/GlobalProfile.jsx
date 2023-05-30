import React from 'react';
import { useAuthContext } from '../../contexts/AuthContainer';
import Container from '../../Components/Containers/Container';
import Grid from '../../Components/Grids/Grid';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Global/loading/loading';

const GlobalProfile = () => {

  const { id } = useParams();

  const {
    isLoading,
    error,
    invalidate,
    data: userinfo,
  } = useFetch(`/profile/${id}`);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <Container id="profileHeader"></Container>
      <Container className="smallContainer">
        <h1>Gegevens</h1>
        <Container className="smallContainer">
          <Grid className='TwoColumnGrid'>
            <Container>
              <p>Gebruikersnaam</p>
              <p>Voornaam</p>
              <p>Achternaam</p>
            </Container>

            <Container>
              <p>{userinfo.username}</p>
              <p>{userinfo.firstname}</p>
              <p>{userinfo.lastname}</p>
        
            </Container>
          </Grid>
        </Container>
      </Container>
    </main>
  );
};

export default GlobalProfile;