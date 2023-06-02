import React from "react";
import Container from "../../Components/Containers/Container";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  // get all users from database
  const {
    isLoading: usersIsLoading,
    error: usersError,
    data: allUsers,
  } = useFetch("/admin/getusers");

      // get all houses from database
      const {
        isLoading: housesIsLoading,
        error: housesError,
        data: allHouses,
      } = useFetch("/admin/gethouses");
    
    // get all realestate agencies from database
    const {
      isLoading: agenciesIsLoading,
      error: agenciesError,
      data: allAgencies,
    } = useFetch("/admin/getagencies");

        // get all database tables from database
        const {
          isLoading: databaseIsLoading,
          error: databaseError,
          data: allTables,
        } = useFetch("/admin/getdatabase");

  if (usersError, housesError, agenciesError, databaseError) {
    return <p>Error</p>;
  }

  if (usersIsLoading, housesIsLoading, agenciesIsLoading, databaseIsLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Container id="adminUsersContainer">
        <h1>Gebruikers beheren</h1>

        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Voornaam</th>
              <th scope="col">Achternaam</th>
              <th scope="col">Rol</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <th>{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.user_level_id}</td>
                  <td>{user.email}</td>
                  <Link to={`/admin/edituser/${user.id}`} key={'edit_' + user.id} className="link">Bewerk gebruiker</Link>
                  <Link to={`/profile/${user.id}`} key={'profile_' + user.id} className="link">Bekijk gebruiker</Link>

                </tr>
              );
            })}
          </tbody>
        </table>
      </Container>

      <Container id="adminBuildingsContainer">

        <h1>Huizen beheren</h1>

        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naam</th>
              <th scope="col">Makelaar</th>
              <th scope="col">Makelaarskantoor</th>
              <th scope="col">Bewerk gebouw</th>
              <th scope="col">Bekijk gebouw</th>
            </tr>
          </thead>
          <tbody>
            {allHouses.map((house, index) => {
              return (
                <tr key={index}>
                  <th>{house.id}</th>

                  <td>{house.lastname}</td>
                  <td>{house.user_level_id}</td>
                  <td>{house.email}</td>
                  <Link to={`/admin/editbuilding/${house.id}`} key={'edit_' + house.id} className="link">Bewerk huis</Link>
                  <Link to={`/house/${house.id}`} key={'view_' + house.id} className="link">Bekijk huis</Link>

                </tr>
              );
            })}
          </tbody>
        </table>

      </Container>
  
      <Container id="adminRealEstateAgenciesContainer">

        <h1>Makelaarkantoren beheren</h1>

        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naam</th>
              <th scope="col">Beschrijving</th>

              <th scope="col">Bewerk kantoor</th>
              {/* <th scope="col">Bekijk kantoor</th> */}
            </tr>
          </thead>
          <tbody>
            {allAgencies.map((agency, index) => {
              return (
                <tr key={index}>
                  <th>{agency.id}</th>

                  <td>{agency.name}</td>
                  <td>{agency.description}</td>

                  <Link to={`/admin/editagency/${agency.id}`} key={'edit_' + agency.id} className="link">Bewerk kantoor</Link>
                  {/* <Link to={`/agency/${agency.id}`} key={'view_' + agency.id} className="link">Bekijk kantoor</Link> */}

                </tr>
              );
            })}
          </tbody>
        </table>

      </Container>

<Container id="adminDatabaseContainer">


</Container>

      <Container id="adminDatabaseContainer">

        <h1>Database beheren</h1>

        {/* <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naam</th>
              <th scope="col">Beschrijving</th>

              <th scope="col">Bewerk kantoor</th>
              <th scope="col">Bekijk kantoor</th>
            </tr>
          </thead>
          <tbody>
            {allAgencies.map((agency, index) => {
              return (
                <tr key={index}>
                  <th>{agency.id}</th>

                  <td>{agency.name}</td>
                  <td>{agency.description}</td>

                  <Link to={`/admin/editagency/${agency.id}`} key={'edit_' + agency.id} className="link">Bewerk kantoor</Link>
                  <Link to={`/agency/${agency.id}`} key={'view_' + agency.id} className="link">Bekijk kantoor</Link>

                </tr>
              );
            })}
          </tbody>
        </table> */}

      </Container>
    </Container>
  );
};

export default AdminDashboard;
