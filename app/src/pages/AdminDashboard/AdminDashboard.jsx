import React from "react";
import Container from "../../Components/Containers/Container";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import { Link } from "react-router-dom";

const AdminDashboard = () => {

  // get all users from database
  // const {
  //   isLoading,
  //   error,
  //   invalidate,
  //   data: allUsers,
  // } = useFetch("/admin/getusers");

    // get all houses from database
    const {
      isLoading,
      error,
      invalidate,
      data: allHouses,
    } = useFetch("/admin/gethouses");

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {/* <Container id="adminUsersContainer">
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
      </Container> */}

      <Container id="adminDatabaseContainer">

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

      <Container id="adminRealEstateAgenciesContainer"></Container>

      <Container id="adminBuildingsContainer"></Container>
    </Container>
  );
};

export default AdminDashboard;
