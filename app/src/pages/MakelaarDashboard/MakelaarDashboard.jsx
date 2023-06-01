import React from "react";
import Container from "../../Components/Containers/Container";
import useFetch from "../../hooks/useFetch";
import Loading from "../../Components/Global/loading/loading";
import { Link } from "react-router-dom";
import Grid from "../../Components/Grids/Grid";
import { useAuthContext } from "../../contexts/AuthContainer";
import HouseCard from "../../Components/houseCard/HouseCard";

const MakelaarDashboard = () => {
  const userObject = useAuthContext();
  const agency_id = userObject.user.agency_id;
  console.log(userObject.user.agency_id);

    // get all houses from this agency from database
    const {
      isLoading,
      error,
      invalidate,
      data: agencyHouses,
    } = useFetch(`/makelaar/housesoverview/1`);

    console.log(agencyHouses);

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>Huizen door uw agency gemaakt</h1>
      <Grid>
            {agencyHouses.map((house, index) => {
              return <HouseCard house={house} key={index} saveButtonContent={"Bewerk pand"} to={`/makelaar/updatehouse/${house.id}`}/>;
            })}
          </Grid>
      {/* <Container id="adminBuildingsContainer">

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

      </Container> */}    
    </Container>
  );
};

export default MakelaarDashboard;
